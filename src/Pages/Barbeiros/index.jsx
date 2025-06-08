import { useContext, useEffect, useState } from "react";
import { SpanAdd } from "../../Components/SpanAdd";
import "./index.css";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { ModalBarbeiro } from "../../Components/ModalBarbeiro";
// import { DadosBarbeiro } from "./DadosBarbeiro";
// import { ListaDeHorarios } from "./ListaDeHorarios";
// import { UserContext } from "../../Context/UserContext";
// import { HoraMarcada } from "./HoraMarcada";
// import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
// import { Modais } from "../../Components/Modais";
// import { LocalStorageAgendamentoContext } from "../../Context/LocalStorageAgendamentoContext";

export const Barbeiros = () => {
  const { barbeiros } = useContext(BarbeiroContext);
  const [showModalCriarBarbeiro, setShowModalCriarBarbeiro] = useState(false);
  // const { horarioMarcado } = useContext(HorarioMarcadoContext);
  // const { user } = useContext(UserContext);
  // const { localStorageAgendamento } = useContext(LocalStorageAgendamentoContext);

  return (
    <>
      
      <ModalBarbeiro
        show={showModalCriarBarbeiro}
        setShow={setShowModalCriarBarbeiro}
      />

      <div className="pagina-servicos">
        <div className="servicos-container">
          <ul className="lista-servicos">
            {barbeiros.map((barbeiro) => (
              <li key={barbeiro.id} className="item-servico">
                
              </li>
            ))}
          </ul>
          <SpanAdd setShow={setShowModalCriarBarbeiro} entity={barbeiros} text={"Cadastre um barbeiro aqui!"} />
        </div>
      </div>

      {/* <Modais />
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
                    {horarioMarcado &&
                      localStorageAgendamento?.ID === horarioMarcado.ID && (
                        <HoraMarcada barbeiro={barbeiro} />
                      )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
};
