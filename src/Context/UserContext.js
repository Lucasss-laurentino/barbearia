import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();

  const formatarUsuario = (obj) => {
    const { id, nome, email, adm, celular} = obj.data;
    setUsuario({ id, nome, email, adm, celular});
  }

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        formatarUsuario
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
