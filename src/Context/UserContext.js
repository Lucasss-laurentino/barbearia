import { createContext, useState } from "react";
import { http } from "../http";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    ID: "",
    NOME: "",
    BARBEIRO: false,
  });

  const pegarUsuario = async () => {
    
    try {
      const response = await http.get(`/user/getUser`, { withCredentials: true });
      setUser(response.data)
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
