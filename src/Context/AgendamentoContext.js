import { createContext, useContext, useEffect, useState } from "react";
import { BarbeariaContext } from "./BarbeariaContext";
import { http } from "../http";
import { ServicoContext } from "./ServicoContext";
import { CalendarioContext } from "./CalendarioContext";

export const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const { barbearia } = useContext(BarbeariaContext);
  const { servicoEscolhido } = useContext(ServicoContext);
  const { dataSelecionada } = useContext(CalendarioContext);
  
  const [erroAgendamento, setErroAgendamento] = useState(null);

  useEffect(() => {
    if (barbearia && barbearia.agendamentos) {
      setAgendamentos(barbearia.agendamentos.$values);
    }
  }, [barbearia?.agendamentos]);

  const agendar = async (barbeiro, horario) => {
    try {
      const agendamento = formatarAgendamento(barbeiro, horario);
      const response = await http.post("/agendamento/create", agendamento, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      if(error.response.data.detail === 'Usuário não autenticado.'){
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
      idBarbearia: barbearia.id
    };
    return agendamento;
  };

  return (
    <AgendamentoContext.Provider
      value={{ agendamentos, setAgendamentos, agendar, erroAgendamento, setErroAgendamento }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};
