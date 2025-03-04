import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AbaBottomContext } from "./AbaBottomContext";
import Cookies from "js-cookie";
import { ServicoContext } from "./ServicoContext";
import { PlanoContext } from "./PlanoContext";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();

  const { setActive } = useContext(AbaBottomContext);
  const { setServicoEscolhido } = useContext(ServicoContext);
  const { verificaPlano } = useContext(PlanoContext);
  const { setUser, user } = useContext(UserContext);
  const [loadLogin, setLoadLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [cadastroError, setCadastroError] = useState(null);
  const [confirmarCodigo, setConfirmarCodigo] = useState(false);
  const [userCadastro, setUserCadastro] = useState({});
  const [controlaLoginECadastro, setControlaLoginECadastro] = useState(true);
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const [barbearia, setBarbearia] = useState(null);
  const [barbeariaClean, setBarbeariaClean] = useState("");

  useEffect(() => {
    if (barbearia) {
      const cleanedString = barbearia
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setBarbeariaClean(cleanedString);
    }
  }, [barbearia]);

  const criarUsuario = async (codigo, barbearia = null, plano_id = null) => {
    try {

      setLoadLogin(true);

      let dataVencimento;
      if (!barbearia || barbearia === null) {
        dataVencimento = await formatarDataVencimento();
        userCadastro.VENCIMENTO = dataVencimento;
      } else {
        userCadastro.VENCIMENTO = null;
      }

      const response = await http.post(
        "login/criarUsuario",
        { user: userCadastro, codigo, plano_id },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setLoadLogin(false);
      setCadastroError(null);
      setEsqueceuSenha(false);
      setControlaLoginECadastro(true);
      if (!barbearia) {
        barbearia = response.data.user.NOME_BARBEARIA;
      }
      setActive(2);
      navigate(`/${barbearia}`);
    } catch (error) {
      setCadastroError(error?.response.data.message);
      setLoadLogin(false);
    }
  };

  const confirmarEmail = async (user, plano_id = null, barbearia = null) => {
    try {
      setLoadLogin(true);
      if(barbearia && barbearia !== null){
        user.NOME_BARBEARIA = barbearia;
      }
      user = await verificaPlano(user, plano_id);

      const result = await http.post("login/confirmarEmail", { user });
      if (result) {
        user.PLANO_ID = plano_id;
        setUserCadastro(user);
        setConfirmarCodigo(true);
        setLoadLogin(false);
        setCadastroError(null);
      }
    } catch (error) {
      setCadastroError(error?.response?.data);
      setLoadLogin(false);
    }
  };

  const login = async (user, barbearia) => {
    try {
      setLoadLogin(true);
      await http
        .post("/login/login", { user }, { withCredentials: true })
        .then((response) => {
          setUser(response.data.user);
          setLoadLogin(false);
          setActive(2);
          if (response.data.horario_marcado) {
            localStorage.setItem(
              "agendamento",
              JSON.stringify(response.data.horario_marcado)
            );
            setServicoEscolhido({
              id: response.data.horario_marcado.ID,
              contratado: true,
            });
          } else {
            localStorage.setItem("agendamento", "{}");
          }
          if (barbearia) navigate(`/${barbearia}`);
          if (!barbearia) navigate(`/${response.data.user.NOME_BARBEARIA}`);
        });
    } catch (error) {
      setLoginError(error?.response.data.message);
      setLoadLogin(false);
    }
  };

  const enviarEmailDeRecuperacao = async (data) => {
    try {
      setLoadLogin(true);
      const result = await http.post("/login/enviarEmailDeRecuperacao", {
        USER: {EMAIL: data.EMAIL_RECUPERAR_SENHA},
      });
      if (!result) throw false;
      setEsqueceuSenha(false);
      setControlaLoginECadastro(false);
      setConfirmarCodigo(true);
      setLoadLogin(false);
      localStorage.setItem("email_recuperar", data.EMAIL_RECUPERAR_SENHA);
    } catch (error) {
      console.log(error);
      setLoadLogin(false);

      localStorage.setItem("email_recuperar", "{}");
    }
  };

  const validarCodigoMudarSenha = async (data) => {
    try {
      setLoadLogin(true);
      const result = await http.post("/login/validarCodigoMudarSenha", {
        EMAIL: localStorage.getItem("email_recuperar"),
        CODIGO: data.CODIGO,
      });
      if (!result) throw false;
      setLoadLogin(false);

      const token = result.data.TOKEN;
      const barbeariaReturn = result.data.NOME_BARBEARIA;
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 10);
      document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
      navigate(`/${barbeariaReturn}`);
      setActive(5);
    } catch (error) {
      console.log(error);
      setLoadLogin(false);
      localStorage.setItem("email_recuperar", "{}");
    }
  };

  const cancelarMudarSenha = async () => {
    Cookies.remove("token");
    setActive(2);
    setControlaLoginECadastro(true);
    setEsqueceuSenha(false);
  };

  const mudarSenha = async (data) => {
    try {
      const email = localStorage.getItem("email_recuperar");
      if (email) {
        const result = await http.post("login/mudarSenha", { data, email });
        if (!result.data.erro) {
          localStorage.setItem("email_recuperar", "{}");
          Cookies.remove("token");
          setActive(4);
          setControlaLoginECadastro(true);
          setEsqueceuSenha(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    if (user) {
      try {
        const response = await http.post(
          "login/logout",
          { user },
          { withCredentials: true }
        );
        !response.data.erro && setUser({});
        Cookies.remove("connect.sid");
        setServicoEscolhido("");
        localStorage.setItem("agendamento", "{}");
        setControlaLoginECadastro(true);
        setEsqueceuSenha(false);
        setConfirmarCodigo(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatarDataVencimento = async () => {
    const hoje = new Date(); // Pega a data atual
    const vencimento = new Date(hoje); // Cria uma nova data com a data atual

    // Soma 15 dias à data de hoje
    vencimento.setDate(hoje.getDate() + 15);

    // Formata a data de vencimento para o formato yyyy-mm-dd hh:mm:ss
    const anoVencimento = vencimento.getFullYear();
    const mesVencimento = String(vencimento.getMonth() + 1).padStart(2, "0"); // Mês começa em 0, então somamos 1
    const diaVencimento = String(vencimento.getDate()).padStart(2, "0");
    const horas = String(vencimento.getHours()).padStart(2, "0"); // Horas com 2 dígitos
    const minutos = String(vencimento.getMinutes()).padStart(2, "0"); // Minutos com 2 dígitos
    const segundos = String(vencimento.getSeconds()).padStart(2, "0"); // Segundos com 2 dígitos

    const dataVencimento = `${anoVencimento}-${mesVencimento}-${diaVencimento} ${horas}:${minutos}:${segundos}`;

    return dataVencimento;
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
        logout,
        setCadastroError,
        confirmarEmail,
        confirmarCodigo,
        setConfirmarCodigo,
        userCadastro,
        setUserCadastro,
        enviarEmailDeRecuperacao,
        controlaLoginECadastro,
        setControlaLoginECadastro,
        esqueceuSenha,
        setEsqueceuSenha,
        validarCodigoMudarSenha,
        barbearia,
        setBarbearia,
        cancelarMudarSenha,
        mudarSenha,
        barbeariaClean,
        setBarbeariaClean,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
