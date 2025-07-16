import { useContext, useEffect } from "react";
import { AgendamentoContext } from "../Context/AgendamentoContext";
import { SignalRContext } from "../Context/SignalRContext";

export const useAtualizarAgendamentoSignalR = () => {
  const {
    inserirNovoAgendamento,
    deletarAgendamentoState,
    verificaDeletaAgendamentoLocalStorage,
    marcarStatusAceito
  } = useContext(AgendamentoContext);
  const { connection } = useContext(SignalRContext);

  useEffect(() => {
    if (!connection) return;

    const atualizar = (agendamento) => {
      inserirNovoAgendamento(agendamento);
    };

    const deletar = (idAgendamento) => {
      deletarAgendamentoState(idAgendamento);
      verificaDeletaAgendamentoLocalStorage(idAgendamento);
    };

    const aceitar = (idAgendamento) => {
      marcarStatusAceito(idAgendamento);
    };

    connection.on("atualizaAgendamentos", atualizar);
    connection.on("deletarAgendamento", deletar);
    connection.on("aceitarAgendamento", aceitar);

    return () => {
      connection.off("atualizaAgendamentos", atualizar);
      connection.off("deletarAgendamento", deletar);
      connection.off("aceitarAgendamento", aceitar);
    };
  }, [connection]);
};
