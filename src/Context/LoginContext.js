import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AbaBottomContext } from "./AbaBottomContext";
import Cookies from "js-cookie";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();

  const { setActive } = useContext(AbaBottomContext);

  const { setUser } = useContext(UserContext);
  const [loadLogin, setLoadLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [cadastroError, setCadastroError] = useState(null);
  const [confirmarCodigo, setConfirmarCodigo] = useState(false);
  const [userCadastro, setUserCadastro] = useState({});
  const [controlaLoginECadastro, setControlerLoginECadastro] = useState(true);
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const [barbearia, setBarbearia] = useState(null);

  // PRECISO MUDAR O NOME DAS FUNÇÕES PRA RECUPERAÇÃO DE SENHA
  // NOMES ESTÃO TROCADOS

  const criarUsuario = async (codigo, barbearia = null) => {
    setLoadLogin(true);
    try {
      const response = await http.post(
        "login/criarUsuario",
        { user: userCadastro, codigo },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setLoadLogin(false);
      setCadastroError(null);
      setEsqueceuSenha(false);
      setControlerLoginECadastro(true);
      if(!barbearia){
        barbearia = response.data.user.NOME_BARBEARIA 
      }
      setActive(2)
      navigate(`/${barbearia}`);
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
        setUserCadastro(user);
        setConfirmarCodigo(true);
        setLoadLogin(false);
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

  // manda req pra enviar email pra confirmar a recuperação de senha
  const recuperarSenha = async (data) => {
    try {
      setLoadLogin(true);
      const result = await http.post("/login/recuperarSenha", {
        EMAIL: data.EMAIL_RECUPERAR_SENHA,
      });
      if (!result) throw false;
      setEsqueceuSenha(false);
      setControlerLoginECadastro(false);
      setConfirmarCodigo(true);
      setLoadLogin(false);
      localStorage.setItem("email_recuperar", data.EMAIL_RECUPERAR_SENHA);
    } catch (error) {
      console.log(error);
      setLoadLogin(false);

      localStorage.setItem("email_recuperar", "");
    }
  };

  // envia req pra mudar senha
  const mudarSenha = async (data) => {
    try {
      setLoadLogin(true);
      const result = await http.post("/login/mudarSenha", {
        EMAIL: localStorage.getItem("email_recuperar"),
        CODIGO: data.CODIGO,
        BARBEARIA: barbearia,
      });
      if (!result) throw false;
      // setUser(result.data.objReturn.USER);
      setLoadLogin(false);
      // Armazenando o token no cookie
      const token = result.data.objReturn.token;
      const barbeariaReturn = result.data.objReturn.NOME_BARBEARIA;
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 10);
      document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
      navigate(`/${barbeariaReturn}`);
      setActive(5);
    } catch (error) {
      console.log(error);
      setLoadLogin(false);
      localStorage.setItem("email_recuperar", "");
    }
  };

  const cancelarMudarSenha = async () => {
    Cookies.remove("token");
    setActive(2);
    setControlerLoginECadastro(true);
    setEsqueceuSenha(false);
  };

  const changeSenha = async (data) => {
    try {
      const email = localStorage.getItem("email_recuperar");
      if (email) {
        const result = await http.post("login/changeSenha", { data, email });
        if (!result.erro) {
          localStorage.setItem("email_recuperar", "");
          Cookies.remove("token");
          setActive(4);
          setControlerLoginECadastro(true);
          setEsqueceuSenha(false);
        }
      }
    } catch (error) {
      console.log(error);
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
        userCadastro,
        setUserCadastro,
        recuperarSenha,
        controlaLoginECadastro,
        setControlerLoginECadastro,
        esqueceuSenha,
        setEsqueceuSenha,
        mudarSenha,
        barbearia,
        setBarbearia,
        cancelarMudarSenha,
        changeSenha,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
