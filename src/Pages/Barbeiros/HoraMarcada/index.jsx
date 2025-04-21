import { useContext, useEffect, useState } from "react";
import "./index.css";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";
import { useNavigate, useParams } from "react-router-dom";
import { BarbeariaContext } from "../../../Context/BarbeariaContext";

export const HoraMarcada = ({ barbeiro }) => {
  const { horarioMarcado } = useContext(HorarioMarcadoContext);
  const navigate = useNavigate();
  const { barbearia } = useContext(BarbeariaContext);
  const [meuHorario, setMeuHorario] = useState();

    useEffect(() => {
      setMeuHorario(horarioMarcado);
    }, [horarioMarcado]);
  
  return (
    <>
      {meuHorario && meuHorario.BARBEIRO_ID === barbeiro.ID && (
        <div className="linha-agendamento">
          <span className="hora">{meuHorario?.HORA}</span>
          <span className="data">{meuHorario?.DATA}</span>
          <span
            className={`status ${
              meuHorario.RESERVADO === 2 ? "pendente" : "aceito"
            }`}
          >
            {meuHorario?.RESERVADO === 2 ? "Pendente" : "Aceito"}
          </span>
          <p
            className="ver-mais"
            title="Ver todos os horários"
            onClick={() => navigate(`/${barbearia}/meusHorarios`)}
          >
            <span className="texto">Ver mais</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icone"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M6 12a.5.5 0 0 1-.374-.832L9.293 8 5.626 4.832a.5.5 0 0 1 .748-.664l4 3.5a.5.5 0 0 1 0 .664l-4 3.5A.5.5 0 0 1 6 12z" />
            </svg>
          </p>
        </div>
      )}
    </>
  );
};
