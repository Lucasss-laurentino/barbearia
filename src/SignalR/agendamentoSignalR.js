import { useContext, useEffect } from "react";
import { AgendamentoContext } from "../Context/AgendamentoContext";
import { SignalRContext } from "../Context/SignalRContext";

export const useAtualizarAgendamentoSignalR = () => {
  const { atualizarAgendamento, deletarAgendamentoState } =
    useContext(AgendamentoContext);
  const { connection } = useContext(SignalRContext);

  useEffect(() => {
    if (!connection) return;

    const atualizar = (agendamento) => {
      console.log("Recebido evento de atualização", agendamento);
      atualizarAgendamento(agendamento);
    };

    const deletar = (idAgendamento) => {
      console.log("Recebido evento de exclusão", idAgendamento);
      deletarAgendamentoState(idAgendamento);
    };

    connection.on("atualizaAgendamentos", atualizar);
    connection.on("deletarAgendamento", deletar);

    return () => {
      connection.off("atualizaAgendamentos", atualizar);
      connection.off("deletarAgendamento", deletar);
    };
  }, [connection]);
};
