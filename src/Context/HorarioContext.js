import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { socket } from "../socket";
import { BarbeariaContext } from "./BarbeariaContext";
import { BarbeiroContext } from "./BarbeiroContext";
import {
  retornaBarbeirosComHorariosFiltrado,
  retornaHorariosDisponiveisPraAgendamento,
  filtraHorariosPorHoraEminuto,
} from "../Utils/filtrarHorarios";
import { UserContext } from "./UserContext";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  // states
  const [horarios, setHorarios] = useState([]);
  const [limparHoraAposExclusao, setLimparHoraAposExclusao] = useState(false);
  const [errosHorarios, setErrosHorarios] = useState({
    erro: false,
    menssagem: "",
  });
  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });
  const [loadHorarios, setLoadHorarios] = useState(false);
  const [loadEditarHorarioBarbeiro, setLoadEditarHorarioBarbeiro] =
    useState(false);
  const [marcarAlmocoState, setMarcarAlmocoState] = useState({});
  const [agendamento, setAgendamento] = useState({});
  const [showModalMarcarHorarioDeslogado, setShowModalMarcarHorarioDeslogado] =
    useState(false);
  const [showExcluirHorario, setExcluirHorario] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [showModalEditarHorarioBarbeiro, setShowModalEditarHorarioBarbeiro] =
    useState(false);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  // contexts
  const { barbearia } = useContext(BarbeariaContext);
  const { barbeiros } = useContext(BarbeiroContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(marcarAlmocoState).length > 0) {
      const socketInstancia = socket();
      socketInstancia.emit(`marcarAlmoco`, marcarAlmocoState);

      socketInstancia.on(`almocoMarcado${barbearia}`, async (result) => {
        setHorarios([...result]);
      });
    }
  }, [marcarAlmocoState]);

  useEffect(() => {
    if (barbearia) pegarHorarios();
  }, [barbearia]);

  const ordenarHorarios = async (horariosResponse) => {
    const horariosOrdenados = await horariosResponse.sort((a, b) => {
      return a.HORA.localeCompare(b.HORA);
    });
    setHorarios([...horariosOrdenados]);
  };

  const criarHorario = async (data, barbeiro, setShow, setValue) => {
    try {
      setLoadHorarios(true);
      const response = await http.post(
        "horario/criarHorario",
        { horario: data, barbeiro },
        { withCredentials: true }
      );
      if (!response) throw "Erro ao criar horario";
      const horariosResponse = [...horarios, response.data];
      ordenarHorarios(horariosResponse);
      setValue("HORA", "");
      setLoadHorarios(false);
      setShow(false);
    } catch (erro) {
      setErrosHorarios({ erro: true, menssagem: erro?.response?.data });
      setLoadHorarios(false);
    }
  };

  const pegarHorarios = async () => {
    try {
      const response = await http.get(`horario/pegarHorarios/${barbearia}`);
      if (!response) throw "Erro ao buscar horarios";
      ordenarHorarios(response.data);
    } catch (erro) {}
  };

  const pegarHorario = async (idHorario) => {
    const horario = horarios.find((h) => h.ID === idHorario);
    return horario;
  };

  const editarHorario = async (data, horario, setShow, setValue) => {
    try {
      setLoadEditarHorarioBarbeiro(true);
      const response = await http.put(
        `horario/editarHorario/${horario.ID}`,
        data,
        {
          withCredentials: true,
        }
      );
      ordenarHorarios(response.data);
      setValue("HORA", "");
      setLoadEditarHorarioBarbeiro(false);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const excluirHorario = async (horario, setLoadExcluir) => {
    try {
      setLoadExcluir(true);
      const response = await http.delete(
        `horario/excluirHorario/${horario.ID}`,
        { withCredentials: true }
      );
      ordenarHorarios(response.data);
      setLimparHoraAposExclusao(true);
      setLoadExcluir(false);
      handleCloseExcluirHorario();
    } catch (error) {
      console.log(error);
    }
  };

  const marcarAlmoco = async (horario) => {
    try {
      const result = await http.post("/horario/marcarAlmoco", horario, {
        withCredentials: true,
      });
      if (!result) throw "Erro ao marcar horário de almoço";
      setMarcarAlmocoState(() => {
        let horarioAlmoco = result.data.find((horario) => horario?.INTERVALO);
        if (horarioAlmoco === null) {
          return horarioAlmoco;
        }
        return {};
      });
      setHorarios([...result.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const horariosDesseBarbeiro = (barbeiro) => {
    return horarios.filter((horario) => horario.BARBEIRO_ID === barbeiro.ID);
  };

  const filtraHorariosPelaHora = async (horariosBarbeiro) => {
    if (horariosBarbeiro.length < 1) {
      return null;
    }
    const horariosDisponiveis = horariosBarbeiro.filter((horarioBarbeiro) => {
      const hora = new Date().getHours();
      if (horarioBarbeiro.HORA.split(":")[0] > hora) {
        return horarioBarbeiro;
      }
    });
    return horariosDisponiveis;
  };

  const filtraHorariosDisponiveis = async (
    horariosFiltradoPelaHora,
    horariosMarcado,
    data
  ) => {
    const horariosDisponiveis = horariosFiltradoPelaHora.filter(
      (horarioFiltradoPelaHora) => {
        const horarioEncontrado = horariosMarcado.find(
          (hM) =>
            hM.HORARIO_ID === horarioFiltradoPelaHora.ID && data === hM.DATA
        );
        if (!horarioEncontrado) {
          return horarioFiltradoPelaHora;
        }
      }
    );
    return horariosDisponiveis;
  };

  const handleCloseExcluirHorario = () => {
    setExcluirHorario(false);
    setHorarioSelecionado(null);
  };

  const setarHorariosDisponiveis = async (horariosMarcado) => {
    try {

      const barbeiroEhorariosFormatado = await filtraHorariosPorBarbeiros();
      if (user?.ADM) {
        setHorariosDisponiveis([...barbeiroEhorariosFormatado]);
        return;
      }

      const horariosDisponiveisPraAgendamento = await filtraHorariosDisponiveisPraAgendamento(
        barbeiroEhorariosFormatado,
        horariosMarcado
      );

      const horariosFiltradoPorHoraEminuto = await filtraHorariosPorHoraEminuto(
        horariosDisponiveisPraAgendamento
      );
      setHorariosDisponiveis([...horariosFiltradoPorHoraEminuto]);
    } catch (error) {
      setHorariosDisponiveis([]);      
    }
  };

  const filtraHorariosPorBarbeiros = async () => {
    if (!barbeiros) throw new Error("barbeiros não encontrados");
    return await retornaBarbeirosComHorariosFiltrado(barbeiros, horarios);
  };

  const filtraHorariosDisponiveisPraAgendamento = async (barbeiroEhorariosFiltrado, horariosMarcado) => {
    if (horariosMarcado.length < 1) {
      return barbeiroEhorariosFiltrado;
    }
    return await retornaHorariosDisponiveisPraAgendamento(barbeiroEhorariosFiltrado, horariosMarcado);
  };

  return (
    <HorarioContext.Provider
      value={{
        horarios,
        setHorarios,
        horariosAberto,
        setHorariosAberto,
        criarHorario,
        pegarHorarios,
        loadHorarios,
        setLoadHorarios,
        excluirHorario,
        editarHorario,
        limparHoraAposExclusao,
        setLimparHoraAposExclusao,
        errosHorarios,
        setErrosHorarios,
        ordenarHorarios,
        agendamento,
        showModalMarcarHorarioDeslogado,
        setShowModalMarcarHorarioDeslogado,
        marcarAlmoco,
        showExcluirHorario,
        setExcluirHorario,
        handleCloseExcluirHorario,
        horarioSelecionado,
        setHorarioSelecionado,
        showModalEditarHorarioBarbeiro,
        setShowModalEditarHorarioBarbeiro,
        loadEditarHorarioBarbeiro,
        setLoadEditarHorarioBarbeiro,
        horariosDesseBarbeiro,
        filtraHorariosPelaHora,
        filtraHorariosDisponiveis,
        pegarHorario,
        setarHorariosDisponiveis,
        horariosDisponiveis,
        setHorariosDisponiveis,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
