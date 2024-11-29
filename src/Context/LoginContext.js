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
  const [cadastroError, setCadastroError] = useState(null);
  const [confirmarCodigo, setConfirmarCodigo] = useState(false);

  const criarUsuario = async (user) => {
    try {
      setLoadLogin(true);
      const response = await http.post(
        "login/criarUsuario",
        { user },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setLoadLogin(false);
      navigate(`/${response.data.user.NOME_BARBEARIA}`);
    } catch (error) {
      setCadastroError(error?.response.data.message);
      setLoadLogin(false);
    }
  };

  const confirmarEmail = async (user) => {
    try {
      setLoadLogin(true);
      const result = await http.post("login/confirmarEmail", { user });
      if (result) {
        setConfirmarCodigo(true);
      }
    } catch (error) {
      setCadastroError(error?.response?.data?.message);
      setLoadLogin(false);
    }
  };

  const login = async (user) => {
    try {
      setLoadLogin(true);
      await http
        .post("/login/login", { user }, { withCredentials: true })
        .then((response) => {
          setUser(response.data.user);
          setLoadLogin(false);
          navigate(`/${response.data.user.NOME_BARBEARIA}`);
        });
    } catch (error) {
      setLoginError(error?.response.data.message);
      setLoadLogin(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        criarUsuario,
        login,
        loadLogin,
        setLoadLogin,
        loginError,
        setLoginError,
        cadastroError,
        setCadastroError,
        confirmarEmail,
        confirmarCodigo,
        setConfirmarCodigo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
