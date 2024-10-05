import { useEffect, useState } from "react";
import { AnimacaoContext } from "../../Context/AnimacaoHorarios";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { UserContext } from "../../Context/UserContext";
import { ModalBarbeiros } from "../ModalBarbeiros";
import "./index.css";
import { Fragment, useContext } from "react";
import { ModalHorarios } from "../ModalHorarios";
import { ModalExcluir } from "../ModalExcluir";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { ModalPagamentoAgendamento } from "../ModalPagamentoAgendamento";

export const ListBarbeiros = () => {
  // STATES

  const [show, setShow] = useState(false);
  const [showHorarios, setShowHorarios] = useState(false);
  const [barbeiro, setBarbeiro] = useState({});
  const [showExcluirHorario, setExcluirHorario] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [showModalPagamentoAgendamento, setShowModalPagamentoAgendamento] = useState(false);

  // HANDLES

  const handleCloseExcluirHorario = () => {
    setExcluirHorario(false);
    setHorarioSelecionado(null);
  };
  const handleClose = () => {
    setShow(false);
    setBarbeiroSelecionado(null);
  };
  const handleCloseHorario = () => {
    setShowHorarios(false);
    setHorarioSelecionado(null);
  };
  const handleShow = () => setShow(true);

  const closeModalPagamentoAgendamento = () => setShowModalPagamentoAgendamento(false);

  // CONTEXTS

  const {
    pegarBarbeiros,
    barbeiros,
    barbeiroSelecionado,
    setBarbeiroSelecionado,
  } = useContext(BarbeiroContext);
  const [id, setId] = useState();
  const [ setMarcarEsseHorario] = useState({ horario: null });

  const { 
    setHorarioMarcado, 
    usuarioTemHorarioMarcado, 
    horarioMarcado,
    verificaAntesDeMarcar,
    desmarcarHorario
  } = useContext(HorarioMarcadoContext);

  const {
    horarios,
    horariosAberto,
    setHorariosAberto,
    errosHorarios,
    setErrosHorarios,
  } = useContext(HorarioContext);

  const { abrirListaHorarios } = useContext(AnimacaoContext);

  const { user, setUserContrata } = useContext(UserContext);

  // USE EFECTS
  useEffect(() => {
    if (!showExcluirHorario) setHorarioSelecionado(null);
  }, [showExcluirHorario]);

  useEffect(() => {
    if (errosHorarios?.erro) {
      toast.error(errosHorarios.menssagem, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setErrosHorarios({
        erro: false,
        menssagem: "",
      });
    }
  }, [errosHorarios]);

  useEffect(() => {
    setHorariosAberto(false);
  }, []);

  useEffect(() => {
    const horario = horarios.find(h => h.DISPONIVEL === false);
    setHorarioMarcado(horario);
  }, [horarios]);

  return (
    <>
    <ModalPagamentoAgendamento
      show={showModalPagamentoAgendamento}    
      handleClose={closeModalPagamentoAgendamento}
      horarioSelecionado={horarioSelecionado}
    />
      <ModalHorarios
        show={showHorarios}
        setShow={setShowHorarios}
        handleClose={handleCloseHorario}
        barbeiro={barbeiro}
        horario={horarioSelecionado}
        setHorarioSelecionado={setHorarioSelecionado}
      />
      <ModalBarbeiros
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        barbeiro={barbeiroSelecionado}
      />
      <ModalExcluir
        show={showExcluirHorario}
        handleClose={handleCloseExcluirHorario}
        itemParaExclusao={
          (id === 2 && horarioSelecionado) || (id === 3 && barbeiroSelecionado)
        }
        idItemExclusao={id}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
        transition={Bounce}
      />

      {user.BARBEIRO && (
        <span className="adc-barbeiro" onClick={() => handleShow()}>
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
      <div className="container-fluid bg-dark height-main">
        <div className="row">
          <div className="col-12 p-0">
            <ul className={user.BARBEIRO ? "lista-barbeiros" : "lista-barbeiros-sem-margin-bottom"}>
              {barbeiros.map((barbeiro) => {
                const horariosFiltrado = horarios.filter(
                  (h) => h.BARBEIRO_ID === barbeiro.ID
                );
                return (
                  <Fragment key={barbeiro.ID}>
                    <li className="py-3 border-list-services text-claro">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center col-8">
                          <div className="col-3 mx-3 border-radius-personalizada">
                            <img
                              className="img-fluid img-corte"
                              src={
                                process.env.REACT_APP_API_URL + barbeiro.IMAGEM
                              }
                              width="87%"
                            />
                          </div>
                          <div className="col-9">
                            <h6 className="m-0">{barbeiro.NOME}</h6>
                          </div>
                        </div>
                        {/* ICONE RELOGIO */}
                        <div className="d-flex justify-content-end align-items-center col-4 flex-column">
                          {user.BARBEIRO && (
                            <div className="container-fluid d-flex justify-content-center align-items-center mt-1 mb-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-trash3-fill mx-3"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setExcluirHorario(true);
                                  setBarbeiroSelecionado(barbeiro);
                                  setId(3);
                                }}
                              >
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-pencil-square mx-3"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setBarbeiroSelecionado(barbeiro);
                                  setShow(true);
                                }}
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                />
                              </svg>
                            </div>
                          )}
                          <div
                            className="col-9 px-1"
                            onClick={() =>
                              abrirListaHorarios(
                                barbeiro.ID,
                                horariosAberto,
                                setHorariosAberto
                              )
                            }
                          >
                            <div
                              className="icon-time d-flex justify-content-center"
                              id={`icon-time-${barbeiro.ID}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-clock-fill mx-3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                              </svg>
                            </div>
                            <div
                              className="icon-more d-flex justify-content-center"
                              id={`icon-mais-${barbeiro.ID}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-down-short"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <ul className="horarios-fechado" id={barbeiro.ID}>
                          {horariosFiltrado.length < 23 && user.BARBEIRO && (
                            <li
                              className="d-flex justify-content-center align-items-center my-3 text-white"
                              onClick={() => {
                                setBarbeiro(barbeiro);
                                setShowHorarios(true);
                              }}
                            >
                              adicionar horário +
                            </li>
                          )}

                          {horariosFiltrado.map((horario) => {
                            return (
                              horario.DISPONIVEL && (
                                <Fragment key={horario.ID}>
                                  <li className="d-flex justify-content-around align-items-center my-2">
                                    <div className="col-6 d-flex justify-content-center align-items-center">
                                      <p className="m-0 p-0">{horario.HORA}</p>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center align-items-center">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <button
                                          className="btn btn-sm bg-transparent text-white"
                                          onClick={() => {
                                            setHorarioSelecionado(horario);
                                            setShowModalPagamentoAgendamento(true)
                                            /*
                                            setMarcarEsseHorario(horario);
                                            setUserContrata((prevState) => {
                                              const novoEstado = {
                                                ...prevState,
                                                horarioMarcado: horario,
                                              };
                                              // futuramente preciso arrumar um jeito de fazer a requisição fora da atualização do estado
                                              verificaAntesDeMarcar(
                                                horario.ID,
                                                novoEstado
                                              );
                                              return novoEstado;
                                            });
                                            */
                                          }}

                                        >
                                          Marcar
                                        </button>
                                        {user.BARBEIRO && (
                                          <>
                                            <button
                                              className="btn btn-sm bg-transparent text-white"
                                              onClick={() => {
                                                setHorarioSelecionado(horario);
                                                setExcluirHorario(true);
                                                setId(2);
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash3-fill"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                              </svg>
                                            </button>
                                            <button
                                              className="btn btn-sm bg-transparent text-white"
                                              onClick={() => {
                                                setHorarioSelecionado(horario);
                                                setShowHorarios(true);
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-pencil-square"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path
                                                  fillRule="evenodd"
                                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                />
                                              </svg>
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                </Fragment>
                              )
                            );
                          })}
                        </ul>
                        {usuarioTemHorarioMarcado && horarioMarcado?.BARBEIRO_ID === barbeiro?.ID && (
                          <div className="container">
                            <div className="personalizar-item-desmarcar-horario">
                              <div className="hora">
                                <p className="m-0">{horarioMarcado.HORA}</p>
                              </div>
                              <div className="desmarcar">
                                <a  className="btn-desmarcar" onClick={() => desmarcarHorario()}>
                                  Desmarcar
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
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
  );
};
