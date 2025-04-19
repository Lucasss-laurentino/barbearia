import "./index.css";
import { Fragment, useContext, useEffect } from "react";
import { ServicoContext } from "../../Context/ServicoContext";
import { UserContext } from "../../Context/UserContext";
import { LoadServico } from "./LoadServico";
import { SpanAddServico } from "./SpanAddServico";
import { NomeImgPrazo } from "./NomeImgPrazo";
import { PageEContratado } from "./PageEContratado";
import { useParams } from "react-router-dom";
import { ModalServico } from "./ModalServico";
import { ModalExcluir } from "../../Components/ModalExcluir";

export const Servicos = () => {

  const { 
    servicos,
    servicoEscolhido,
    setServicoEscolhido, 
    loadCriarServico, 
    pegarServicos,
    handleCloseServico,
    handleCloseExcluirServico,
    setServicoAgendado,
    showModalServico,
    setShowModalServico,
    showModalExcluirServico,
    servicoAgendado,
    servicoASerExcluido,
    editarServicoState,
    verificarServicoEscolhido,
  } = useContext(ServicoContext);
  
  const { user } = useContext(UserContext);
  const { barbearia } = useParams();

  useEffect(() => {
    if (!servicoEscolhido?.id) setServicoAgendado({});
  }, [servicoEscolhido]);

  useEffect(() => {
    // se existir um horario agendado, seta servicoAgendado pra mostrar icone verificado em "escolher"
    pegarServicos(barbearia);
    if (
      localStorage.getItem("agendamento") &&
      localStorage.getItem("agendamento") !== "{}"
    ) {
      const obj = JSON.parse(localStorage.getItem("agendamento"));
      setServicoAgendado(obj.SERVICO);
    }
  }, []);

  return (
    <>
      <ModalServico
        show={showModalServico}
        setShow={setShowModalServico}
        handleClose={handleCloseServico}
        servico={editarServicoState}
      />
      <ModalExcluir
        show={showModalExcluirServico}
        handleClose={handleCloseExcluirServico}
        itemParaExclusao={servicoASerExcluido}
        idItemExclusao={1}
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
                            onClick={() => verificarServicoEscolhido(servico)}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <NomeImgPrazo servico={servico} />
                              <PageEContratado
                                user={user}
                                servico={servico}
                                servicoEscolhido={servicoEscolhido}
                                servicoAgendado={servicoAgendado}
                                setServicoEscolhido={setServicoEscolhido}
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
