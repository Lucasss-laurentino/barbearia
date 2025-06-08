import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { BarbeariaContext } from "./BarbeariaContext";
import { UserContext } from "./UserContext";

export const CadastroEloginContext = createContext();

export const CadastroEloginProvider = ({ children }) => {
  const [loadLogin, setLoadLogin] = useState(false);
  const [erroLoginInvalido, setErroLoginInvalido] = useState(null);

  const { setBarbearia } = useContext(BarbeariaContext);
  const { formatarUsuario } = useContext(UserContext);

  const confirmarEmail = async (dados) => {
    try {
      setLoadLogin(true);
      await http.post("auth/usuarioTemporario", dados);
    } catch (error) {
      setErroLoginInvalido(error.response.data.detail);
      throw error;
    } finally {
      setLoadLogin(false);
    }
  };

  const confirmarCodigoEcriaUsuario = async (dados) => {
    try {
      setLoadLogin(true);
      const result = await http.post("auth/cadastro", dados);
      var barbearia = result.data.barbearia;
      formatarUsuario(result);
      setBarbearia(barbearia);
      return barbearia;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadLogin(false);
    }
  };

  const login = async (dados) => {
    try {
      setLoadLogin(true);
      const resposta = await http.post("/auth/login", dados);
      var barbearia = resposta.data.barbearia;
      setBarbearia(barbearia);
      setLoadLogin(false);
      return barbearia;
    } catch (error) {
      setErroLoginInvalido(error.response.data.detail);
      setLoadLogin(false);
    }
  };

  const solicitarTrocarSenha = async (dados) => {
    try {
      setLoadLogin(true);
      const result = await http.post("/auth/solicitarTrocarSenha", dados);
      console.log(result);
      setLoadLogin(false);
    } catch (error) {
      setLoadLogin(false);
    }
  };

  const confirmarCodigoTrocarSenha = async (dados) => {
    try {
      setLoadLogin(true);
      const result = await http.post("/auth/VerificaCodigoTrocarSenha", dados);
      if (!result) throw false;
      setLoadLogin(false);
    } catch (error) {
      setErroLoginInvalido(error.response.data.detail);
      setLoadLogin(false);
      throw error;
    }
  };

  const trocarSenha = async (dados) => {
    try {
      setLoadLogin(true);
      const novaSenha = { NovaSenha: dados.NovaSenha };
      await http.post("/auth/trocarSenha", novaSenha);
      setLoadLogin(false);
    } catch (error) {
      setLoadLogin(false);
    }
  };

  return (
    <CadastroEloginContext.Provider
      value={{
        confirmarEmail,
        setLoadLogin,
        loadLogin,
        confirmarCodigoEcriaUsuario,
        login,
        solicitarTrocarSenha,
        confirmarCodigoTrocarSenha,
        trocarSenha,
        erroLoginInvalido,
        setErroLoginInvalido,
      }}
    >
      {children}
    </CadastroEloginContext.Provider>
  );
};
