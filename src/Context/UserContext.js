import { createContext, useState } from "react";
import { http } from "../http";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({
    ID: "",
    NOME_BARBEARIA: "",
    BARBEIRO: false,
  });
  const [usuarioEditado, setUsuarioEditado] = useState(false);
  // esse objeto controla oque o usuário vai setando durante a navegação pelo sistema
  const [userContrata, setUserContrata] = useState({ user: null });
  
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
  
  const editarUsuario = async (data) => {
    setLoad(true)
    try {
      const result = await http.post(
        "user/editarUsuario",
        { data },
        { withCredentials: true }
      );
      setLoad(false)
      if (!result) throw "Erro ao editar perfil";
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
        load,
        setLoad,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
