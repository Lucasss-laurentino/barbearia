import { createContext, useEffect, useState } from "react";
import { http } from "../http";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const [horarios, setHorarios] = useState([]);

  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });

  const [loadHorarios, setLoadHorarios] = useState(false);

  const ordenarHorarios = (horario, horarios_) => {
    if (horario) {
      const horariosCopia = [...horarios, horario];
      const sortedAppointments = horariosCopia.sort((a, b) => {
        if (a.HORA < b.HORA) return -1; // a vem antes de b
        if (a.HORA > b.HORA) return 1; // b vem antes de a
        return 0; // são iguais
      });
      setHorarios([...sortedAppointments]);
    }
    if(horarios_.length > 0){
      const horariosCopia = [...horarios_];
      const sortedAppointments = horariosCopia.sort((a, b) => {
        if (a.HORA < b.HORA) return -1; // a vem antes de b
        if (a.HORA > b.HORA) return 1; // b vem antes de a
        return 0; // são iguais
      });
      setHorarios([...sortedAppointments]);
    }
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
      ordenarHorarios(response.data);
      setLoadHorarios(false);
      setValue("HORA", "");
      setShow(false);
    } catch (erro) {}
  };

  const pegarHorarios = async () => {
    try {
      const response = await http.get("horario/pegarHorarios", {
        withCredentials: true,
      });
      if (!response) throw "Erro ao buscar horarios";
      ordenarHorarios(undefined, response.data)
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
      ordenarHorarios(undefined, response.data)
      setLoadHorarios(false);
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
      ordenarHorarios(undefined, response.data);
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
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
