import { Fragment, useContext, useEffect, useState } from "react";
import { ModalMarcarHorarioDeslogado } from "../ModalMarcarHorarioDeslogado";
import { ServicoContext } from "../../../Context/ServicoContext";
import { toast, Bounce } from "react-toastify";
import { HorarioContext } from "../../../Context/HorarioContext";
import { DataContext } from "../../../Context/DataContext";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";
import { socket } from "../../../socket";

export const ListaHorarios = ({
  barbeiro,
  user,
  horariosFiltrado,
  setBarbeiro,
  setShowHorarios,
  setClasseCalendario,
  setHorarioSelecionado,
  horarioSelecionado,
  setExcluirHorario,
  setId,
  barbearia,
  setCalendarioAberto,
}) => {
  const { servicoEscolhido } = useContext(ServicoContext);
  const {
    showModalMarcarHorarioDeslogado,
    setShowModalMarcarHorarioDeslogado,
    horarios,
    setHorarios,
    marcarAlmoco,
    agendar,
  } = useContext(HorarioContext);
  const { horariosMarcado } = useContext(HorarioMarcadoContext);
  const { data, pegarDataDeHoje } = useContext(DataContext);
  const [horariosDessaData, setHorariosDessaData] = useState([]);
  const [horaAtual, setHoraAtual] = useState();

  // filtra horarios pra exibir somente horarios de hoje, horarios acima da hora atual e horarios disponiveis
  useEffect(() => {
    if (user?.ADM) {
      setHorariosDessaData([...horariosFiltrado]);
    } else {
      const hora = new Date().getHours();

      const horariosDisponiveis = horariosFiltrado.filter((horario) => {
        if (horario.HORA.split(":")[0] > hora) {
          return horario;
        }
      });

      const horarios = horariosDisponiveis.filter((horarioDisponivel) => {
        if (data) {
          const horario = horariosMarcado.some((hM) => {
            if (hM.HORARIO_ID === horarioDisponivel.ID) {
              if (hM.DATA === data) {
                return hM;
              }
            }
          });
          if (!horario) {
            return horarioDisponivel;
          }
        }
      });
      setHorariosDessaData([...horarios]);
    }
  }, [horariosMarcado, data, horarios]);

  useEffect(() => {
    pegarDataDeHoje();
    const hoje = new Date();
    const hora = hoje.getHours();
    const minutos = hoje.getMinutes().toString().padStart(2, "0");
    setHoraAtual(`${hora}:${minutos}`);
  }, []);

  // resposta socket pra nao renderizar horario marcado como almoço pelo adm
  useEffect(() => {
    const sockerInstancia = socket();
    sockerInstancia.on(`almocoMarcadoUser${barbearia}`, (result) => {
      setHorarios([...result]);
    })
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
            <p className="m-0 cursor">adicionar horário +</p>
          </li>
        )}

        {/* MOSTRA DATA ATUAL */}
        <li
          className="d-flex justify-content-center align-items-center my-3 text-white"
          onClick={() => {
            setClasseCalendario("encapsula-calendario");
            setCalendarioAberto(true);
          }}
        >
          <p className="m-0 cursor">{data}</p>
        </li>

        {horariosDessaData.length > 0 && horariosDessaData.map((horario) => {
          if (!horario?.INTERVALO && !user?.ADM) {
            return (
              <Fragment key={horario.ID}>
                <li className="d-flex justify-content-around align-items-center my-2">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <p className="m-0 p-0">{horario.HORA}</p>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-end align-items-center">
                      {user?.ADM && horario.INTERVALO && (
                        <button
                          className="btn btn-sm mx-2 border border-success text-success"
                          onClick={() => marcarAlmoco(horario)}
                        >
                          Almoço
                        </button>
                      )}
                      {user?.ADM && !horario.INTERVALO && (
                        <button
                          className="btn btn-sm bg-transparent mx-2 text-white border border-white"
                          onClick={() => marcarAlmoco(horario)}
                        >
                          Almoço
                        </button>
                      )}
                      {!user?.ADM && (
                        <button
                          className="btn btn-sm bg-transparent mx-2 text-white"
                          onClick={() => {
                            if (servicoEscolhido) {
                              if (!user?.ID) {
                                // ATIVA MODAL PRA ENVIAR O NOME E DE LA É FEITO O AGENDAMENTO
                                setHorarioSelecionado(horario);
                                setShowModalMarcarHorarioDeslogado(true);
                              } else {
                                // AGENDAMENTO DIRETO AQUI
                                setHorarioSelecionado(horario);
                                agendar(
                                  { NOME_CLIENTE: user.NOME },
                                  horario,
                                  servicoEscolhido,
                                  data,
                                  user
                                );
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
                      )}
                      {user?.ADM && (
                        <>
                          <button
                            className="btn btn-sm bg-transparent text-white mx-2"
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
                            className="btn btn-sm bg-transparent text-white mx-2"
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
          } else if(user?.ADM){
            return (
              <Fragment key={horario?.ID}>
                <li className="d-flex justify-content-around align-items-center my-2">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <p className="m-0 p-0">{horario?.HORA}</p>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-end align-items-center">
                      {user?.ADM && horario.INTERVALO && (
                        <button
                          className="btn btn-sm mx-2 border border-success text-success"
                          onClick={() => marcarAlmoco(horario, barbearia)}
                        >
                          Almoço
                        </button>
                      )}
                      {user?.ADM && !horario.INTERVALO && (
                        <button
                          className="btn btn-sm bg-transparent mx-2 text-white border border-white"
                          onClick={() => marcarAlmoco(horario, barbearia)}
                        >
                          Almoço
                        </button>
                      )}
                      {!user?.ADM && (
                        <button
                          className="btn btn-sm bg-transparent mx-2 text-white"
                          onClick={() => {
                            if (servicoEscolhido) {
                              if (!user?.ID) {
                                // ATIVA MODAL PRA ENVIAR O NOME E DE LA É FEITO O AGENDAMENTO
                                setHorarioSelecionado(horario);
                                setShowModalMarcarHorarioDeslogado(true);
                              } else {
                                // AGENDAMENTO DIRETO AQUI
                                setHorarioSelecionado(horario);
                                agendar(
                                  { NOME_CLIENTE: user.NOME },
                                  horario,
                                  servicoEscolhido,
                                  data,
                                  user
                                );
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
                      )}
                      {user?.ADM && (
                        <>
                          <button
                            className="btn btn-sm bg-transparent text-white mx-2"
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
                            className="btn btn-sm bg-transparent text-white mx-2"
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
        })}

        {horariosDessaData.length < 1 &&
          <>
          <div className="d-flex justify-content-center align-items-center">
            <h6 className="p-0 m-0 text-white">Nenhum Horário disponível</h6>
          </div>
          </>
        }
      </ul>
    </>
  );
};
