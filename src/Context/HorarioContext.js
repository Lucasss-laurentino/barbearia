import { createContext, useState } from "react";
import { http } from "../http";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const [horarios, setHorarios] = useState([]);
  const [limparHoraAposExclusao, setLimparHoraAposExclusao] = useState(false);
  const [errosHorarios, setErrosHorarios] = useState({
    erro: false,
    menssagem: ""
  });
  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });

  const [loadHorarios, setLoadHorarios] = useState(false);

  const ordenarHorarios = async (horariosResponse) => {
    const horariosOrdenados = await horariosResponse.sort((a, b) => {
      return a.HORA.localeCompare(b.HORA);
    });
    setHorarios([...horariosOrdenados]);
  }

  const criarHorario = async (data, barbeiro, setShow, setValue) => {
    try {
      setLoadHorarios(true);
      const response = await http.post(
        "horario/criarHorario",
        { horario: data, barbeiro },
        { withCredentials: true }
      );
      if (!response) throw "Erro ao criar horario";
      const horariosResponse = [...horarios, response.data]
      ordenarHorarios(horariosResponse);
      setValue("HORA", "")
      setLoadHorarios(false)
      setShow(false);
    } catch (erro) {}
  };

  const pegarHorarios = async () => {
    try {
      const response = await http.get("horario/pegarHorarios", {
        withCredentials: true,
      });
      if (!response) throw "Erro ao buscar horarios";
      ordenarHorarios(response.data)
    } catch (erro) {}
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
      setValue("HORA", "")
      setLoadHorarios(false)
      setShow(false);
    } catch (error) {}
  };

  const marcarHorario = async (userContrata) => {
    try {
      const response = await http.post('horario/marcarHorario', {userContrata}, {withCredentials: true});
      if(!response) throw "Erro ao marcar horario";
      ordenarHorarios(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const verificaAntesDeMarcar = (horario_id, userContrata) => {
      // verifica se o usuario marcou um serviço antes de agendar um horario
      if(Object.keys(userContrata.servicoEscolhido).length < 1) { 
        setErrosHorarios({
        erro: true,
        menssagem: "Selecione um serviço antes de agendar um horário"
        });
      } else {
        // futuramente será necessario verificar se o usuario ja possui um horario marcado
        marcarHorario(userContrata);
      }
  };

  buscarMeuHorarioMarcado = async () => {
    try {
      const response = await http.get("horario/buscarMeuHorarioMarcado", {withCredentials: true});
      console.log(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const excluirHorario = async (horario, handleClose, setLoadExcluir) => {
    try {
      setLoadExcluir(true);
      const response = await http.delete(
        `horario/excluirHorario/${horario.ID}`,
        { withCredentials: true }
      );
      ordenarHorarios(response.data)
      setLimparHoraAposExclusao(true);
      setLoadExcluir(false);
      handleClose();
    } catch (error) {}
  };

  return (
    <HorarioContext.Provider
      value={{
        horarios,
        setHorarios,
        horariosAberto,
        setHorariosAberto,
        verificaAntesDeMarcar,
        criarHorario,
        pegarHorarios,
        loadHorarios,
        setLoadHorarios,
        excluirHorario,
        editarHorario,
        limparHoraAposExclusao,
        setLimparHoraAposExclusao,
        errosHorarios,
        setErrosHorarios
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
