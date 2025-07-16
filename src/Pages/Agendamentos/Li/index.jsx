import { useContext } from "react";
import "./index.css";
import { AgendamentoContext } from "../../../Context/AgendamentoContext";

export const Li = ({ agendamento }) => {

  const { aceitarPendente, cancelarAgendamentoPendente } = useContext(AgendamentoContext);

  const statusTexto = {
    0: "Pendente",
    1: "Confirmado",
    2: "Recusado",
  };

  const statusClasse = {
    0: "status-flag pendente",
    1: "status-flag aceito",
    2: "li-agendamento-badge-recusado",
  };

  return (
    <li className="li-agendamento-item">
      <div className="li-agendamento-header">
        <div className="li-agendamento-info">
          <h5 className="li-agendamento-nome-servico">
            {agendamento.servicoNome}
          </h5>
          <p className="li-agendamento-preco-servico">
            R$ {agendamento.servicoPreco},00
          </p>
          <p className="li-agendamento-preco-servico">
            <strong>Barbeiro:</strong> {agendamento.barbeiroNome}
          </p>
          <p className="li-agendamento-preco-servico">
            <strong>Cliente:</strong> {agendamento.usuarioNome}
          </p>
          <p className="li-agendamento-preco-servico">
            <strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString("pt-BR")}
          </p>
          <p className="li-agendamento-preco-servico">
            <strong>Hora:</strong> {agendamento.hora}
          </p>
        </div>
        <span
          className={`li-agendamento-status ${
            statusClasse[agendamento.status]
          }`}
        >
          {statusTexto[agendamento.status]}
        </span>
      </div>

      {agendamento.status === 0 && (
        <div className="li-agendamento-botoes">
          <button className="li-agendamento-btn aceitar" onClick={() => aceitarPendente(agendamento)}>Aceitar</button>
          <button className="li-agendamento-btn recusar" onClick={() => cancelarAgendamentoPendente(agendamento)}>Recusar</button>
        </div>
      )}
    </li>
  );
};
