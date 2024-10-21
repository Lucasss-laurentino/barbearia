import { useContext, useEffect, useState } from "react";
import { socket } from "../../socket";
import "./index.css";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { UserContext } from "../../Context/UserContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { useParams } from "react-router-dom";

export const Horarios = () => {
  const { horariosMarcado, setHorariosMarcado, aceitarHorarioPendente } =
    useContext(HorarioMarcadoContext);
  const { user } = useContext(UserContext);
  const { servicos } = useContext(ServicoContext);
  const { horarios } = useContext(HorarioContext);
  const { barbearia } = useParams();
  const [lucroDiario, setLucroDiario] = useState();

  const limparValor = (valor) => {
    return valor
      ? parseFloat(valor.replace(/R\$|\./g, "").replace(",", "."))
      : "";
  };

  useEffect(() => {
    // esse evento tambem é escutado em horario context
    const socketInstancia = socket();
    socketInstancia.on(`agendamentoResultado${barbearia}`, async (agendamentoReturn) => {
      const { agendamento } = agendamentoReturn;
      if (agendamento.BARBEARIA === user.NOME_BARBEARIA) {
        setHorariosMarcado([...horariosMarcado, agendamento]);
      }
    });
  }, []);

  useEffect(() => {
    let precos = [];

    horariosMarcado.forEach((horarioMarcado) => {
      const servico = servicos.find((s) => s.ID === horarioMarcado?.SERVICO_ID);
      precos.push(limparValor(servico?.PRECO));
    });

    const total = precos.reduce(
      (valorAcumulado, valorAtual) => valorAcumulado + valorAtual,
      0
    );

    setLucroDiario(
      `R$ ${total.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    );
  }, [horariosMarcado]);

  return (
    <>
      <div className="container-fluid bg-dark height-main">
        <div className="row text-white">
          <div className="col-12 p-0">
            <div className="col-12 head-horarios">
              <div className="col-5 quantia-agendamento-horarios">
                <div className="col-11 px-1 align-qnt-agendamento">
                  <h5 className="">{horariosMarcado.length}</h5>
                  <p className="m-0">Agendamentos</p>
                </div>
              </div>
              <div className="col-6 align-qnt-agendamento">
                <h5>{lucroDiario}</h5>
                <p className="m-0">Faturamento previsto</p>
              </div>
            </div>
            <ul className="list-horarios">
              {horariosMarcado.map((horario) => {
                console.log(horario);
                const hora = horarios.find((h) => h.ID === horario?.HORARIO_ID);
                const servico = servicos.find(
                  (s) => s.ID === horario?.SERVICO_ID
                );
                return (
                  <li
                    className="pt-3 itens-list-horarios"
                    key={horario.HORARIO_ID}
                  >
                    <div className="container fluid">
                      <div className="row">
                        <div className="col-12 d-flex">
                          <div className="col-6">
                            {/* HORA, ICONE RELOGIO, NOME DO SERVIÇO E DO CLIENTE */}
                            <div className="col-12">
                              {/* HORA E ICONE RELOGIO */}
                              <div className="encapsula-icon d-flex justify-content-around align-items-center background-claro col-10">
                                {/* ICONE RELOGIO */}
                                <div className="icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    fill="currentColor"
                                    className="bi bi-clock mx-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                  </svg>
                                </div>
                                {/* HORA */}
                                <div className="hr">
                                  <p className="m-0">{hora?.HORA}</p>
                                </div>
                              </div>
                              {/* NOME DO SERVIÇO E DO CLIENTE */}
                              <div className="container">
                                <h6 className="my-2">{horario?.USER_NOME}</h6>
                                <p className="m-0">{servico?.NOME_SERVICO}</p>
                              </div>
                            </div>
                          </div>
                          {/* ICONE WHATSAPP, PREÇO E PRAZO */}
                          <div className="col-6">
                            <div className="col-12">
                              {/* ICONE WHATSAPP */}
                              <div className="encapsula-icon d-flex justify-content-end align-items-center mx-4">
                                <div className="icon pt-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="#127617"
                                    className="bi bi-whatsapp my-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                  </svg>
                                </div>
                              </div>
                              {/* PREÇO E PRAZO */}
                              <div className="container d-flex justify-content-center align-items-end flex-column">
                                <h6 className="my-2">{servico?.PRECO}</h6>
                                <p className="m-0">{servico?.PRAZO}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row row-agendamento-pendente mt-4">
                        {horario.RESERVADO === 2 && (
                          <>
                            <div className="col-12 d-flex justify-content-center">
                              <p className="p-agendamento-pendente">
                                Agendamento pendente
                              </p>
                            </div>

                            <div className="col-12 d-flex justify-content-around align-items-center my-2">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => aceitarHorarioPendente(horario)}
                              >
                                Aceitar
                              </button>
                              <button className="btn btn-sm btn-danger">
                                Recusar
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
