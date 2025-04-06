import { useContext, useEffect } from "react";
import "./index.css";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { useParams } from "react-router-dom";
import { DadosBarbeiro } from "./DadosBarbeiro";
import { ListaDeHorarios } from "./ListaDeHorarios";
import { SpanAdd } from "../SpanAdd";
import { UserContext } from "../../Context/UserContext";
import { Modais } from "./Modais";
import { HorarioContext } from "../../Context/HorarioContext";
import { HoraMarcada } from "./HoraMarcada";

export const Barbeiros = () => {
  const { barbearia } = useParams();

  const { pegarBarbeiros, barbeiros, handleShowModalBarbeiro } =
    useContext(BarbeiroContext);

  const { pegarHorarios } = useContext(HorarioContext);

  const { user } = useContext(UserContext);

  useEffect(() => {
    pegarBarbeiros(barbearia);
    pegarHorarios(barbearia);
  }, []);

  return (
    <>
      {/* Modais precisam ser renderizadas nesse componente */}
      {/* Componentes filhos ficam dentro de listas, isso causaria re-renderizações nos modais */}
      <Modais />

      {user?.ADM && (
        <SpanAdd handleShow={handleShowModalBarbeiro} barbeiros={barbeiros} />
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
                    <HoraMarcada barbeiro={barbeiro} />
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
