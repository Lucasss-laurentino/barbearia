import { createContext, useContext, useEffect, useState } from "react";
import { BarbeariaContext } from "./BarbeariaContext";
import { http } from "../http";
import { ServicoContext } from "./ServicoContext";
import { CalendarioContext } from "./CalendarioContext";

export const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);
  const [meuAgendamento, setMeuAgendamento] = useState(null);
  const { barbearia, setBarbearia } = useContext(BarbeariaContext);
  const { servicoEscolhido, setServicoEscolhido } = useContext(ServicoContext);
  const { dataSelecionada } = useContext(CalendarioContext);

  const [erroAgendamento, setErroAgendamento] = useState(null);

  useEffect(() => {
    if (barbearia && barbearia.agendamentos) {
      setAgendamentos([...barbearia.agendamentos.$values]);
    }
  }, [barbearia?.agendamentos]);

  useEffect(() => {
    if (localStorage.getItem("agendamento")) {
      setMeuAgendamento(JSON.parse(localStorage.getItem("agendamento")));
    }
  }, [localStorage.getItem("agendamento")]);

  const agendar = async (barbeiro, horario) => {
    try {
      const agendamento = formatarAgendamento(barbeiro, horario);
      const response = await http.post("/agendamento/create", agendamento, {
        withCredentials: true,
      });
      localStorage.setItem("agendamento", JSON.stringify(response.data));
      setServicoEscolhido(null);
    } catch (error) {
      if (error.response.data.detail) {
        setErroAgendamento(error.response.data.detail);
      }
    }
  };

  const formatarAgendamento = (barbeiro, horario) => {
    const agendamento = {
      data: dataSelecionada,
      idHorario: horario.id,
      idServico: servicoEscolhido.id,
      idBarbeiro: barbeiro.id,
      idBarbearia: barbearia.id,
    };
    return agendamento;
  };

  const pegarAgendamentosPelaData = async (barbeiro) => {
    try {
      const resposta = await http.post("/agendamento/getByDate", {
        data: dataSelecionada,
        idBarbeiro: barbeiro.id,
      });
      atualizarAgendamento(resposta.data.$values);
    } catch (error) {
      console.log(error);
    }
  };

  const atualizarAgendamento = (agendamentoRecebido) => {
    setBarbearia((prevBarbearia) => ({
      ...prevBarbearia,
      barbeiros: {
        ...prevBarbearia.barbeiros,
        $values: prevBarbearia.barbeiros.$values.map((barbeiro) => ({
          ...barbeiro,
          horarios: {
            ...barbeiro.horarios,
            $values: barbeiro.horarios.$values.map((horario) => {
              if (horario.id === agendamentoRecebido.idHorario) {
                const ags = horario.agendamentos?.$values || [];
                const index = ags.findIndex(
                  (a) => a.id === agendamentoRecebido.id
                );

                let novosAgendamentos;
                if (index !== -1) {
                  // Atualiza agendamento existente
                  novosAgendamentos = [...ags];
                  novosAgendamentos[index] = {
                    ...novosAgendamentos[index],
                    ...agendamentoRecebido,
                  };
                } else {
                  // Adiciona novo agendamento
                  novosAgendamentos = [...ags, agendamentoRecebido];
                }
                return {
                  ...horario,
                  agendamentos: {
                    ...horario.agendamentos,
                    $values: novosAgendamentos,
                  },
                };
              }
              return horario;
            }),
          },
        })),
      },
    }));
  };

  const verificaValidadeAgendamento = (agendamento, barbeiro) => {
    if (agendamento?.idBarbeiro !== barbeiro.id) {
      return false;
    }
    if (!agendamento) return false;
    const dataISO = new Date(agendamento.data);
    const ano = dataISO.getFullYear();
    const mes = dataISO.getMonth();
    const dia = dataISO.getDate();
    const [hora, minuto, segundo] = agendamento.hora.split(":").map(Number);
    const dataHoraAgendada = new Date(ano, mes, dia, hora, minuto, segundo);
    const agora = new Date();
    return dataHoraAgendada > agora;
  };

  const getMeusAgendamentos = async () => {
    try {
      const response = await http.get("agendamento/meusAgendamentos", {
        withCredentials: true,
      });
      setMeusAgendamentos([...response.data.$values]);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelarAgendamentoPendente = async () => {
    try {
      await http.post(
        "agendamento/cancelarAgendamentoPendente",
        { idAgendamento: meuAgendamento.id }
      );
      localStorage.removeItem("agendamento");
      setMeuAgendamento(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deletarAgendamentoState = (idAgendamento) => {
    setBarbearia((prevBarbearia) => ({
      ...prevBarbearia,
      barbeiros: {
        ...prevBarbearia.barbeiros,
        $values: prevBarbearia.barbeiros.$values.map((barbeiro) => ({
          ...barbeiro,
          horarios: {
            ...barbeiro.horarios,
            $values: barbeiro.horarios.$values.map((horario) => {
              const ags = horario.agendamentos?.$values || [];
              const novosAgendamentos = ags.filter(
                (agendamento) => agendamento.id !== idAgendamento
              );
              return {
                ...horario,
                agendamentos: {
                  ...horario.agendamentos,
                  $values: novosAgendamentos,
                },
              };
            }),
          },
        })),
      },
    }));
  };

  return (
    <AgendamentoContext.Provider
      value={{
        agendamentos,
        setAgendamentos,
        agendar,
        erroAgendamento,
        setErroAgendamento,
        atualizarAgendamento,
        verificaValidadeAgendamento,
        meusAgendamentos,
        setMeusAgendamentos,
        getMeusAgendamentos,
        meuAgendamento,
        setMeuAgendamento,
        pegarAgendamentosPelaData,
        cancelarAgendamentoPendente,
        deletarAgendamentoState,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};
