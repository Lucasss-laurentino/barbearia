import { createContext, useState } from "react";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const [horarios, setHorarios] = useState([
    {
      ID: 1,
      HORA: "08:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },
    {
      ID: 2,
      HORA: "09:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 3,
      HORA: "10:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 4,
      HORA: "11:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 5,
      HORA: "12:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 6,
      HORA: "14:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 7,
      HORA: "15:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 8,
      HORA: "16:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },

    {
      ID: 9,
      HORA: "17:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 1,
    },
    {
      ID: 10,
      HORA: "08:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },
    {
      ID: 12,
      HORA: "09:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 13,
      HORA: "10:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 14,
      HORA: "11:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 15,
      HORA: "12:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 16,
      HORA: "14:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 17,
      HORA: "15:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 18,
      HORA: "16:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },

    {
      ID: 19,
      HORA: "17:00",
      DISPONIVEL: true,
      BARBEIRO_ID: 2,
    },
  ]);

  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });

  const marcarHorario = (horario_id, barbeiro_id) => {
    const horariosNovo = horarios.map((horario) => {
      if (horario.ID === horario_id) {
        horario.DISPONIVEL = !horario.DISPONIVEL
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
        marcarHorario
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
