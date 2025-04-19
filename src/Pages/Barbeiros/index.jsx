import { useContext, useEffect } from "react";
import "./index.css";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { useParams } from "react-router-dom";
import { DadosBarbeiro } from "./DadosBarbeiro";
import { ListaDeHorarios } from "./ListaDeHorarios";
import { UserContext } from "../../Context/UserContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { HoraMarcada } from "./HoraMarcada";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { Modais } from "../../Components/Modais";
import { SpanAddServico } from "../Servicos/SpanAddServico";

export const Barbeiros = () => {
  const { barbearia } = useParams();

  const { pegarBarbeiros, barbeiros, handleShowModalBarbeiro } =
    useContext(BarbeiroContext);

  const { pegarHorarios } = useContext(HorarioContext);
  const { horarioMarcado, pegarMeuHorarioMarcado } = useContext(
    HorarioMarcadoContext
  );

  const { user } = useContext(UserContext);

  useEffect(() => {
    pegarBarbeiros(barbearia);
    pegarHorarios(barbearia);
    pegarMeuHorarioMarcado();
  }, []);

  return (
    <>
      <Modais />
      {user?.ADM && (
        <SpanAddServico handleShow={handleShowModalBarbeiro} barbeiros={barbeiros} />
      )}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 d-flex justify-content-center align-items-center p-0">
            <ul className="col-12 list-style heiht-scroll">
              {barbeiros.map((barbeiro) => {
                return (
                  <li
                    className="py-1 border-list-services text-claro"
                    key={barbeiro.ID}
                  >
                    <DadosBarbeiro barbeiro={barbeiro} />
                    <ListaDeHorarios barbeiro={barbeiro} />
                    {horarioMarcado && <HoraMarcada barbeiro={barbeiro} /> }
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
