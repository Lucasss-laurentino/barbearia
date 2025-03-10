import { useState, useEffect, useContext } from "react";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";

export const HoraMarcada = ({ horario, desmarcarHorario }) => {
  const [meuHorario, setMeuHorario] = useState({});
  const { cancelarMeuHorarioPendente, cancelarMeuHorarioMarcado } = useContext(
    HorarioMarcadoContext
  );

  useEffect(() => {
    if (horario) {
      setMeuHorario(horario);
    }
    if (localStorage.getItem("agendamento") && localStorage.getItem("agendamento") !== '{}')
      setMeuHorario(JSON.parse(localStorage.getItem("agendamento")));
  }, [JSON.parse(localStorage.getItem("agendamento"))?.RESERVADO, horario]);

  return (
    <>
      <div className="container">
        <div className="personalizar-item-desmarcar-horario col-12">
          <div className="hora col-1 d-flex justify-content-center align-items-center">
            <p className="m-0 text-dark">{meuHorario?.HORA}</p>
          </div>
          <div className="data col-1 d-flex justify-content-center text-dark align-items-center">
            {meuHorario?.DATA}
          </div>
          <div className="desmarcar d-flex justify-content-between align-items-center col-10">
            {meuHorario?.RESERVADO === 2 && (
              <p className="bg-warning text-dark pendente mx-1">Pendente</p>
            )}
            {meuHorario?.RESERVADO === 1 && (
              <p className="bg-success text-dark pendente mx-1">Aceito</p>
            )}

            <a
              className="btn-desmarcar mx-1"
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
