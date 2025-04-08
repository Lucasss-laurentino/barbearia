import { useContext, useEffect, useState } from "react";
import "./index.css";
import { SocketContext } from "../../../Context/SocketContext";

export const CardHorarioMarcado = ({ horario }) => {
  const [meuHorarioMarcado, setMeuHorarioMarcado] = useState();
  const { cancelarMeuHorarioPendente, cancelarMeuHorarioMarcado } = useContext(
    SocketContext
  );

  useEffect(() => {
    setMeuHorarioMarcado(horario);
  }, [horario]);

  return (
    <div className="card-horario">
      <div className="card-header">
        <h3>Seu horário agendado</h3>
        {meuHorarioMarcado?.reservado === 2 ? (
          <span className="status-flag pendente">Pendente</span>
        ) : (
          <span className="status-flag aceito">Aceito</span>
        )}
      </div>
      <p>
        <strong>Data:</strong> {meuHorarioMarcado?.data}
      </p>
      <p>
        <strong>Hora:</strong> {meuHorarioMarcado?.hora}
      </p>
      <p>
        <strong>Serviço:</strong> {meuHorarioMarcado?.servico}
      </p>
      <p>
        <strong>Preço:</strong>
        {meuHorarioMarcado?.preco}
      </p>
      <p>
        <strong>Barbeiro:</strong> {meuHorarioMarcado?.barbeiroNome}
      </p>
      <button
        className="btn-cancelar"
        onClick={() => {
          if (meuHorarioMarcado?.reservado === 2) {
            cancelarMeuHorarioPendente(meuHorarioMarcado);
          } else if (meuHorarioMarcado?.reservado === 1) {
            cancelarMeuHorarioMarcado(meuHorarioMarcado);
          }
        }}
      >
        Cancelar
      </button>
    </div>
  );
};
