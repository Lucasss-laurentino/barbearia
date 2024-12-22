import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";
import { AbaBottomContext } from "./AbaBottomContext";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    ID: "",
    NOME_BARBEARIA: "",
    BARBEIRO: false,
  });
  const [usuarioEditado, setUsuarioEditado] = useState(false);
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
        NOME: response.data.NOME,
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

  // const pegarDadosPraEditar = async () => {
  //   try {
  //     const response = await http.get("user/pegarDadosPraEditar", {
  //       withCredentials: true,
  //     });
  //     return response.data;
  //   } catch (error) {}
  // };

  const editarUsuario = async (data) => {
    try {
      const result = await http.post(
        "user/editarUsuario",
        { data },
        { withCredentials: true }
      );
      setUser(result.data.user);
      setUsuarioEditado(true);
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        pegarUsuario,
        userContrata,
        setUserContrata,
        editarUsuario,
        usuarioEditado,
        setUsuarioEditado,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
