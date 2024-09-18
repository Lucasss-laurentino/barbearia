import { createContext, useState } from "react";

export const MeuHorarioContext = createContext();

export const MeuHorarioProvider = ({ children }) => {
  const [meuHorario, setMeuHorario] = useState();

  return (
      <MeuHorarioContext.Provider value={{
          meuHorario,
          setMeuHorario
    }}>
      {children}
    </MeuHorarioContext.Provider>
  );
};
