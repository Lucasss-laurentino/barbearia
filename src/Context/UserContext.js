import { createContext, useEffect, useState } from "react";
import { http } from "../http";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    ID: "",
    NOME: "",
    BARBEIRO: false,
  });

  // esse objeto controla oque o usuário vai setando durante a navegação pelo sistema
  const [userContrata, setUserContrata] = useState({ user: null });

  const pegarUsuario = async () => {
    
    try {
      const response = await http.get(`/user/getUser`, { withCredentials: true });
      if(!response.data || !response.data.ID) throw new Error("Usuário não encontrado");
      setUser({
        ID: response.data.ID,
        NOME: response.data.NOME,
        BARBEIRO: response.data.BARBEIRO
      })

      setUserContrata(prevState => ({
        ...prevState,
        user: response.data
      }));
      
    } catch(error) {
      window.location.href = '/';
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        pegarUsuario,
        userContrata,
        setUserContrata
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
