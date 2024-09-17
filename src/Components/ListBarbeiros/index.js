import { AnimacaoContext } from "../../Context/AnimacaoHorarios";
import "./index.css";
import { useState, Fragment, useEffect, useContext } from "react";

export const ListBarbeiros = () => {
  const [barbeiros, setBarbeiros] = useState([
    {
      ID: 1,
      NOME: "LC",
      IMG: "barbeiros/barbeiro1.jpg",
    },
    {
      ID: 2,
      NOME: "Jota",
      IMG: "barbeiros/barbeiro2.jpg",
    },
  ]);

  const [horarios, setHorarios] = useState([
    {
      ID: 1,
      HORA: "08:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },
    {
      ID: 1,
      HORA: "09:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 1,
      HORA: "10:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 1,
      HORA: "11:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 1,
      HORA: "12:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 1,
      HORA: "14:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 1,
      HORA: "15:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 1,
      HORA: "16:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 1,
      HORA: "17:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },
    {
      ID: 1,
      HORA: "08:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },
    {
      ID: 1,
      HORA: "09:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 1,
      HORA: "10:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 1,
      HORA: "11:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 1,
      HORA: "12:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 1,
      HORA: "14:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 1,
      HORA: "15:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 1,
      HORA: "16:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 1,
      HORA: "17:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },
  ]);

  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });

  const { abrirListaHorarios } = useContext(AnimacaoContext);

  return (
    <>
      <div className="container-fluid bg-dark height-main">
        <div className="row">
          <div className="col-12 p-0">
            <ul className="m-0 p-0">
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
                            onClick={() => abrirListaHorarios(barbeiro.ID, horariosAberto, setHorariosAberto)}
                          >
                            <div className="icon-time d-flex justify-content-center" id={`icon-time-${barbeiro.ID}`}>
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
                            <div className="icon-more d-flex justify-content-center" id={`icon-mais-${barbeiro.ID}`}>
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
                          {horarios.map((horarios) => {
                            if (
                              horarios.BARBEIRO_ID === barbeiro.ID &&
                              horarios.DISPONIVEL
                            ) {
                              return (
                                <>
                                  <li className="d-flex justify-content-around align-items-center">
                                    <p className="m-0 p-0">{horarios.HORA}</p>
                                    <button className="btn btn-sm bg-transparent text-white">
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
