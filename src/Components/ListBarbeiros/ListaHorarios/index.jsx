import { Fragment, useContext, useEffect, useState } from "react";
import { ModalMarcarHorarioDeslogado } from "../ModalMarcarHorarioDeslogado";
import { ServicoContext } from "../../../Context/ServicoContext";
import { toast, Bounce } from "react-toastify";
import { HorarioContext } from "../../../Context/HorarioContext";
import { AnimacaoContext } from "../../../Context/AnimacaoHorarios";
import { DataContext } from "../../../Context/DataContext";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";

export const ListaHorarios = ({
  barbeiro,
  user,
  horariosFiltrado,
  setBarbeiro,
  setShowHorarios,
  setHorarioSelecionado,
  horarioSelecionado,
  setExcluirHorario,
  setId,
  barbearia,
}) => {
  const { servicoEscolhido } = useContext(ServicoContext);
  const {
    showModalMarcarHorarioDeslogado,
    setShowModalMarcarHorarioDeslogado,
    horarios,
  } = useContext(HorarioContext);
  const { horariosMarcado } = useContext(HorarioMarcadoContext);
  const { setAnimaCalendario } = useContext(AnimacaoContext);
  const { data } = useContext(DataContext);
  const [horariosDessaData, setHorariosDessaData] = useState([]);
  const [horaAtual, setHoraAtual] = useState();
  const [dia, setDia] = useState();
  const [mes, setMes] = useState();

  useEffect(() => {
    if (horariosMarcado.length > 0) {
      horariosMarcado.forEach((horarioMarcado) => {
        if (horarioMarcado.DATA === data) {
          const horario = horariosFiltrado.filter(
            (hF) => hF.ID !== horarioMarcado.HORARIO_ID
          );
          setHorariosDessaData([...horario]);
        } else {
          setHorariosDessaData([...horariosFiltrado]);
        }
      });
    } else {
      setHorariosDessaData([...horariosFiltrado]);
    }
  }, [horariosMarcado, data, horarios]);

  useEffect(() => {
    const hoje = new Date();
    const hora = hoje.getHours();
    const minutos = hoje.getMinutes().toString().padStart(2, "0");
    setHoraAtual(`${hora}:${minutos}`);
    setDia(hoje.getDate());
    setMes(hoje.getMonth() + 1);
  }, []);
  
  return (
    <>
      {/* Modal abre se o usuário tentar marcar um horario sem ter feito login antes */}
      <ModalMarcarHorarioDeslogado
        show={showModalMarcarHorarioDeslogado}
        setShow={setShowModalMarcarHorarioDeslogado}
        horarioSelecionado={horarioSelecionado}
        servicoEscolhido={servicoEscolhido}
        barbearia={barbearia}
      />
      <ul className="horarios-fechado" id={barbeiro.ID}>
        {/* ADICIONA NOVO HORARIO */}
        {user?.ADM && (
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

        {/* MOSTRA DATA ATUAL */}
        <li
          className="d-flex justify-content-center align-items-center my-3 text-white"
          onClick={() =>
            setAnimaCalendario("container-fluid calendario bg-dark")
          }
        >
          {data}
        </li>

        {horariosDessaData.map((horario) => {
          {
            /* pra administrador mostra todos horarios independente da hora atual */
          }
          if (user.ADM) {
            return (
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
                          if (servicoEscolhido) {
                            if (!user?.ID) {
                              setHorarioSelecionado(horario);
                              setShowModalMarcarHorarioDeslogado(true);
                            }
                          } else {
                            toast.error(
                              "Escolha um serviço antes de agendar um horário !",
                              {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                transition: Bounce,
                              }
                            );
                          }
                        }}
                      >
                        Marcar
                      </button>
                      {user.ADM && (
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
            );
          } else {
            {
              /* pra usuario normal mostra somente os horarios que sao maiores que a hora atual */
            }
            if (data === `${dia}/${mes}`) {
              if (horario.HORA > horaAtual) {
                return (
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
                              if (servicoEscolhido) {
                                if (!user?.ID) {
                                  setHorarioSelecionado(horario);
                                  setShowModalMarcarHorarioDeslogado(true);
                                }
                              } else {
                                toast.error(
                                  "Escolha um serviço antes de agendar um horário !",
                                  {
                                    position: "bottom-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    transition: Bounce,
                                  }
                                );
                              }
                            }}
                          >
                            Marcar
                          </button>
                          {user.ADM && (
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
                );
              }
            } else {
              return (
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
                            if (servicoEscolhido) {
                              if (!user?.ID) {
                                setHorarioSelecionado(horario);
                                setShowModalMarcarHorarioDeslogado(true);
                              }
                            } else {
                              toast.error(
                                "Escolha um serviço antes de agendar um horário !",
                                {
                                  position: "bottom-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",
                                  transition: Bounce,
                                }
                              );
                            }
                          }}
                        >
                          Marcar
                        </button>
                        {user.ADM && (
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
              );
            }
          }
        })}
      </ul>
    </>
  );
};
