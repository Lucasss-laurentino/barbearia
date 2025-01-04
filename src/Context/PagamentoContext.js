import { createContext } from "react";
import { http } from "../http";

export const PagamentoContext = createContext();

export const PagamentoProvider = ({ children }) => {
    
    const pagamento = async (data) => {
        try {
            const result = await http.post("pagamento/assinarPlano", {data}, {withCredentials: true});
            if(!result) throw "Erro ao tentar fazer pagamento"
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <PagamentoContext.Provider value={{pagamento}}>
            {children}
        </PagamentoContext.Provider>
    )
}
