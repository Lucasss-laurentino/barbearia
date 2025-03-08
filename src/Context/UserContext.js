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
  const [logo, setLogo] = useState();

  const pegarUsuario = async () => {
    try {
      const response = await http.get(`/user/getUser`, {
        withCredentials: true,
      });
      if (!response.data || !response.data.ID)
        throw new Error("Usuário não encontrado");
      setUser(response.data);
      setUserContrata((prevState) => ({
        ...prevState,
        user: response.data,
      }));
    } catch (error) {
      setUser({});
      setUserContrata({});
    }
  };

  const editarUsuario = async (data, imagem) => {
    setLoad(true);
    const formData = new FormData();
    console.log(user);
    formData.append("NOME", data.NOME === user.NOME ? "" : data.NOME);
    formData.append("SENHA", data.SENHA);
    formData.append("NOME_BARBEARIA", data.NOME_BARBEARIA);
    formData.append("LOGO", imagem);

    try {
      const result = await http.post("user/editarUsuario", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoad(false);
      if (result?.data?.erro) throw new Error(result.data.message);
      setUser(result.data.user);
      setUsuarioEditado(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const pegarLogo = async (barbearia) => {
    try {
      const result = await http.post("user/pegarLogo", { barbearia });
      if (!result) throw result;
      setLogo(result.data);
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
        pegarLogo,
        logo,
        setLogo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
