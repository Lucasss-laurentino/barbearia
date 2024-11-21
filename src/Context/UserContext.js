import { createContext, useState } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    ID: "",
    NOME_BARBEARIA: "",
    BARBEIRO: false,
  });

  // esse objeto controla oque o usuário vai setando durante a navegação pelo sistema
  const [userContrata, setUserContrata] = useState({ user: null });
  const navigate = useNavigate();

  const pegarUsuario = async () => {
    try {
      const response = await http.get(`/user/getUser`, {
        withCredentials: true,
      });
      if (!response.data || !response.data.ID)
        throw new Error("Usuário não encontrado");
      setUser({
        ID: response.data.ID,
        NOME_BARBEARIA: response.data.NOME_BARBEARIA,
        ADM: response.data.ADM,
        BARBEIRO: response.data.BARBEIRO,
      });

      setUserContrata((prevState) => ({
        ...prevState,
        user: response.data,
      }));
    } catch (error) {
      setUser({});
      setUserContrata({});
    }
  };

  const buscarBarbearia = async (barbearia) => {
    try {
      const response = await http.get(`user/buscarBarbearia/${barbearia}`);
    } catch (error) {
      navigate("/naoEncontrado");
    }
  };

  const pegarDadosPraEditar = async () => {
    try {
      const response = await http.get("user/pegarDadosPraEditar", {withCredentials: true});
      return response.data;
    } catch (error) {
      
    }
  };

  const logout = async () => {
    if (user) {
      try {
        const response = await http.post(
          "user/logout",
          { user },
          { withCredentials: true }
        );
        !response.data.erro && setUser({});
      } catch (error) {}
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        pegarUsuario,
        userContrata,
        setUserContrata,
        buscarBarbearia,
        logout,
        pegarDadosPraEditar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
