import { createContext, useState } from "react";

export const CalendarioContext = createContext();

export const CalendarioProvider = ({ children }) => {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const handleSelecionarData = (data) => {
    const zerarHora = (d) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dataSemHora = zerarHora(data);
    const hojeSemHora = zerarHora(new Date());

    if (dataSemHora >= hojeSemHora) {
      setDataSelecionada(data);
      setMostrarCalendario(false);
    }
  };

  const formatarData = (data) => {
    return data.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <CalendarioContext.Provider
      value={{
        formatarData,
        handleSelecionarData,
        mostrarCalendario,
        setMostrarCalendario,
        dataSelecionada,
        setDataSelecionada,
      }}
    >
      {children}
    </CalendarioContext.Provider>
  );
};
