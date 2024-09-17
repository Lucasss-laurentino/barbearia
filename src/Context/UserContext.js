import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

  const [user, setUser] = useState({
    ID: "",    
    NOME: "",
    BARBEIRO: false,
    ADM: false,
  });

  return (
    <UserContext.Provider value={{
      user,
      setUser
      }}>
      {children}
    </UserContext.Provider>
  )
}