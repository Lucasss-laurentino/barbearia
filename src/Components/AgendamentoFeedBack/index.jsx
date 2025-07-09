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
    0: { texto: "Pendente", cor: "#f1c40f" },
    1: { texto: "Aceito", cor: "#00e676" },
    2: { texto: "Recusado", cor: "#ff4d4f" },
    3: { texto: "Cancelado", cor: "#b0b0b0" },
    4: { texto: "Finalizado", cor: "#0d6efd" },
  };

  const status = statusInfo[meuAgendamento.status];
  return (
    <div className="agendamento-feedback-linha">
      <span>{meuAgendamento.hora}</span>{" "}
      <span>{formatarData(meuAgendamento.data)}</span>{" "}
      <span style={{ color: status.cor, fontWeight: "bold" }}>
        {status.texto}
      </span>
    </div>
  );
};
