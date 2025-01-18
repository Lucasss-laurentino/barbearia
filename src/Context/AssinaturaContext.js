import { createContext, useState } from "react";
import { http } from "../http";

export const AssinaturaContext = createContext();

export const AssinaturaProvider = ({children}) => {

  const [assinatura, setAssinatura] = useState();
  const [parcelas, setParcelas] = useState([]);

  const getAssinatura = async () => {
    try {
      const result = await http.get("/assinatura/getAssinatura", {withCredentials: true});
      if(!result) throw "Erro ao buscar assinatura";
      setAssinatura(result.data.assinatura);
    } catch(error) {
      console.log(error)
    }
  }

  const getParcelas = async () => {
    try {
      const result = await http.get("/assinatura/getParcelas", {withCredentials: true});
      if(!result) throw "Erro ao buscar assinatura";
      setParcelas([result.data]);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <AssinaturaContext.Provider value={{getAssinatura, assinatura, getParcelas, parcelas}}>
      {children}
    </AssinaturaContext.Provider>
  )
}