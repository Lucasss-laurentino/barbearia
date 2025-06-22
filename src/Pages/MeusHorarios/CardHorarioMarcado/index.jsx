import { useContext } from "react";
import "./index.css";

export const CardHorarioMarcado = () => {

  return (
    <div className="card-horario">
      <div className="card-header">
        <h3>Seu horário agendado</h3>
          <span className="status-flag pendente">Pendente</span>
          {/* <span className="status-flag aceito">Aceito</span> */}
      </div>
      <p>
        <strong>Data:</strong> 22/02/2026
      </p>
      <p>
        <strong>Hora:</strong> 08:00:00
      </p>
      <p>
        <strong>Serviço:</strong> Corte/Reflexo
      </p>
      <p>
        <strong>Preço:</strong>
        R$ 30,00
      </p>
      <p>
        <strong>Barbeiro:</strong> Lucas
      </p>
      <button
        className="btn-cancelar"
        // onClick={() => {
        //   if (horario?.RESERVADO === 2) {
        //     cancelarMeuHorarioPendente(horario);
        //   } else if (horario?.RESERVADO === 1) {
        //     cancelarMeuHorarioMarcado(horario);
        //   }
        // }}
      >
        Cancelar
      </button>
    </div>
  );
};
