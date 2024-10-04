import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const [loadLogin, setLoadLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const criarUsuario = async (user) => {
    try {
      setLoadLogin(true)
      const response = await http.post(
        "login/criarUsuario",
        { user },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setLoadLogin(false);
      navigate(`/${response.data.user.NOME_BARBEARIA}`);
    } catch (error) {
      console.log(error);
      setLoadLogin(false);
    }
  };

  const login = async (user) => {
    try {
      setLoadLogin(true)
      await http
        .post("/login/login", { user }, { withCredentials: true })
        .then((response) => {
          setUser(response.data.user);
          setLoadLogin(false);
          navigate("/index");
        });
    } catch (error) {
      setLoadLogin(false);
      const erro = error.response?.data
      setLoginError("Algo deu errado ao fazer login, verifique seus dados e tente novamente !");
    }
  };

  return (
    <LoginContext.Provider
      value={{
        criarUsuario,
        login,
        loadLogin,
        setLoadLogin,
        loginError
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
