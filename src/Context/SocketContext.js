import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { HorarioContext } from "./HorarioContext";
import { HorarioMarcadoContext } from "./HorarioMarcadoContext";
import { BarbeiroContext } from "./BarbeiroContext";
import { ServicoContext } from "./ServicoContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const [storage, setStorage] = useState(null);

    const {
        setHorarios,
        horarios,
        setShowModalMarcarHorarioDeslogado
    } = useContext(HorarioContext);
    const { barbeiros } = useContext(BarbeiroContext);
    const { servicos, setServicoEscolhido } = useContext(ServicoContext);
    const { setHorariosMarcado, horariosMarcado } = useContext(HorarioMarcadoContext);
    
    const [socketInstancia] = useState(socket());
    const [barbearia, setBarbearia] = useState(null);

    // ----- USE EFFECTS SÃO CONEXÕES SOCKETS DESTINADAS AO USUARIO

    useEffect(() => {
        socketInstancia.on(
            `agendamentoResultado${barbearia}`,
            async (agendamentoReturn) => {
                setHorarios([...agendamentoReturn.horarios]);
                setHorariosMarcado([...agendamentoReturn.horariosMarcado]);
            }
        );
    }, [barbearia]);

    useEffect(() => {
        socketInstancia.on(
            `confirmarHorarioRecusadoUsuario${barbearia}`,
            (horarioParametro) => {
                const { horarios, horarioRecusado } = horarioParametro;
                setHorarios(horarios);
                setHorariosMarcado(horarioParametro.horariosMarcado)

                if (
                    localStorage.getItem("agendamento") &&
                    localStorage.getItem("agendamento") !== "{}"
                ) {
                    const horarioAgendado = JSON.parse(
                        localStorage.getItem("agendamento")
                    );
                    if (horarioAgendado?.ID === horarioRecusado?.ID) {
                        localStorage.setItem("agendamento", "{}");
                        setStorage(null);
                        setServicoEscolhido(null);
                    }
                }
            }
        );
    }, [barbearia]);

    useEffect(() => {
        socketInstancia.on(
            `confirmarHorarioPendenteAceitoUsuario${barbearia}`,
            (horarioParametro) => {
                const { horarios, horarioNaoPendente } = horarioParametro;
                const agendamentoStorage = localStorage.getItem("agendamento");
                if (
                    agendamentoStorage &&
                    agendamentoStorage !== "" &&
                    agendamentoStorage !== "{}"
                ) {
                    const storage = JSON.parse(localStorage.getItem("agendamento"));
                    if (
                        storage &&
                        storage?.ID === horarioParametro.horarioNaoPendente?.ID
                    ) {
                        storage.RESERVADO = horarioNaoPendente.RESERVADO;
                        localStorage.setItem("agendamento", JSON.stringify(storage));
                    }
                }
                setHorariosMarcado(horarioParametro.horariosMarcado);
                setHorarios(horarios);
            }
        );
    }, [barbearia]);

    useEffect(() => {
        socketInstancia.on(
            `horarioMarcadoCancelado${barbearia}`,
            (horarioResponse) => {
                setHorariosMarcado(horarioResponse.horariosMarcado);
                setHorarios(horarioResponse.horarios);
            }
        );
    }, [barbearia]);

    useEffect(() => {
        socketInstancia.on(
            `horarioMarcadoCanceladoAdm${barbearia}`,
            (horarioResponse) => {
                setHorariosMarcado(horarioResponse.horariosMarcado);
                setHorarios(horarioResponse.horarios);
                if (
                    localStorage.getItem("agendamento") &&
                    localStorage.getItem("agendamento") !== "{}"
                ) {
                    const storage = JSON.parse(localStorage.getItem("agendamento"));
                    if (storage?.ID === horarioResponse.horarioRecusado?.ID)
                        localStorage.setItem("agendamento", "{}");
                    setServicoEscolhido();
                }
            }
        );
    }, [barbearia])

    useEffect(() => {
        socketInstancia.on(
            `confirmarFinalizacaoHorarioAgendado${barbearia}`,
            (horarioFinalizado) => {
                if (
                    localStorage.getItem("agendamento") &&
                    localStorage.getItem("agendamento") !== "{}"
                ) {
                    const storage = JSON.parse(localStorage.getItem("agendamento"));
                    if (storage.ID === horarioFinalizado.ID) {
                        localStorage.setItem("agendamento", "{}");
                        setStorage(null);
                    }
                }
            }
        );
    }, [barbearia]);

    useEffect(() => {
        socketInstancia.on(
            `confirmarCancelamentoHorarioPendente${barbearia}`,
            (horarioPendenteCancelado) => {
              setHorarios(horarioPendenteCancelado.horarios);
              setHorariosMarcado(horarioPendenteCancelado.horariosMarcado);
            }
          );
      
    }, [barbearia]);

    // FUNÇÕES SÃO CONEXÕES SOCKET DESTINADAS AO ADM

    const agendarViaSocket = async (data, horarioSelecionado, servicoEscolhido, dataEscolhida, user = null) => {
        const agendamentoOBJ = await formatarAgendamento(data.NOME_CLIENTE, horarioSelecionado, servicoEscolhido, user, dataEscolhida);
        if (agendamentoOBJ.erro) throw new Error("Erro ao formatar agendamento");
        const { agendamento } = agendamentoOBJ;
        if (Object.keys(agendamento).length > 0) {
            socketInstancia.emit("agendar", agendamento);
            socketInstancia.on("confirmarAgendamento", async (agendamento) => {
                const agendamentoRetornado = agendamento.agendamento;
                setHorarios(agendamento.horarios);
                console.log(horariosMarcado);
                setHorariosMarcado([...horariosMarcado, agendamento.agendamento]);
                const agendamentoObj = await formataAgendamentoRetornado(agendamentoRetornado);
                localStorage.setItem("agendamento", JSON.stringify(agendamentoObj));
                setStorage(agendamentoObj);
                setShowModalMarcarHorarioDeslogado(false);
            });
        }
    }

    const formatarAgendamento = async (NOME_CLIENTE, horarioSelecionado, servicoEscolhido, user, dataEscolhida) => {
        try {
            let agendamentoObj;
            agendamentoObj = {
                NOME_CLIENTE,
                HORA: horarioSelecionado,
                SERVICO: servicoEscolhido,
                DATA: dataEscolhida,
                STATUS: 1, // 1 = reservado / 0 = nao reservado
            };
            if (user?.ID) {
                agendamentoObj.ID = user.ID
            }
            return { erro: false, agendamento: agendamentoObj };
        } catch (error) {
            return { erro: true, error };
        }
    }

    const formataAgendamentoRetornado = async (agendamentoRetornado) => {
        const hora = horarios.find((h) => h.ID === agendamentoRetornado.HORARIO_ID);
        const barbeiro = barbeiros.find((b) => b.ID === agendamentoRetornado.BARBEIRO_ID);
        const servico = servicos.find((s) => s.ID === agendamentoRetornado.SERVICO_ID);
        const agendamentoObj = {
            ID: agendamentoRetornado.ID,
            HORA: hora.HORA,
            BARBEIRO: barbeiro,
            RESERVADO: agendamentoRetornado?.RESERVADO,
            SERVICO: servico,
            DATA: agendamentoRetornado.DATA,
        };
        return agendamentoObj;
    }

    const cancelarMeuHorarioPendente = async (horario) => {
        socketInstancia.emit("cancelarHorarioPendente", horario);
        socketInstancia.on(
            "horarioPendenteCancelado",
            (horarioPendenteCancelado) => {
                localStorage.setItem("agendamento", '{}');
                setHorarios([...horarioPendenteCancelado.horarios])
                setServicoEscolhido({})
                setHorariosMarcado([...horarioPendenteCancelado.horariosMarcado]);
                setStorage(null)
            }
        );
    }

    const recusarHorarioPendente = async (horarioPendenteRecusar) => {
        if (horarioPendenteRecusar) {
            socketInstancia.emit("recusarHorarioPendente", horarioPendenteRecusar);
            socketInstancia.on("confirmarHorarioRecusado", (horarioParametro) => {
                const { horarioRecusado } = horarioParametro;
                const novoHorariosMarcado = horariosMarcado.filter(
                    (h) => h.ID !== horarioRecusado.ID
                );
                setHorariosMarcado(novoHorariosMarcado);
            });
        }
    }

    const aceitarHorarioPendente = async (horarioPendente) => {
        if (horarioPendente) {
            socketInstancia.emit("aceitarHorarioPendente", horarioPendente);
            socketInstancia.on("confirmarHorarioAceito", (horarioAceito) => {
                const { horarios, horarioNaoPendente } = horarioAceito;
                const novoHorariosMarcado = horariosMarcado.map((hM) => {
                    if (hM.ID === horarioNaoPendente.ID) {
                        hM.RESERVADO = 1;
                    }
                    return hM;
                });
                setHorariosMarcado(novoHorariosMarcado);
                setHorarios(horarios);
            });
        }
    }

    const cancelarMeuHorarioMarcado = async (cancelarHorarioMarcado) => {
        if (cancelarHorarioMarcado) {
            socketInstancia.emit("cancelarHorarioMarcado", cancelarHorarioMarcado);
            socketInstancia.on("horarioMarcadoCancelado", (horarioCancelado) => {
                setHorarios(horarioCancelado.horarios);
                // mudança de localStorage aciona um useEffect em HoraMarcada
                setHorariosMarcado(horarioCancelado.horariosMarcado);
                setHorarios(horarioCancelado.horarios);
                localStorage.setItem("agendamento", '{}');
                setServicoEscolhido({})
            });
        }
    }

    const cancelarHorarioMarcadoAdm = async (cancelarHorarioMarcadoAdm) => {
        if (cancelarHorarioMarcadoAdm) {
            socketInstancia.emit(
                "cancelarHorarioMarcadoAdm",
                cancelarHorarioMarcadoAdm
            );
            socketInstancia.on("horarioMarcadoCanceladoAdm", (horarioCancelado) => {
                setHorarios(horarioCancelado.horarios);
                setHorariosMarcado(horarioCancelado.horariosMarcado);
            });
        }
    }

    const finalizarHorarioAgendado = async (horarioAgendado) => {
        socketInstancia.emit("finalizarHorarioAgendado", horarioAgendado);
        socketInstancia.on("confirmarFinalizacaoHorarioAgendado",
            (horariosMarcado) => {
                if (horariosMarcado !== null) {
                    setHorariosMarcado([...horariosMarcado]);
                }
            }
        );

    }

    return (
        <SocketContext.Provider value={{
            agendarViaSocket,
            cancelarMeuHorarioPendente,
            recusarHorarioPendente,
            setBarbearia,
            aceitarHorarioPendente,
            cancelarMeuHorarioMarcado,
            cancelarHorarioMarcadoAdm,
            finalizarHorarioAgendado,
            storage,
            setStorage,
        }}>
            {children}
        </SocketContext.Provider>
    );
}