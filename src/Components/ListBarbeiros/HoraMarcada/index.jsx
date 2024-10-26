import { useState, useEffect, useContext } from "react";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";

export const HoraMarcada = ({ horario, desmarcarHorario }) => {
  const [meuHorario, setMeuHorario] = useState({});
  const { cancelarMeuHorarioPendente, cancelarMeuHorarioMarcado  } = useContext(
    HorarioMarcadoContext
  );

  useEffect(() => {
    if(horario){
      setMeuHorario(horario);      
    }
    setMeuHorario(JSON.parse(localStorage.getItem("agendamento")));
  }, [JSON.parse(localStorage.getItem("agendamento"))?.RESERVADO, horario]);

  return (
    <>
      <div className="container">
        <div className="personalizar-item-desmarcar-horario">
          <div className="hora">
            <p className="m-0">{meuHorario?.HORA?.HORA}</p>
          </div>
          <div className="desmarcar d-flex justify-content-between align-items-center">
            {meuHorario?.RESERVADO === 2 && (
              <p className="bg-warning text-dark pendente">Pendente</p>
            )}
            {meuHorario?.RESERVADO === 1 && (
              <p className="bg-success text-dark pendente">Aceito</p>
            )}

            <a
              className="btn-desmarcar"
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
        </div>
      </div>
    </>
  );
};
