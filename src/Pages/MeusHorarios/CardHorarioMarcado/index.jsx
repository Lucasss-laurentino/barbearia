import { useContext } from "react";
import "./index.css";
import { SocketContext } from "../../../Context/SocketContext";

export const CardHorarioMarcado = ({ horario }) => {
  const { cancelarMeuHorarioPendente, cancelarMeuHorarioMarcado } = useContext(
    SocketContext
  );


  return (
    <div className="card-horario">
      <div className="card-header">
        <h3>Seu horário agendado</h3>
        {horario?.RESERVADO === 2 ? (
          <span className="status-flag pendente">Pendente</span>
        ) : (
          <span className="status-flag aceito">Aceito</span>
        )}
      </div>
      <p>
        <strong>Data:</strong> {horario?.DATA}
      </p>
      <p>
        <strong>Hora:</strong> {horario?.HORA}
      </p>
      <p>
        <strong>Serviço:</strong> {horario?.SERVICO}
      </p>
      <p>
        <strong>Preço:</strong>
        {horario?.PRECO}
      </p>
      <p>
        <strong>Barbeiro:</strong> {horario?.BARBEIRO_NOME}
      </p>
      <button
        className="btn-cancelar"
        onClick={() => {
          if (horario?.RESERVADO === 2) {
            cancelarMeuHorarioPendente(horario);
          } else if (horario?.RESERVADO === 1) {
            cancelarMeuHorarioMarcado(horario);
          }
        }}
      >
        Cancelar
      </button>
    </div>
  );
};
