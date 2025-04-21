import { createContext, useContext, useState } from "react";

export const BarbeariaContext = createContext();

export const BarbeariaProvider = ({ children }) => {

    const [barbearia, setBarbearia] = useState();

    return (
        <BarbeariaContext.Provider value={{barbearia, setBarbearia}}>
            {children}
        </BarbeariaContext.Provider>
    )
}