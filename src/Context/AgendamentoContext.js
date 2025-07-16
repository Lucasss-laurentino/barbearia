import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { ServicoContext } from "./ServicoContext";
import { CalendarioContext } from "./CalendarioContext";
import { BarbeiroContext } from "./BarbeiroContext";

export const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);
  const [meuAgendamento, setMeuAgendamento] = useState(null);
  const { servicoEscolhido, setServicoEscolhido } = useContext(ServicoContext);
  const { dataSelecionada } = useContext(CalendarioContext);
  const { setBarbeiros, barbeiros } = useContext(BarbeiroContext);
  const [erroAgendamento, setErroAgendamento] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("agendamento")){
      setMeuAgendamento(JSON.parse(localStorage.getItem("agendamento")));
    } else {
      setMeuAgendamento(null);
    }
  }, [localStorage.getItem("agendamento")])

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
      idBarbearia: barbeiro.idBarbearia,
    };
    return agendamento;
  };

  const pegarAgendamentosPelaData = async (barbeiro) => {
    try {
      const resposta = await http.post("/agendamento/getByDate", {
        data: dataSelecionada,
        idBarbeiro: barbeiro.id,
      });
      mudarAgendamentosPorData(resposta.data.$values, barbeiro.id);
    } catch (error) {
      console.log(error);
    }
  };

  const mudarAgendamentosPorData = (agendamentosParametro, idBarbeiro) => {
    const novosBarbeiros = barbeiros.map((barbeiro) => {
      if (barbeiro.id !== idBarbeiro) return barbeiro;
      const novosHorarios = barbeiro.horarios.map((horario) => {
        const novosAgendamentos =
          agendamentosParametro?.filter((a) => a.idHorario === horario.id) ||
          [];
        return {
          ...horario,
          agendamentos: [...novosAgendamentos],
        };
      });
      return {
        ...barbeiro,
        horarios: novosHorarios,
      };
    });
    setBarbeiros(novosBarbeiros);
  };

  const inserirNovoAgendamento = (agendamentoRecebido) => {
    setAgendamentos([...agendamentos, agendamentoRecebido]);
    const novosBarbeiros = barbeiros.map((b) => {
      if (b.id === agendamentoRecebido.idBarbeiro) {
        b.horarios.map((h) => {
          if (h.id === agendamentoRecebido.idHorario) {
            h.agendamentos = [...agendamentos, agendamentoRecebido];
            return h;
          }
          return h;
        });
        return b;
      }
      return b;
    });
    setBarbeiros(novosBarbeiros);
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
      separarAgendamentoAtual(response.data.$values);
    } catch (error) {
      if (error.response.data.detail === "Usuário não autenticado.") {
        setMeuAgendamento([]);
      }
    }
  };

  const separarAgendamentoAtual = (agendamentosParametro) => {
    const dataSelecionadaSemHora = new Date(dataSelecionada);
    dataSelecionadaSemHora.setHours(0, 0, 0, 0);

    const agendamentoAtual = agendamentosParametro.find((agendamento) => {
      const dataAgendamento = new Date(agendamento.data);
      dataAgendamento.setHours(0, 0, 0, 0);
      return dataAgendamento >= dataSelecionadaSemHora;
    });

    if (!agendamentoAtual) {
      setMeusAgendamentos([...agendamentosParametro]);
      setMeuAgendamento(null);
      return;
    }
    const agendamentosAnteriores = agendamentosParametro.filter(
      (a) => a.id !== agendamentoAtual.id
    );

    setMeusAgendamentos([...agendamentosAnteriores]);
    setMeuAgendamento(agendamentoAtual);
  };

  const cancelarAgendamentoPendente = async (agendamento) => {
    try {
      await http.post(
        "agendamento/cancelarAgendamentoPendente",
        { idAgendamento: agendamento.id },
        { withCredentials: true }
      );
      const agendamentos = meusAgendamentos.filter(
        (mA) => mA.id !== meuAgendamento?.id
      );
      setMeusAgendamentos([...agendamentos]);
    } catch (error) {
      console.log(error);
    }
  };

  const deletarAgendamentoState = (idAgendamento) => {
    const novosAgendamentos = agendamentos.filter(
      (a) => a.id !== idAgendamento
    );
    setAgendamentos(novosAgendamentos);
    const novosBarbeiros = barbeiros.map((b) => {
      const novosHorarios = b.horarios.map((h) => ({
        ...h,
        agendamentos: h.agendamentos.filter((a) => a.id !== idAgendamento),
      }));
      return {
        ...b,
        horarios: novosHorarios,
      };
    });
    setBarbeiros(novosBarbeiros);
  };

  const verificaDeletaAgendamentoLocalStorage = (idAgendamento) => {
    // por algum motivo meuAgendamento ta nullo aqui, precisei pegar localStorage direto
    const agendamento = JSON.parse(localStorage.getItem("agendamento"));
    if (agendamento.id === idAgendamento) {
      setMeuAgendamento(null);
      localStorage.removeItem("agendamento");
    }
  };

  const aceitarPendente = async (agendamentoPendente) => {
    try {
      const resposta = await http.post(
        "agendamento/aceitarAgendamentoPendente",
        { idAgendamento: agendamentoPendente.id },
        { withCredentials: true }
      );
      console.log(resposta);
    } catch (error) {
      console.log(error);
    }
  };

  const marcarStatusAceito = (idAgendamento) => {
    setAgendamentos((prevAgendamentos) =>
      prevAgendamentos.map((agendamento) =>
        agendamento.id === idAgendamento
          ? { ...agendamento, status: 1 }
          : agendamento
      )
    );
    const agendamentoLS = JSON.parse(localStorage.getItem("agendamento"));
    if (agendamentoLS?.id === idAgendamento) {
      agendamentoLS.status = 1;
      localStorage.setItem("agendamento", JSON.stringify(agendamentoLS));
      setMeuAgendamento(agendamentoLS);
    }
  };

  return (
    <AgendamentoContext.Provider
      value={{
        agendamentos,
        setAgendamentos,
        agendar,
        erroAgendamento,
        setErroAgendamento,
        inserirNovoAgendamento,
        verificaValidadeAgendamento,
        meusAgendamentos,
        setMeusAgendamentos,
        getMeusAgendamentos,
        meuAgendamento,
        setMeuAgendamento,
        pegarAgendamentosPelaData,
        cancelarAgendamentoPendente,
        deletarAgendamentoState,
        aceitarPendente,
        verificaDeletaAgendamentoLocalStorage,
        marcarStatusAceito,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};
