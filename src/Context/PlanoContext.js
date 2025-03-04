import { createContext, useCallback, useState } from "react";
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
            setMeuPlano(result.data.plano)
        } catch (error) {
            console.log(error);            
        }
    }

    const verificaPlano = async (userCadastro, plano_id) => {
        if(plano_id !== null) {
            const plano = planos.find((plano) => plano.ID === parseInt(plano_id));

            if(Object.keys(plano).length < 1) {
              userCadastro.ADM = false;
            } else {
              userCadastro.ADM = true;
            };     
        } else {
            userCadastro.ADM = false;
        }

        return userCadastro;
    }

    return (
      <PlanoContext.Provider value={{ planos, getPlanos, getMeuPlano, meuPlano, setPlanos, verificaPlano}}>
        {children}
      </PlanoContext.Provider>
    );
}