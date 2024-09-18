import { createContext, useState } from "react";

export const BarbeiroContext = createContext();

export const BarbeiroProvider = ({ children }) => {
  const [barbeiros, setBarbeiros] = useState([
    {
      ID: 1,
      NOME: "LC",
      IMG: "barbeiros/barbeiro1.jpg",
    },
    {
      ID: 2,
      NOME: "Jota",
      IMG: "barbeiros/barbeiro2.jpg",
    },
  ]);

  return (
      <BarbeiroContext.Provider value={{
          barbeiros,
          setBarbeiros
    }}>{children}</BarbeiroContext.Provider>
  );
};
