import { createContext, useState } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";

export const PagamentoContext = createContext();

export const PagamentoProvider = ({ children }) => {
  const [cardEncrypted, setCardEncrypted] = useState(null);
  const [msgError, setMsgError] = useState(null);
  const [pagamentoLoad, setPagamentoLoad] = useState(false);
  const navigate = useNavigate();

  const pagamento = async (data, barbearia) => {
    try {
      setPagamentoLoad(true);
      const NUMERO_CARTAO = data.NUMERO_CARTAO.replace(/\s/g, "");
      const dataExpira = data.EXPIRA.split("/");
      // criptografando dados do cartão
      const card = window.PagSeguro.encryptCard({
        publicKey: process.env.REACT_APP_PK_PAGBANK,
        holder: data.NOME,
        number: NUMERO_CARTAO,
        expMonth: dataExpira[0],
        expYear: `20${dataExpira[1]}`,
        securityCode: data.CVC,
      });

      const dadosUsuario = {
        NOME: data.NOME,
        CELULAR: data.CELULAR,
        CPF: data.CPF,
        CVC: data.CVC,
      };

      if (card.hasErrors)
        throw "Verifique os dados do seu cartão e tente novamente";

      const result = await http.post(
        "pagamento/assinarPlano",
        { card, dadosUsuario },
        { withCredentials: true }
      );
      if (!result) throw "Erro ao tentar fazer pagamento";
      navigate(`/${barbearia}`);
      setPagamentoLoad(false);
    } catch (error) {
      setMsgError(error);
      setPagamentoLoad(false);
    }
  };

  return (
    <PagamentoContext.Provider value={{ pagamento, msgError, setMsgError, pagamentoLoad, setPagamentoLoad }}>
      {children}
    </PagamentoContext.Provider>
  );
};
