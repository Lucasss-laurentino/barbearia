import { useContext, useEffect } from "react";
import { AgendamentoContext } from "../Context/AgendamentoContext";
import { SignalRContext } from "../Context/SignalRContext";

export const useAtualizarAgendamentoSignalR = () => {
  const { atualizarAgendamento } = useContext(AgendamentoContext);
  const { connection } = useContext(SignalRContext);

  useEffect(() => {
    if (!connection) return;
    const atualizar = (agendamento) => {
      atualizarAgendamento(agendamento);
    };
    connection.on("atualizaAgendamentos", atualizar);
    return () => {
      connection.off("atualizaAgendamentos", atualizar);
    };
  }, [connection]);
};