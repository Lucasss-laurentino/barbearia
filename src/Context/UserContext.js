import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregado, setCarregado] = useState(false);

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        carregado,
        setCarregado,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
