import "./index.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { ServicoContext } from "../../Context/ServicoContext";
import { ModalServico } from "../ModalServico";
import { UserContext } from "../../Context/UserContext";
import { ModalExcluir } from "../ModalExcluir";
import { MutatingDots } from "react-loader-spinner";

export const ListService = () => {
  const {
    servicos,
    servicoEscolhido,
    setServicoEscolhido,
    pegarServicos,
    loadCriarServico,
  } = useContext(ServicoContext);
  const { user, setUserContrata } = useContext(UserContext);

  const [showModalServico, setShowModalServico] = useState(false);
  const [showModalExcluirServico, setShowModalExcluirServico] = useState(false);
  const [servicoASerExcluido, setServicoASerExcluido] = useState();
  const [editarServico, setEditarServico] = useState(null);

  const handleClose = () => {
    setEditarServico(null);
    setShowModalServico(false);
  };
  const handleCloseExcluirServico = () => {
    setShowModalExcluirServico(false);
  };

  useEffect(() => {
    pegarServicos();
  }, []);

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
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center h-loader">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#6d6d6d"
                secondaryColor="#6d6d6d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {user.BARBEIRO && (
            <span
              className="adc-barbeiro"
              onClick={() => setShowModalServico(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                fill="#fff"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </span>
          )}
          <div className="container-fluid bg-dark">
            <div className="row">
              <div className="col-12 p-0">
                <ul className="list-servicos-tamanho">
                  {servicos.map((servico) => {
                    return (
                      <Fragment key={servico.ID}>
                        <li
                          className="py-3 border-list-services text-claro"
                          id={`item-servico-${servico.ID}`}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-start align-items-center col-8">
                              <div className="col-3 mx-3 border-radius-personalizada">
                                <img
                                  className="img-fluid img-corte"
                                  src={
                                    process.env.REACT_APP_API_URL +
                                    servico.IMAGEM_SERVICO
                                  }
                                  width="87%"
                                />
                              </div>
                              <div className="col-9">
                                <h6 className="m-0">{servico.NOME_SERVICO}</h6>
                                <p className="m-0">{servico.PRAZO}</p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end align-items-center col-4">
                              <div className="col-9">
                                <h6 className="m-0">{servico.PRECO}</h6>
                                {servicoEscolhido?.contratado &&
                                servicoEscolhido?.id === servico.ID ? (
                                  <div className="container">
                                    <img
                                      src="icones_menu_bottom/verificado.gif"
                                      className="img-fluid mx-3"
                                      width="40%"
                                      alt=""
                                      onClick={() => setServicoEscolhido({})}
                                    />
                                  </div>
                                ) : (
                                  <a
                                    href="#"
                                    className="d-block m-0 mt-2 text-success text-decoration-none"
                                    onClick={() =>
                                      setServicoEscolhido({
                                        id: servico.ID,
                                        contratado: true,
                                      })
                                    }
                                  >
                                    Escolher
                                  </a>
                                )}
                                {user.BARBEIRO && (
                                  <div className="d-flex justify-content-start align-items-center mt-2">
                                    <div
                                      className="edit m-0 p-0"
                                      onClick={() => {
                                        setEditarServico(servico);
                                        setShowModalServico(true);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="currentColor"
                                        className="bi bi-pencil-square mx-2"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                        />
                                      </svg>
                                    </div>

                                    <div
                                      className="trash m-0 p-0"
                                      onClick={() => {
                                        setServicoASerExcluido(servico);
                                        setShowModalExcluirServico(true);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="currentColor"
                                        className="bi bi-trash3-fill mx-2"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
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
