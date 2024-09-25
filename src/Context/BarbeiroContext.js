import { createContext, useState } from "react";
import { http } from "../http";

export const BarbeiroContext = createContext();

export const BarbeiroProvider = ({ children }) => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [imagem, setImagem] = useState();
  const [loadBarbeiro, setLoadBarbeiro] = useState(false);

  const criarBarbeiro = async (data, setShow) => {
    try {
      setLoadBarbeiro(true);
      const formData = new FormData();
      formData.append("NOME", data.NOME);
      formData.append("IMAGEM", imagem);
      const response = await http.post(`/barbeiro/criarBarbeiro`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBarbeiros([...barbeiros, response.data.barbeiro]);
      setLoadBarbeiro(false);
      setShow(false);
    } catch (error) {}
  };

  const pegarBarbeiros = async () => {
    try {
      const response = await http.get("barbeiro/pegarBarbeiros", {
        withCredentials: true,
      });
      if (!response) throw "Erro ao buscar barbeiros";
      setBarbeiros([...response.data.barbeiros]);
    } catch (erro) {}
  };

  return (
    <BarbeiroContext.Provider
      value={{
        barbeiros,
        setBarbeiros,
        criarBarbeiro,
        imagem,
        setImagem,
        pegarBarbeiros,
        loadBarbeiro,
        setLoadBarbeiro,
      }}
    >
      {children}
    </BarbeiroContext.Provider>
  );
};
