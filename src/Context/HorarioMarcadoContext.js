import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { HorarioContext } from "./HorarioContext";
import { ServicoContext } from "./ServicoContext";
import { socket } from "../socket";

export const HorarioMarcadoContext = createContext();

export const HorarioMarcadoProvider = ({ children }) => {
  const { setUsuarioTemHorarioMarcado, setHorarios, horarios } =
    useContext(HorarioContext);
  const { setServicoEscolhido } = useContext(ServicoContext);
  const [horarioMarcado, setHorarioMarcado] = useState();
  const [horariosMarcado, setHorariosMarcado] = useState([]);
  const [horarioPendente, setHorarioPendente] = useState();
  const [horarioPendenteRecusar, setHorarioPendenteRecusar] = useState();
  const [cancelarHorarioPendente, setCancelarHorarioPendente] = useState();
  const [cancelarHorarioMarcado, setCancelarHorarioMarcado] = useState();
  const [cancelarHorarioMarcadoAdm, setCancelarHorarioMarcadoAdm] = useState();

  // aceita horario pendente
  useEffect(() => {
    const socketInstancia = socket();
    if (horarioPendente) {
      socketInstancia.emit("aceitarHorarioPendente", horarioPendente);
      socketInstancia.on("confirmarHorarioAceito", (horarioAceito) => {
        console.log(horarioAceito);
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
  }, [horarioPendente]);

  // recusa horario pendente
  useEffect(() => {
    const socketInstancia = socket();
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
  }, [horarioPendenteRecusar]);

  // cancela horario pendente
  useEffect(() => {
    if (cancelarHorarioPendente) {
      const socketInstancia = socket();
      socketInstancia.emit("cancelarHorarioPendente", cancelarHorarioPendente);
      socketInstancia.on(
        "horarioPendenteCancelado",
        (horarioPendenteCancelado) => {
          localStorage.setItem("agendamento", "");
        }
      );
    }
  }, [cancelarHorarioPendente]);

  // cancela horario marcado (usuario)
  useEffect(() => {
    const socketInstancia = socket();
    if (cancelarHorarioMarcado) {
      socketInstancia.emit("cancelarHorarioMarcado", cancelarHorarioMarcado);
      socketInstancia.on("horarioMarcadoCancelado", (horarioCancelado) => {
        setHorarios(horarioCancelado.horarios);
        localStorage.setItem("agendamento", "");
      });
    }
  }, [cancelarHorarioMarcado]);

  // cancela horario marcado (adm)
  useEffect(() => {
    const socketInstancia = socket();
    if (cancelarHorarioMarcadoAdm) {
      socketInstancia.emit("cancelarHorarioMarcadoAdm", cancelarHorarioMarcadoAdm);
      socketInstancia.on("horarioMarcadoCanceladoAdm", (horarioCancelado) => {
        setHorarios(horarioCancelado.horarios);
        setHorariosMarcado(horarioCancelado.horariosMarcado);
      });
    }
  }, [cancelarHorarioMarcadoAdm]);

  const { ordenarHorarios, setErrosHorarios } = useContext(HorarioContext);

  const buscarHorariosAgendado = async (barbearia) => {
    try {
      const response = await http.get(
        `horario/pegarHorariosAgendado/${barbearia}`
      );
      if (!response) throw "Erro ao buscar horários";
      setHorariosMarcado(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const marcarHorario = async (userContrata) => {
    try {
      const response = await http.post(
        "horario/marcarHorario",
        { userContrata },
        { withCredentials: true }
      );
      if (!response) throw "Erro ao marcar horario";
      ordenarHorarios(response.data);
      setUsuarioTemHorarioMarcado(true);
    } catch (error) {
      console.log(error);
    }
  };

  const verificaAntesDeMarcar = (horario_id, userContrata) => {
    // verifica se o usuario marcou um serviço antes de agendar um horario
    if (Object.keys(userContrata.servicoEscolhido).length < 1) {
      setErrosHorarios({
        erro: true,
        menssagem: "Selecione um serviço antes de agendar um horário",
      });
    } else {
      // futuramente será necessario verificar se o usuario ja possui um horario marcado
      marcarHorario(userContrata);
    }
  };

  const desmarcarHorario = async () => {
    try {
      const response = await http.post(
        "horario/desmarcarHorario",
        {},
        {
          withCredentials: true,
        }
      );
      ordenarHorarios(response.data);
      setUsuarioTemHorarioMarcado(false);
    } catch (error) {
      console.log(error);
    }
  };

  // gatilho ativa useEffect
  const cancelarMeuHorarioPendente = async (meuHorarioPendente) => {
    setCancelarHorarioPendente(meuHorarioPendente);
  };

  // gatilho ativa useEffect
  const aceitarHorarioPendente = (horario) => {
    setHorarioPendente(horario);
  };

  // gatilho ativa useEffect
  const recusarHorarioPendente = (horario) => {
    setHorarioPendenteRecusar(horario);
  };

  // gatilho ativa useEffect
  const cancelarMeuHorarioMarcado = (horarioMarcado) => {
    setCancelarHorarioMarcado(horarioMarcado);
  };

  const cancelarMeuHorarioMarcadoAdm = (horarioMarcado) => {
    setCancelarHorarioMarcadoAdm(horarioMarcado);
  };

  return (
    <HorarioMarcadoContext.Provider
      value={{
        horarioMarcado,
        setHorarioMarcado,
        verificaAntesDeMarcar,
        desmarcarHorario,
        buscarHorariosAgendado,
        horariosMarcado,
        setHorariosMarcado,
        cancelarMeuHorarioPendente,
        aceitarHorarioPendente,
        recusarHorarioPendente,
        cancelarMeuHorarioMarcado,
        cancelarMeuHorarioMarcadoAdm,
      }}
    >
      {children}
    </HorarioMarcadoContext.Provider>
  );
};
