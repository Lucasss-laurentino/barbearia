import { useState, useEffect } from "react";

export const HoraMarcada = ({ horarioMarcado, desmarcarHorario }) => {
  
  const [meuHorario, setMeuHorario] = useState({});

  useEffect(() => {
    setMeuHorario(JSON.parse(localStorage.getItem("agendamento")));
  }, []);

  return (
    <>
      <div className="container">
        <div className="personalizar-item-desmarcar-horario">
          <div className="hora">
            <p className="m-0">{horarioMarcado.HORA}</p>
          </div>
          <div className="desmarcar d-flex justify-content-between align-items-center">
            {meuHorario.RESERVADO === 2 && (
              <p className="bg-warning text-dark pendente">Pendente</p>
            )}
            {meuHorario.RESERVADO === 1 && (
              <p className="bg-success text-dark pendente">Aceito</p>
            )}

            <a className="btn-desmarcar" onClick={() => desmarcarHorario()}>
              {meuHorario.RESERVADO === 2 ? "Cancelar" : "Desmarcar"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
