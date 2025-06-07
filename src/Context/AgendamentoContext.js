import { createContext, useContext, useEffect, useState } from "react";
import { BarbeariaContext } from "./BarbeariaContext";

export const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const { barbearia } = useContext(BarbeariaContext);

  useEffect(() => {
    if(barbearia && barbearia.agendamentos){
        setAgendamentos(barbearia.agendamentos.$values);
    }
  }, 
  [barbearia?.agendamentos]);

  return (
    <AgendamentoContext.Provider
      value={{ agendamentos, setAgendamentos }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};
