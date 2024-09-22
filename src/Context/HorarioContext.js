import { createContext, useEffect, useState } from "react";
import { http } from "../http";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const [horarios, setHorarios] = useState([]);

  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });

  const criarHorario = async (data, barbeiro, setShow) => {
    try {
      const response = await http.post(
        "horario/criarHorario",
        { horario: data, barbeiro },
        { withCredentials: true }
      );
      if (!response) throw "Erro ao criar horario";
      setHorarios([...horarios, response.data]);
      setShow(false);
    } catch (erro) {}
  };

  const pegarHorarios = async () => {
    try {
      const response = await http.get("horario/pegarHorarios", {
        withCredentials: true,
      });
      if (!response) throw "Erro ao buscar horarios";
      setHorarios([...response.data]);
    } catch (erro) {}
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
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
