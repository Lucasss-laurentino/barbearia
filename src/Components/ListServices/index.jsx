import "./index.css";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { ServicoContext } from "../../Context/ServicoContext";
import { UserContext } from "../../Context/UserContext";
import { ModalServico } from "../ModalServico";
import { ModalExcluir } from "../ModalExcluir";
import { LoadServico } from "./LoadServico";
import { SpanAddServico } from "./SpanAddServico";
import { NomeImgPrazo } from "./NomeImgPrazo";
import { PageEContratado } from "./PageEContratado";

export const ListService = () => {
  // CONTEXTS
  const { servicos, servicoEscolhido, setServicoEscolhido, loadCriarServico } =
    useContext(ServicoContext);
  const { user, setUserContrata } = useContext(UserContext);

  // STATES
  const [showModalServico, setShowModalServico] = useState(false);
  const [showModalExcluirServico, setShowModalExcluirServico] = useState(false);
  const [servicoASerExcluido, setServicoASerExcluido] = useState();
  const [editarServico, setEditarServico] = useState(null);
  const [servicoAgendado, setServicoAgendado] = useState({});

  // HANDLES
  const handleClose = useCallback(() => {
    setEditarServico(null);
    setShowModalServico(false);
  });
  const handleCloseExcluirServico = useCallback(() => {
    setShowModalExcluirServico(false);
  });

  // USE EFFECT
  useEffect(() => {
    if (servicoEscolhido?.id) {
      setUserContrata((prevState) => ({
        ...prevState,
        servicoEscolhido,
      }));
    } else {
      setUserContrata((prevState) => ({
        ...prevState,
        servicoEscolhido: {},
      }));
    }
  }, [servicoEscolhido]);

  useEffect(() => {
    // se localStorage estiver setado com um serviço é porque o usuario tem horario agendado
    if (localStorage.getItem("agendamento")) {
      const obj = JSON.parse(localStorage.getItem("agendamento"));
      setServicoAgendado(obj.SERVICO);
    }
  }, []);

  return (
    <>
      <ModalServico
        show={showModalServico}
        setShow={setShowModalServico}
        handleClose={handleClose}
        servico={editarServico}
      />
      <ModalExcluir
        show={showModalExcluirServico}
        handleClose={handleCloseExcluirServico}
        itemParaExclusao={servicoASerExcluido}
        idItemExclusao={1}
      />
      {loadCriarServico ? (
        // mostra esse componente 'LOAD' até que os dados sejam carregados
        <LoadServico />
      ) : (
        <>
          {user.ADM && <SpanAddServico setShowModalServico={setShowModalServico} />}

          <div className="container-fluid bg-dark">
            <div className="row">
              <div className="col-12 p-0">
                <ul
                  className={
                    user.ADM
                      ? "list-servicos-tamanho"
                      : "list-servicos-tamanho-sem-margin-bottom"
                  }
                >
                  {servicos.map((servico) => {
                    return (
                      <Fragment key={servico.ID}>
                        <li
                          className="py-3 border-list-services text-claro"
                          id={`item-servico-${servico.ID}`}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <NomeImgPrazo servico={servico} />
                            <PageEContratado
                              user={user}
                              servico={servico}
                              servicoEscolhido={servicoEscolhido}
                              servicoAgendado={servicoAgendado}
                              setServicoEscolhido={setServicoEscolhido}
                              setEditarServico={setEditarServico}
                              setShowModalServico={setShowModalServico}
                              setServicoASerExcluido={setServicoASerExcluido}
                              setShowModalExcluirServico={setShowModalExcluirServico}
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
      )}
    </>
  );
};
