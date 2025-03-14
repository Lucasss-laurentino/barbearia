import './index.css';
import { useState, useEffect, useContext } from "react";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";
import { SocketContext } from '../../../Context/SocketContext';

export const HoraMarcada = ({ horario }) => {
  const [meuHorario, setMeuHorario] = useState({});
  const { cancelarMeuHorarioMarcado } = useContext(
    HorarioMarcadoContext
  );

  const { cancelarMeuHorarioPendente } = useContext(SocketContext);

  useEffect(() => {
    if (horario) {
      setMeuHorario(horario);
    }
    if (localStorage.getItem("agendamento") && localStorage.getItem("agendamento") !== '{}')
      setMeuHorario(JSON.parse(localStorage.getItem("agendamento")));
  }, [JSON.parse(localStorage.getItem("agendamento"))?.RESERVADO, horario]);

  return (
    <>
      <div class="agendamento-dados">
        <p class="agendamento-hora">{meuHorario?.HORA}</p>
        <p class="agendamento-data">{meuHorario?.DATA}</p>
        <p class="agendamento-status bg-warning">{meuHorario?.RESERVADO === 2 ? "Pendente" : "Aceito"}</p>
        <a
          className="agendamento-cancelar mx-1"
          onClick={() => {
            if (meuHorario?.RESERVADO === 2) {
              cancelarMeuHorarioPendente(meuHorario);
            } else if (meuHorario?.RESERVADO === 1) {
              cancelarMeuHorarioMarcado(meuHorario);
            }
          }}
        >
          {meuHorario?.RESERVADO === 2 ? "Cancelar" : "Desmarcar"}
        </a>
      </div>
    </>
  );
};
