import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

  const [user, setUser] = useState({
    ID: "",    
    NOME: "",
    BARBEIRO: false,
  });

  const pegarUsuario = () => {
    
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      pegarUsuario
      }}>
      {children}
    </UserContext.Provider>
  )
}