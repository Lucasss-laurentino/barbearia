import { createContext, useEffect, useState } from "react";
import { http } from "../http";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const [horarios, setHorarios] = useState([]);
  const [limparHoraAposExclusao, setLimparHoraAposExclusao] = useState(false);
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

  const marcarHorario = (horario_id, barbeiro_id) => {
    const horariosNovo = horarios.map((horario) => {
      if (horario.ID === horario_id) {
        horario.DISPONIVEL = !horario.DISPONIVEL;
      }
      return horario;
    });

    setHorarios([...horariosNovo]);
  };

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
        marcarHorario,
        criarHorario,
        pegarHorarios,
        loadHorarios,
        setLoadHorarios,
        excluirHorario,
        editarHorario,
        limparHoraAposExclusao,
        setLimparHoraAposExclusao,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
