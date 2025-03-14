import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { HorarioContext } from "./HorarioContext";
import { ServicoContext } from "./ServicoContext";
import { socket } from "../socket";

export const HorarioMarcadoContext = createContext();

export const HorarioMarcadoProvider = ({ children }) => {
  const {
    setUsuarioTemHorarioMarcado,
    setHorarios,
  } = useContext(HorarioContext);
  const { setServicoEscolhido } = useContext(ServicoContext);
  const [horarioMarcado, setHorarioMarcado] = useState();
  const [horariosMarcado, setHorariosMarcado] = useState([]);
  const [horarioPendente, setHorarioPendente] = useState();
  const [horarioPendenteRecusar, setHorarioPendenteRecusar] = useState();
  const [cancelarHorarioMarcado, setCancelarHorarioMarcado] = useState();
  const [cancelarHorarioMarcadoAdm, setCancelarHorarioMarcadoAdm] = useState();
  const [finalizarHorarioAgendadoState, setFinalizarHorarioAgendadoState] =
    useState();
  const [storage, setStorage] = useState(null);
  const [agendamentosOrdenados, setAgendamentosOrdenados] = useState([]);
  const [hoje] = useState(new Date());

  // aceita horario pendente
  useEffect(() => {
    const socketInstancia = socket();
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
  }, [horarioPendente]);

  // cancela horario marcado (usuario)
  useEffect(() => {
    const socketInstancia = socket();
    if (cancelarHorarioMarcado) {
      socketInstancia.emit("cancelarHorarioMarcado", cancelarHorarioMarcado);
      socketInstancia.on("horarioMarcadoCancelado", (horarioCancelado) => {
        setHorarios(horarioCancelado.horarios);
        // mudança de localStorage aciona um useEffect em HoraMarcada
        localStorage.setItem("agendamento", '{}');
        setServicoEscolhido({})
      });
    }
  }, [cancelarHorarioMarcado]);

  // cancela horario marcado (adm)
  useEffect(() => {
    const socketInstancia = socket();
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
  }, [cancelarHorarioMarcadoAdm]);

  // finaliza horario agendado
  useEffect(() => {
    if (finalizarHorarioAgendado) {
      const socketInstancia = socket();
      socketInstancia.emit(
        "finalizarHorarioAgendado",
        finalizarHorarioAgendadoState
      );

      socketInstancia.on(
        "confirmarFinalizacaoHorarioAgendado",
        (horariosMarcado) => {
          if (horariosMarcado !== null) {
            setHorariosMarcado([...horariosMarcado]);
          }
        }
      );
    }
  }, [finalizarHorarioAgendadoState]);

  const { ordenarHorarios, setErrosHorarios } = useContext(HorarioContext);

  const ordenaAgendamentos = () => {
    if (horariosMarcado.length > 0) {
      const ordenados = [...horariosMarcado].sort((a, b) => {
        // Primeiro, ordenar pela propriedade RESERVADO (2, 1, 0)
        if (a.RESERVADO !== b.RESERVADO) {
          return b.RESERVADO - a.RESERVADO; // RESERVADO = 2 vem primeiro, depois 1, depois 0
        }

        // Se ambos têm o mesmo valor de RESERVADO, ordenar pelo HORARIO_ID
        const horarioA = a.HORARIO_ID;
        const horarioB = b.HORARIO_ID;

        // Ordenar pelo HORARIO_ID em ordem crescente
        return horarioA - horarioB;
      });

      const horariosDeHoje = ordenados.filter((horarioOrdenado) => {
        const dataFormatada = `${hoje.toLocaleString("pt-BR", {
          day: "2-digit",
        })}/${hoje.toLocaleString("pt-BR", {
          month: "2-digit",
        })}/${hoje.toLocaleString("pt-BR", { year: "numeric" })}`;
        return horarioOrdenado.DATA === dataFormatada;
      });
      setAgendamentosOrdenados(horariosDeHoje);
    } else {
      setAgendamentosOrdenados(horariosMarcado);
    }
  }

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

  // gatilho ativa useEffect
  const aceitarHorarioPendente = (horario) => {
    setHorarioPendente(horario);
  };

  // gatilho ativa useEffect
  const cancelarMeuHorarioMarcado = (horarioMarcado) => {
    setCancelarHorarioMarcado(horarioMarcado);
  };

  // gatilho ativa useEffect
  const cancelarMeuHorarioMarcadoAdm = (horarioMarcado) => {
    setCancelarHorarioMarcadoAdm(horarioMarcado);
  };

  // gatilho ativa useEffect
  const finalizarHorarioAgendado = (horarioAgendado) => {
    setFinalizarHorarioAgendadoState(horarioAgendado);
  };

  return (
    <HorarioMarcadoContext.Provider
      value={{
        horarioMarcado,
        setHorarioMarcado,
        verificaAntesDeMarcar,
        buscarHorariosAgendado,
        horariosMarcado,
        setHorariosMarcado,
        aceitarHorarioPendente,
        cancelarMeuHorarioMarcado,
        cancelarMeuHorarioMarcadoAdm,
        finalizarHorarioAgendado,
        storage,
        setStorage,
        agendamentosOrdenados, 
        setAgendamentosOrdenados,
        ordenaAgendamentos,
      }}
    >
      {children}
    </HorarioMarcadoContext.Provider>
);
};
