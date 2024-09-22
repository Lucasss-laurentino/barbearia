import { useState } from "react";
import { AnimacaoContext } from "../../Context/AnimacaoHorarios";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { ModalBarbeiros } from "../ModalBarbeiros";
import "./index.css";
import { Fragment, useContext } from "react";

export const ListBarbeiros = () => {
  const { barbeiros } = useContext(BarbeiroContext);
  const { horarios, horariosAberto, setHorariosAberto, marcarHorario } =
    useContext(HorarioContext);

  const { abrirListaHorarios } = useContext(AnimacaoContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (
    <>
    <ModalBarbeiros  show={show} handleClose={handleClose}/>
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
                return (
                  <Fragment key={barbeiro.ID}>
                    <li className="py-3 border-list-services text-claro">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center col-8">
                          <div className="col-3 mx-3 border-radius-personalizada">
                            <img
                              className="img-fluid img-corte"
                              src={barbeiro.IMG}
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
                                class="bi bi-clock-fill mx-3"
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
                                class="bi bi-arrow-down-short"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <ul className="horarios-fechado" id={barbeiro.ID}>
                          {horarios.map((horario) => {
                            if (
                              horario.BARBEIRO_ID === barbeiro.ID &&
                              horario.DISPONIVEL
                            ) {
                              return (
                                <>
                                  <li className="d-flex justify-content-around align-items-center">
                                    <p className="m-0 p-0">{horario.HORA}</p>
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
                                  </li>
                                </>
                              );
                            }
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
