import { createContext, useEffect, useState } from "react";
import { http } from "../http";
import { socket } from "../socket";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  // STATES
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
  const [barbearia, setBarbearia] = useState("");
  const [showExcluirHorario, setExcluirHorario] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [showModalEditarHorarioBarbeiro, setShowModalEditarHorarioBarbeiro] =
    useState(false);

  useEffect(() => {
    if (Object.keys(marcarAlmocoState).length > 0) {
      const socketInstancia = socket();
      socketInstancia.emit(`marcarAlmoco`, marcarAlmocoState);

      socketInstancia.on(`almocoMarcado${barbearia}`, async (result) => {
        setHorarios([...result]);
      });
    }
  }, [marcarAlmocoState]);

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

  const pegarHorarios = async (barbearia) => {
    try {
      const response = await http.get(`horario/pegarHorarios/${barbearia}`);
      if (!response) throw "Erro ao buscar horarios";
      ordenarHorarios(response.data);
    } catch (erro) {}
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
    const horariosDisponiveis = horariosFiltradoPelaHora.filter(horarioFiltradoPelaHora => {
      const horarioEncontrado = horariosMarcado.find(hM => (hM.HORARIO_ID === horarioFiltradoPelaHora.ID && data === hM.DATA));
      if (!horarioEncontrado) {
        return horarioFiltradoPelaHora;
      }
    })
    return horariosDisponiveis;
  };

  const handleCloseExcluirHorario = () => {
    setExcluirHorario(false);
    setHorarioSelecionado(null);
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
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
