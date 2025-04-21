import { createContext, useContext, useEffect, useState } from "react";
import { HorarioMarcadoContext } from "./HorarioMarcadoContext";

export const LocalStorageAgendamentoContext = createContext();

export const LocalStorageAgendamentoProvider = ({ children }) => {
  const { horarioMarcado } = useContext(HorarioMarcadoContext);

  const [localStorageAgendamento, setLocalStorageAgendamento] = useState();

  useEffect(() => {
    setLocalStorageAgendamento(JSON.parse(localStorage.getItem("agendamento")));
  }, [horarioMarcado]);

  return (
    <LocalStorageAgendamentoContext.Provider
      value={{ localStorageAgendamento, setLocalStorageAgendamento }}
    >
      {children}
    </LocalStorageAgendamentoContext.Provider>
  );
};
