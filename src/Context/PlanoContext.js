import { createContext, useState } from "react";
import { http } from "../http";

export const PlanoContext = createContext();

export const PlanoProvider = ({ children }) => {
    
    const [planos, setPlanos] = useState([]);

    const getPlanos = async () => {
        try {
            const result = await http.get("/planos/getPlanos");
            if (!result) throw "Erro ao buscar planos";
            setPlanos(result.data.planos);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PlanoContext.Provider value={{planos, getPlanos}}>
            {children}
        </PlanoContext.Provider>
    )
}