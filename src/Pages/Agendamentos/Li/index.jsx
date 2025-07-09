import "./index.css";

export const Li = ({ agendamento }) => {
  const statusTexto = {
    0: "Pendente",
    1: "Confirmado",
    2: "Recusado",
  };

  const statusClasse = {
    0: "li-agendamento-badge-pendente",
    1: "li-agendamento-badge-confirmado",
    2: "li-agendamento-badge-recusado",
  };

  const handleAceitar = () => {
    console.log("Aceitar agendamento:", agendamento.id);
  };

  const handleRecusar = () => {
    console.log("Recusar agendamento:", agendamento.id);
  };

  return (
    <li className="li-agendamento-item">
      <div className="li-agendamento-header">
        <div className="li-agendamento-info">
          <h5 className="li-agendamento-nome-servico">{agendamento.servicoNome}</h5>
          <p className="li-agendamento-preco-servico">R$ {agendamento.servicoPreco},00</p>
        </div>
        <span className={`li-agendamento-status ${statusClasse[agendamento.status]}`}>
          {statusTexto[agendamento.status]}
        </span>
      </div>

      {agendamento.status === 0 && (
        <div className="li-agendamento-botoes">
          <button className="li-agendamento-btn aceitar" onClick={handleAceitar}>
            Aceitar
          </button>
          <button className="li-agendamento-btn recusar" onClick={handleRecusar}>
            Recusar
          </button>
        </div>
      )}
    </li>
  );
};
