import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";

export const AssinaturaContext = createContext();

export const AssinaturaProvider = ({ children }) => {
  const [assinatura, setAssinatura] = useState();
  const [parcelas, setParcelas] = useState([]);
  const [erroAssinatura, setErroAssinatura] = useState(null);
  const [assinaturaLoader, setAssinaturaLoader] = useState(false);
  const [loadAssinatura, setLoadAssinatura] = useState(false);

  const navigate = useNavigate();

  const { logout } = useContext(LoginContext);

  const criarAssinaturaPagBank = async (data, barbearia) => {
    try {      
      setAssinaturaLoader(true);      
      const card = await criptografaCartao(data);
      const dadosUsuario = await formatarDadosAssinaturaPagBank(data);
      if (card.hasErrors)
        throw new Error("Verifique os dados do seu cartão e tente novamente");
      const result = await http.post(
        "assinatura/criarAssinaturaPagBank",
        { card, dadosUsuario },
        { withCredentials: true }
      );
      if (!result) throw "Erro ao tentar fazer pagamento";
      navigate(`/${barbearia}`);
      setAssinaturaLoader(false);
    } catch (error) {
      setAssinaturaLoader(false);
    }
  };

  const formatarDadosAssinaturaPagBank = async (data) => {
    const dadosUsuario = {
      NOME: data.NOME,
      CELULAR: data.CELULAR,
      CPF: data.CPF,
      CVC: data.CVC,
    };
    return dadosUsuario;
  }

  const criptografaCartao = async (data) => {
    try {
      const NUMERO_CARTAO = data.NUMERO_CARTAO.replace(/\s/g, "");
      const dataExpira = data.EXPIRA.split("/");
      const card = window.PagSeguro.encryptCard({
        publicKey: process.env.REACT_APP_PK_PAGBANK,
        holder: data.NOME,
        number: NUMERO_CARTAO,
        expMonth: dataExpira[0],
        expYear: `20${dataExpira[1]}`,
        securityCode: data.CVC,
      });
      return card; 
    } catch(error) {
      console.log(error)
    }
  }

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
      // tirar await do map
      const parcelasFormatada = await parcelasReturn.map((parcela) => {
        return {
          pago: "APPROVED",
          valor: (parcela.valor / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          vencimento: parcela.vencimento,
        };
      });
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
      const result = await http.get("assinatura/ativar", {
        withCredentials: true,
      });
      if (!result) throw "Erro ao ativar assinatura";
      setAssinaturaLoader(false);
      navigate(`/${barbearia}`);
    } catch (error) {
      console.log(error);
      setAssinaturaLoader(false);
    }
  };

  const editarAssinatura = async (plano) => {
    try {
      const result = await http.post(
        "assinatura/editar",
        { plano },
        { withCredentials: true }
      );
      if (!result) throw "Erro ao editar assinatura";
    } catch (error) {
      console.log(error);
    }
  };

  const verificarAssinatura = async (barbearia) => {
    try {
      const result = await http.post(
        "/assinatura/verificarAssinatura",
        {
          barbearia,
        },
        { withCredentials: true }
      );
      if (!result) throw "Erro ao buscar assinatura";
      const { assinaturaVerificada } = result.data;
      switch (assinaturaVerificada.codigo) {
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
          if (!assinaturaVerificada.logado || !assinaturaVerificada.adm) {
            navigate(`/notfound`);
          }
          if (assinaturaVerificada.adm) {
            navigate(`${barbearia}/assinaturabloqueada`);
          }
          break;
        default:
          // Caso planoResponse não seja nenhum dos valores acima
          console.log("Plano não tratado ou inválido");
          break;
      }
    } catch (error) {
      navigate("/notfound");
    }
  };

  const alterarMeioDePagamento = async (data) => {};

  return (
    <AssinaturaContext.Provider
      value={{
        criarAssinaturaPagBank,
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
        setLoadAssinatura,
      }}
    >
      {children}
    </AssinaturaContext.Provider>
  );
};
