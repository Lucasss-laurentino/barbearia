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
  const [loadAssinatura, setLoadAssinatura] = useState(false);

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
      const parcelasReturn = result.data;
      const parcelasFormatada = await parcelasReturn.map((parcela) => {
        return {
          pago: 'APPROVED',
          valor: (parcela.valor / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          vencimento: parcela.vencimento,
        };
      })
      setParcelas([...parcelasFormatada]);
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
      }, {withCredentials: true});
      if (!result) throw "Erro ao buscar assinatura";
      const { planoResponse } = result.data;
      const userReturn = result.data.userOBJ;
      switch(planoResponse) {
        case 0: 
            navigate(`/${barbearia}`);
            break;
        case 2: 
            // Se planoResponse for 2, você pode adicionar a lógica aqui
            console.log("Plano 2: Ação específica");
            break;
    
        case 3: 
            // Se planoResponse for 3, você pode adicionar a lógica aqui
            console.log("Plano 3: Ação específica");
            break;
    
        case 4: 
            // Se planoResponse for 4, você pode adicionar a lógica aqui
            console.log("Plano 4: Ação específica");
            break;
    
        case 5: 
            // Se planoResponse for 5, você pode adicionar a lógica aqui
            console.log("Plano 5: Ação específica");
            break;
    
        case 6:
          // acabou tempo de teste
          if(userReturn?.ADM) {
            navigate(`${barbearia}/assinaturabloqueada`);
          } else {
            navigate(`/notfound`);            
          }
        default:
            // Caso planoResponse não seja nenhum dos valores acima
            console.log("Plano não tratado ou inválido");
            break;
    }

    } catch (error) {
      navigate('/notfound');
      console.log(error);
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
        loadAssinatura,
        setLoadAssinatura
      }}
    >
      {children}
    </AssinaturaContext.Provider>
  
);
};
