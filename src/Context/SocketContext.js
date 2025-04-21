import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { HorarioContext } from "./HorarioContext";
import { HorarioMarcadoContext } from "./HorarioMarcadoContext";
import { ServicoContext } from "./ServicoContext";
import { useFormatarHorarioMarcado } from "../Hooks/horarioMarcado";
import { BarbeariaContext } from "./BarbeariaContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [storage, setStorage] = useState(null);
  const { formatarHorarioMarcado } = useFormatarHorarioMarcado();
  const { setHorarios, setShowModalMarcarHorarioDeslogado } =
    useContext(HorarioContext);
  const { barbearia } = useContext(BarbeariaContext);
  const { servicoEscolhido, setServicoEscolhido } =
    useContext(ServicoContext);
  const { setHorariosMarcado, horariosMarcado, setHorarioMarcado } = useContext(
    HorarioMarcadoContext
  );
  const [socketInstancia] = useState(socket());

  const [erroFinalizarHorario, setErroFinalizarHorario] = useState();

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
        setHorariosMarcado(horarioParametro.horariosMarcado);
        setHorarioMarcado();
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
        try {
          const { horarios, horarioNaoPendente } = horarioParametro;
          const storageAgendamento = localStorage.getItem("agendamento");
          if (storageAgendamento) {
            const horarioAgendadoOBJ = JSON.parse(storageAgendamento);
            if (horarioAgendadoOBJ.ID === horarioNaoPendente.ID) {
              localStorage.setItem(
                "agendamento",
                JSON.stringify(horarioNaoPendente)
              );
            }
            setHorarioMarcado(horarioNaoPendente);
            setHorariosMarcado(horarioParametro.horariosMarcado);
            setHorarios(horarios);
          }
        } catch (error) {}
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
        setHorarioMarcado();
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
  }, [barbearia]);

  useEffect(() => {
    socketInstancia.on(
      `confirmarFinalizacaoHorarioAgendado${barbearia}`,
      (horarioFinalizado) => {
        const storage = JSON.parse(localStorage.getItem("agendamento"));
        if (storage?.ID === horarioFinalizado.ID) { 
          localStorage.setItem("agendamento", "{}");
          setHorarioMarcado();
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

  const agendarViaSocket = async (
    data,
    horarioSelecionado,
    dataEscolhida,
    user = null
  ) => {
    const agendamentoOBJ = await formatarAgendamento(
      data.NOME_CLIENTE,
      horarioSelecionado,
      servicoEscolhido,
      user,
      dataEscolhida
    );
    if (agendamentoOBJ.erro) throw new Error("Erro ao formatar agendamento");
    const { agendamento } = agendamentoOBJ;
    if (Object.keys(agendamento).length > 0) {
      socketInstancia.emit("agendar", agendamento);
      socketInstancia.on("confirmarAgendamento", async (agendamento) => {
        const agendamentoRetornado = agendamento.agendamento;
        setHorarios(agendamento.horarios);
        setHorariosMarcado([...horariosMarcado, agendamento.agendamento]);
        const agendamentoObjFormatadoPraExibicao = await formatarHorarioMarcado(
          agendamentoRetornado
        );
        localStorage.setItem(
          "agendamento",
          JSON.stringify(agendamentoObjFormatadoPraExibicao)
        );
        setHorarioMarcado(agendamentoObjFormatadoPraExibicao);
        setStorage(agendamentoObjFormatadoPraExibicao);
        setShowModalMarcarHorarioDeslogado(false);
      });
    }
  };

  const formatarAgendamento = async (
    NOME_CLIENTE,
    horarioSelecionado,
    servicoEscolhido,
    user,
    dataEscolhida
  ) => {
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
        agendamentoObj.ID = user.ID;
      }
      return { erro: false, agendamento: agendamentoObj };
    } catch (error) {
      return { erro: true, error };
    }
  };

  const cancelarMeuHorarioPendente = async (horario) => {
    socketInstancia.emit("cancelarHorarioPendente", horario);
    socketInstancia.on(
      "horarioPendenteCancelado",
      (horarioPendenteCancelado) => {
        localStorage.setItem("agendamento", "{}");
        setHorarios([...horarioPendenteCancelado.horarios]);
        setServicoEscolhido({});
        setHorarioMarcado();
        setHorariosMarcado([...horarioPendenteCancelado.horariosMarcado]);
        setStorage(null);
      }
    );
  };

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
  };

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
  };

  const cancelarMeuHorarioMarcado = async (cancelarHorarioMarcado) => {
    if (cancelarHorarioMarcado) {
      socketInstancia.emit("cancelarHorarioMarcado", cancelarHorarioMarcado);
      socketInstancia.on("horarioMarcadoCancelado", (horarioCancelado) => {
        setHorarios(horarioCancelado.horarios);
        // mudança de localStorage aciona um useEffect em HoraMarcada
        setHorariosMarcado(horarioCancelado.horariosMarcado);
        setHorarioMarcado();
        localStorage.setItem("agendamento", "{}");
        setServicoEscolhido({});
      });
    }
  };

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
  };

  const finalizarHorarioAgendado = async (horarioAgendado) => {
    socketInstancia.emit("finalizarHorarioAgendado", horarioAgendado);
    
    socketInstancia.on(
      "confirmarFinalizacaoHorarioAgendado",
      (horariosMarcado) => {
        if (horariosMarcado !== null) {
          setHorariosMarcado([...horariosMarcado]);
        }
      }
    );

    socketInstancia.on("erroAoFinalizarAgendamento", (mensagem) => {
      setErroFinalizarHorario(mensagem)
    });

  };

  return (
    <SocketContext.Provider
      value={{
        agendarViaSocket,
        cancelarMeuHorarioPendente,
        recusarHorarioPendente,
        aceitarHorarioPendente,
        cancelarMeuHorarioMarcado,
        cancelarHorarioMarcadoAdm,
        finalizarHorarioAgendado,
        storage,
        setStorage,
        erroFinalizarHorario,
        setErroFinalizarHorario,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
