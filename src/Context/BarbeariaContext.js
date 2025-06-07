import { createContext, useState } from "react";
import { http } from "../http";

export const BarbeariaContext = createContext();

export const BarbeariaProvider = ({ children }) => {
  const [barbearia, setBarbearia] = useState();

  const getBarbearia = async (barbeariaNome) => {
    try {
      const nome = { Nome: barbeariaNome };
      const resposta = await http.post(
        "barbearia/buscarBarbeariaPeloNome",
        nome
      );
      setBarbearia(resposta.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.location.href = "/notFound";
      }
    }
  };

  return (
    <BarbeariaContext.Provider
      value={{ barbearia, setBarbearia, getBarbearia }}
    >
      {children}
    </BarbeariaContext.Provider>
  );
};
