import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { UserContext } from "./UserContext";

export const BarbeariaContext = createContext();

export const BarbeariaProvider = ({ children }) => {
  const [barbearia, setBarbearia] = useState();
  const [loadData, setLoadData] = useState(false);
  const { setUsuario } = useContext(UserContext);

  const getBarbearia = async (barbeariaNome) => {
    try {
      setLoadData(true);
      const nome = { Nome: barbeariaNome };
      const resposta = await http.post(
        "barbearia/buscarBarbeariaPeloNome",
        nome,
        { withCredentials: true }
      );
      setBarbearia(resposta.data.barbearia);
      setUsuario(resposta.data.usuario);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.location.href = "/notFound";
      }
    } finally {
      setLoadData(false);
    }
  };

  return (
    <BarbeariaContext.Provider
      value={{ barbearia, setBarbearia, getBarbearia, loadData, setLoadData }}
    >
      {children}
    </BarbeariaContext.Provider>
  );
};
