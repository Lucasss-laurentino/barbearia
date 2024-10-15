import { useEffect } from "react";

export const HoraMarcada = ({ horarioMarcado, desmarcarHorario }) => {
  useEffect(() => {
   // console.log(horarioMarcado);
  }, []);

  return (
    <>
      <div className="container">
        <div className="personalizar-item-desmarcar-horario">
          <div className="hora">
            <p className="m-0">{horarioMarcado.HORA}</p>
          </div>
          <div className="desmarcar">
            <a className="btn-desmarcar" onClick={() => desmarcarHorario()}>
              Desmarcar
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
