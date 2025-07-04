import { createContext, useContext, useEffect, useState } from "react";
import { BarbeariaContext } from "./BarbeariaContext";
import { http } from "../http";
import { ServicoContext } from "./ServicoContext";
import { CalendarioContext } from "./CalendarioContext";

export const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const { barbearia, setBarbearia } = useContext(BarbeariaContext);
  const { servicoEscolhido } = useContext(ServicoContext);
  const { dataSelecionada } = useContext(CalendarioContext);

  const [erroAgendamento, setErroAgendamento] = useState(null);

  useEffect(() => {
    if (barbearia && barbearia.agendamentos) {
      setAgendamentos([...barbearia.agendamentos.$values]);
    }
  }, [barbearia?.agendamentos]);

  const agendar = async (barbeiro, horario) => {
    try {
      const agendamento = formatarAgendamento(barbeiro, horario);
      const response = await http.post("/agendamento/create", agendamento, {
        withCredentials: true,
      });
      localStorage.setItem("agendamento", JSON.stringify(response.data));
    } catch (error) {
      if (error.response.data.detail === "Usuário não autenticado.") {
        setErroAgendamento("Faça login pra agendar um horário!");
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

  return (
    <AgendamentoContext.Provider
      value={{
        agendamentos,
        setAgendamentos,
        agendar,
        erroAgendamento,
        setErroAgendamento,
        atualizarAgendamento,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};
