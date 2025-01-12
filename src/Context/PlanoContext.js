import { createContext, useState } from "react";
import { http } from "../http";

export const PlanoContext = createContext();

export const PlanoProvider = ({ children }) => {
    
    const [planos, setPlanos] = useState([]);

    const [meuPlano, setMeuPlano] = useState(null);

    const getPlanos = async () => {
        try {
            const result = await http.get("/planos/getPlanos");
            if (!result) throw "Erro ao buscar planos";
            setPlanos(result.data.planos);
        } catch (error) {
            console.log(error);
        }
    }

    const getMeuPlano = async (user) => {
        try {
            const result = await http.post("/planos/getMeuPlano", user, { withCredentials: true });
            if (result.data?.erro) throw result?.error;
            console.log(result.data)
            setMeuPlano(result.data.plano)
        } catch (error) {
            console.log(error);            
        }
    }

    return (
      <PlanoContext.Provider value={{ planos, getPlanos, getMeuPlano, meuPlano}}>
        {children}
      </PlanoContext.Provider>
    );
}