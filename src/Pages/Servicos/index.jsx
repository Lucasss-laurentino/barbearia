import "./index.css";
import { Fragment, useContext, useEffect } from "react";
import { ServicoContext } from "../../Context/ServicoContext";
import { UserContext } from "../../Context/UserContext";
import { LoadServico } from "./LoadServico";
import { SpanAddServico } from "./SpanAddServico";
import { NomeImgPrazo } from "./NomeImgPrazo";
import { PageEContratado } from "./PageEContratado";
import { ModalServico } from "./ModalServico";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";

export const Servicos = () => {
  const {
    servicos,
    servicoEscolhido,
    setServicoEscolhido,
    loadCriarServico,
    handleCloseServico,
    setServicoAgendado,
    showModalServico,
    setShowModalServico,
    servicoAgendado,
    servicoASerExcluido,
    editarServicoState,
    verificarServicoEscolhido,
  } = useContext(ServicoContext);
  const { horarioMarcado } = useContext(HorarioMarcadoContext);

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!servicoEscolhido?.id) setServicoAgendado({});
  }, [servicoEscolhido]);

  const escolherServico = (servico) => {
    if (!horarioMarcado) verificarServicoEscolhido(servico);
  };

  return (
    <>
      <ModalServico
        show={showModalServico}
        setShow={setShowModalServico}
        handleClose={handleCloseServico}
        servico={editarServicoState}
      />
     
      {loadCriarServico ? (
        <LoadServico />
      ) : (
        <>
          {user?.ADM && (
            <SpanAddServico
              setShowModalServico={setShowModalServico}
              servicos={servicos}
            />
          )}
          <>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-10 d-flex justify-content-center align-items-center">
                  <ul className="col-12 list-style heiht-scroll">
                    {servicos.map((servico) => {
                      return (
                        <Fragment key={servico.ID}>
                          <li
                            className="py-1 border-list-services text-claro"
                            id={`item-servico-${servico.ID}`}
                            onClick={() => escolherServico(servico)}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <NomeImgPrazo servico={servico} />
                              <PageEContratado
                                servico={servico}
                              />
                            </div>
                          </li>
                        </Fragment>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};
