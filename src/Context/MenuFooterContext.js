import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MenuFooterContext = createContext();

export const MenuFooterProvider = ({children}) => {
 
    const [active, setActive] = useState(0);

    const navigate = useNavigate();

    const ativarPagina = (index, item) => {
      setActive(index);
      navigate(item.url)  
    }

    return (
        <MenuFooterContext.Provider value={{active, setActive, ativarPagina}}>
            {children}
        </MenuFooterContext.Provider>
    )
}