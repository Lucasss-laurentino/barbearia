import { useEffect, useState } from "react";
import { AnimacaoContext } from "../../Context/AnimacaoHorarios";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { UserContext } from "../../Context/UserContext";
import { ModalBarbeiros } from "../ModalBarbeiros";
import "./index.css";
import { Fragment, useContext } from "react";
import { ModalHorarios } from "../ModalHorarios";
import { ModalExcluirHorario } from "../ModalExcluirHorario";

export const ListBarbeiros = () => {
  const { abrirListaHorarios } = useContext(AnimacaoContext);
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [showHorarios, setShowHorarios] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCloseHorario = () => setShowHorarios(false);
  const [barbeiro, setBarbeiro] = useState({});
  const [showExcluirHorario, setExcluirHorario] = useState(false);
  const handleCloseExcluirHorario = () => setExcluirHorario(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const { pegarBarbeiros, barbeiros } = useContext(BarbeiroContext);
  const {
    pegarHorarios,
    horarios,
    horariosAberto,
    setHorariosAberto,
    marcarHorario,
  } = useContext(HorarioContext);

  useEffect(() => {
    pegarBarbeiros();
    pegarHorarios();
  }, []);

  useEffect(() => {
    console.log(horarios);
  }, [horarios]);

  return (
    <>
      <ModalHorarios
        show={showHorarios}
        setShow={setShowHorarios}
        handleClose={handleCloseHorario}
        barbeiro={barbeiro}
        horario={horarioSelecionado}
        setHorarioSelecionado={setHorarioSelecionado}
      />
      <ModalBarbeiros show={show} setShow={setShow} handleClose={handleClose} />
      <ModalExcluirHorario 
        show={showExcluirHorario} 
        setShow={setExcluirHorario} 
        handleClose={handleCloseExcluirHorario}
        horario={horarioSelecionado}
      />
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
      <div className="container-fluid bg-dark height-main">
        <div className="row">
          <div className="col-12 p-0">
            <ul className="lista-barbeiros">
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
                              src={barbeiro.IMAGEM}
                              width="87%"
                            />
                          </div>
                          <div className="col-9">
                            <h6 className="m-0">{barbeiro.NOME}</h6>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center col-4">
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
                      <div className="d-flex justify-content-center align-items-center">
                        <ul className="horarios-fechado" id={barbeiro.ID}>
                          {horariosFiltrado.length < 23 && (
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
                              <Fragment key={horario.ID}>
                                <li className="d-flex justify-content-around align-items-center my-2">
                                  <p className="m-0 p-0">{horario.HORA}</p>
                                  {horario.DISPONIVEL ? (
                                    <div className="d-flex justify-content-between align-items-center">
                                      <button
                                        className="btn btn-sm bg-transparent text-white"
                                        onClick={() =>
                                          marcarHorario(
                                            horario.ID,
                                            horario.BARBEIRO_ID
                                          )
                                        }
                                      >
                                        Marcar
                                      </button>
                                      {user.BARBEIRO && (
                                        <>
                                          <button className="btn btn-sm bg-transparent text-white" onClick={() => {
                                            setHorarioSelecionado(horario);
                                            setExcluirHorario(true);
                                            }}>
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
                                          <button className="btn btn-sm bg-transparent text-white" onClick={() => {
                                            setHorarioSelecionado(horario)
                                            setShowHorarios(true);
                                          }}>
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
                                  ) : (
                                    <img
                                      src="excluir.png"
                                      alt=""
                                      width={"5%"}
                                      className="img-fluid"
                                    />
                                  )}
                                </li>
                              </Fragment>
                            );
                          })}
                        </ul>
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
