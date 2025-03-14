import { createContext, useEffect, useState } from "react";
import { http } from "../http";
import { socket } from "../socket";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  // STATES
  const [horarios, setHorarios] = useState([]);
  const [limparHoraAposExclusao, setLimparHoraAposExclusao] = useState(false);
  const [usuarioTemHorarioMarcado, setUsuarioTemHorarioMarcado] = useState(false);
  const [errosHorarios, setErrosHorarios] = useState({
    erro: false,
    menssagem: "",
  });
  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });
  const [loadHorarios, setLoadHorarios] = useState(false);
  const [marcarAlmocoState, setMarcarAlmocoState] = useState({});
  const [agendamento, setAgendamento] = useState({});
  const [showModalMarcarHorarioDeslogado, setShowModalMarcarHorarioDeslogado] = useState(false);
  const [barbearia, setBarbearia] = useState("");

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
      setTimeout(() => {
        setLoadHorarios(false);
      }, 4000);
    }
  };

  const pegarHorarios = async (barbearia) => {
    try {
      const response = await http.get(`horario/pegarHorarios/${barbearia}`);
      if (!response) throw "Erro ao buscar horarios";
      ordenarHorarios(response.data);
    } catch (erro) { }
  };

  const editarHorario = async (data, horario, setShow, setValue) => {
    try {
      setLoadHorarios(true);
      const response = await http.put(
        `horario/editarHorario/${horario.ID}`,
        data,
        {
          withCredentials: true,
        }
      );
      ordenarHorarios(response.data);
      setValue("HORA", "");
      setLoadHorarios(false);
      setShow(false);
    } catch (error) { }
  };

  const excluirHorario = async (horario, handleClose, setLoadExcluir) => {
    try {
      setLoadExcluir(true);
      const response = await http.delete(
        `horario/excluirHorario/${horario.ID}`,
        { withCredentials: true }
      );
      ordenarHorarios(response.data);
      setLimparHoraAposExclusao(true);
      setLoadExcluir(false);
      handleClose();
    } catch (error) { }
  };

  const marcarAlmoco = async (horario, barbeariaParam) => {
    setBarbearia(barbeariaParam);
    setMarcarAlmocoState(horario);
    /*
    try {
      const result = await http.post("/horario/marcarAlmoco", horario, {
        withCredentials: true,
      });
      if (!result) throw "Erro ao marcar horário de almoço";

      setHorarios(result.data);
    } catch (error) {
      console.log(error);
    }
    */

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
        usuarioTemHorarioMarcado,
        setUsuarioTemHorarioMarcado,
        marcarAlmoco,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
