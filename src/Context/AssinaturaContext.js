import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const AssinaturaContext = createContext();

export const AssinaturaProvider = ({ children }) => {
  const [assinatura, setAssinatura] = useState();
  const [parcelas, setParcelas] = useState([]);
  const [erroAssinatura, setErroAssinatura] = useState(null);
  const [assinaturaLoader, setAssinaturaLoader] = useState(false);

  const navigate = useNavigate();

  const { logout } = useContext(LoginContext);
  const { user } = useContext(UserContext);

  const getAssinatura = async () => {
    try {
      const result = await http.get("/assinatura/getAssinatura", {
        withCredentials: true,
      });
      if (!result) throw "Erro ao buscar assinatura";
      setAssinatura(result.data.assinatura);
    } catch (error) {
      console.log(error);
    }
  };

  const getParcelas = async () => {
    try {
      const result = await http.get("/assinatura/getParcelas", {
        withCredentials: true,
      });
      if (!result) throw "Erro ao buscar assinatura";
      setParcelas([...result.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const desativarAssinatura = async () => {
    try {
      setAssinaturaLoader(true);
      const result = await http.get("/assinatura/desativar", {
        withCredentials: true,
      });
      if (!result) throw "Erro ao buscar assinatua";
      await logout();
      setAssinaturaLoader(false);
      navigate("/");
    } catch (error) {
      setAssinaturaLoader(false);
      setErroAssinatura(
        "Erro ao cancelar assinatura, tente novamente mais tarde ou entre em contato com o suporte !"
      );
    }
  };

  const ativarAssinatura = async (barbearia) => {
    try {
      setAssinaturaLoader(true);
      const result = await http.get("assinatura/ativar", {withCredentials: true});
      if(!result) throw "Erro ao ativar assinatura";
      setAssinaturaLoader(false);
      navigate(`/${barbearia}`);
    } catch(error) {
      console.log(error);
      setAssinaturaLoader(false);
    }
  }

  const editarAssinatura = async (plano) => {
    try {
      const result = await http.post("assinatura/editar", {plano}, {withCredentials: true});
      if(!result) throw "Erro ao editar assinatura";
    } catch(error) {
      console.log(error);
    }
  }

  // alem de verificar se a assinatura está ativa, verifica o vencimento da fatura
  const verificarAssinatura = async (barbearia) => {
    try {
      const result = await http.post("/assinatura/verificarAssinatura", {
        barbearia,
      });
      if (!result) throw "Erro ao buscar assinatura";
    } catch (error) {
      if (user?.ADM) {
        if(error?.response?.data === 2) {
          navigate(`/${barbearia}/assinaturadesativada`);
        } else {
          navigate(`/${barbearia}/assinaturabloqueada`);
        }
      } else {
        navigate(`/${barbearia}/notfound`);
      }
    }
  };

  const alterarMeioDePagamento = async (data) => {

  }

  return (
    <AssinaturaContext.Provider
      value={{
        getAssinatura,
        assinatura,
        getParcelas,
        parcelas,
        desativarAssinatura,
        erroAssinatura,
        setErroAssinatura,
        verificarAssinatura,
        ativarAssinatura,
        alterarMeioDePagamento,
        assinaturaLoader,
        editarAssinatura,
      }}
    >
      {children}
    </AssinaturaContext.Provider>
  
);
};
