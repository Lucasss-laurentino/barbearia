import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MenuFooterContext = createContext();

export const MenuFooterProvider = ({children}) => {
 
  const [subRota, setSubRota] = useState("");
  // esse state é usado pra voltar a pagina no form login pra ser direcionado pra pagina que estava antes de ir pra login
  const [rotaAnterior, setRotaAnterior] = useState("");
    const navigate = useNavigate();

    const ativarPagina = (item) => {
      navigate(item.url)
      setSubRota(item.url);
    }

    return (
        <MenuFooterContext.Provider value={{
          subRota,
          setSubRota, 
          ativarPagina,
          rotaAnterior,
          setRotaAnterior
        }}>
            {children}
        </MenuFooterContext.Provider>
    )
}