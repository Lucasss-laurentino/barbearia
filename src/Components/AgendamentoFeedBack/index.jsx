import { useContext, useEffect, useState } from "react";
import "./index.css";
import { AgendamentoContext } from "../../Context/AgendamentoContext";

export const AgendamentoFeedBack = ({ barbeiro }) => {

  const { verificaValidadeAgendamento, meuAgendamento } = useContext(AgendamentoContext); 
  const [render, setRender] = useState(false);

  useEffect(() => {
    const verify = verificaValidadeAgendamento(meuAgendamento, barbeiro);
    setRender(verify);
  }, [meuAgendamento, barbeiro]);

  if (!meuAgendamento) return null
  if (!render) return null;

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const statusInfo = {
    0: { texto: "Pendente", classe: "status-flag pendente" },
    1: { texto: "Aceito", classe: "status-flag aceito" },
  };

  const status = statusInfo[meuAgendamento.status];
  return (
    <div className="agendamento-feedback-linha">
      <span className="">{meuAgendamento.hora}</span>{" "}
      <span>{formatarData(meuAgendamento.data)}</span>{" "}
      <span className={status.classe}>
        {status.texto}
      </span>
    </div>
  );
};
