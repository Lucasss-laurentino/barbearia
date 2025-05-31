import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AbaBottomContext } from "./AbaBottomContext";
import Cookies from "js-cookie";
import { ServicoContext } from "./ServicoContext";
import { PlanoContext } from "./PlanoContext";
import { toast, Bounce } from "react-toastify";
import { LoginService } from "../Services/LoginServices";
import { setarLocalStorageComHorarioMarcado } from "../Utils/LoginUtils";

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
  const [userCadastro, setUserCadastro] = useState({});
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const [barbearia, setBarbearia] = useState(null);
  const [barbeariaClean, setBarbeariaClean] = useState("");
  const [recuperaSenha, setRecuperaSenha] = useState(false);
  const [loadEditarSenha, setLoadEditarSenha] = useState(false);
  const [formAtivo, setFormAtivo] = useState(() => {
    if (barbearia) {
      // inicia com o login aberto
      return 1;
    } else {
      // inicia com cadastro aberto
      return 2;
    }
  });

  useEffect(() => {
    if (barbearia) {
      const cleanedString = barbearia
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setBarbeariaClean(cleanedString);
      setFormAtivo(1);
    }
    if (!barbearia) setFormAtivo(2);
  }, [barbearia]);

  const criarUsuario = async (codigo, barbearia = null, plano_id = null) => {
    setLoadLogin(true);
    try {
  
      let dataVencimento;
      if (!barbearia || barbearia === null) {
        dataVencimento = await formatarDataVencimento();
        userCadastro.VENCIMENTO = dataVencimento;
        userCadastro.ADM = true;
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
      setFormAtivo(1);
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

  const confirmarEmail = async (dados) => {
    try {
      setLoadLogin(true);
      const result = await http.post("login/confirmarEmail", { user });
    } catch (error) {
      setCadastroError(error?.response?.data);
      setLoadLogin(false);
    }
  };

  const login = async (user, barbearia) => {
    let dadosRetornado = null;
    setLoadLogin(true);
    try {
      const { erro, resposta } = await LoginService(user, barbearia);
      if (erro) throw new Error(resposta.response.data.message);
      dadosRetornado = resposta.data;
      if (dadosRetornado?.horario_marcado) {
        setarLocalStorageComHorarioMarcado(dadosRetornado?.horario_marcado);
        setServicoEscolhido({
          id: dadosRetornado.horario_marcado.ID,
          contratado: true,
        });
      }
      if (barbearia) navigate(`/${barbearia}`); // login pela pagina da barbearia
      if (!barbearia) navigate(`/${dadosRetornado.user.NOME_BARBEARIA}`); // login pela pagina de introdução ao sistema
    } catch (error) {
      setLoginError(error?.message);
      setLoadLogin(false);
    } finally {
      setUser(dadosRetornado?.user);
      setLoadLogin(false);
    }
  };

  const enviarEmailDeRecuperacao = async (data) => {
    try {
      setLoadLogin(true);
      const result = await http.post("/login/enviarEmailDeRecuperacao", {
        USER: { EMAIL: data.EMAIL_RECUPERAR_SENHA },
      });
      if (!result) throw false;
      setFormAtivo(4);
      setLoadLogin(false);
      setRecuperaSenha(true); // ativa condicional no submit do formulário pra verificar o codigo
    } catch (error) {
      setLoadLogin(false);
    }
  };

  const validarCodigoMudarSenha = async (data, barbeariaParametro) => {
    try {
      setLoadLogin(true);
      const result = await http.post(
        "/login/validarCodigoMudarSenha",
        { CODIGO: data.CODIGO },
        { withCredentials: true }
      );
      if (!result) throw false;
      setLoadLogin(false);
      // serve apenas pra redirecionar o usuario apos a mudança de senha ja que a rota de mudança de senha nao faz parte da rota que leva o parametro da barbearia
      localStorage.setItem("barbeariaAlterarSenha", barbeariaParametro);
      navigate(`/alterarSenha`);
    } catch (error) {
      console.log(error);
      setLoadLogin(false);
    }
  };

  const cancelarMudarSenha = async () => {
    Cookies.remove("token");
    setActive(2);
    setEsqueceuSenha(false);
  };

  const mudarSenha = async (data) => {
    try {
      setLoadEditarSenha(true);
      const result = await http.post(
        "login/mudarSenha",
        { data },
        { withCredentials: true }
      );
      if (result.data.erro) throw new Error(result.message);
      setEsqueceuSenha(false);
      toast.success(
        "Senha alterada, você será redirecionado pra pagina de login!",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
      const barbeariaLoginPath = localStorage.getItem("barbeariaAlterarSenha");
      localStorage.setItem("barbeariaAlterarSenha", "");
      setFormAtivo(1);
      setLoginError(null);
      setInterval(() => {
        navigate(`/${barbeariaLoginPath}/login`);
      }, 5000);
    } catch (error) {
      console.log(error);
      setLoadEditarSenha(false);
    }
  };

  const logout = async (barbeariaParametro) => {
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
        setEsqueceuSenha(false);
        navigate(`${barbeariaParametro}/servicos`);
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
        userCadastro,
        setUserCadastro,
        enviarEmailDeRecuperacao,
        esqueceuSenha,
        setEsqueceuSenha,
        validarCodigoMudarSenha,
        barbearia,
        setBarbearia,
        cancelarMudarSenha,
        mudarSenha,
        barbeariaClean,
        setBarbeariaClean,
        formAtivo,
        setFormAtivo,
        recuperaSenha,
        setRecuperaSenha,
        loadEditarSenha,
        setLoadEditarSenha,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
