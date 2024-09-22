import { createContext, useContext, useState } from "react";
import { http } from "../http";

export const BarbeiroContext = createContext();

export const BarbeiroProvider = ({ children }) => {
  const [barbeiros, setBarbeiros] = useState([
    {
      ID: 1,
      NOME: "LC",
      IMG: "barbeiros/barbeiro1.jpg",
    },
    {
      ID: 2,
      NOME: "Jota",
      IMG: "barbeiros/barbeiro2.jpg",
    },
    {
      ID: 3,
      NOME: "LC",
      IMG: "barbeiros/barbeiro1.jpg",
    },
    {
      ID: 4,
      NOME: "Jota",
      IMG: "barbeiros/barbeiro2.jpg",
    },
    {
      ID: 5,
      NOME: "LC",
      IMG: "barbeiros/barbeiro1.jpg",
    },
    {
      ID: 6,
      NOME: "Jota",
      IMG: "barbeiros/barbeiro2.jpg",
    },
  ]);
  const [imagem, setImagem] = useState();
  const criarBarbeiro = async (data) => {
    
    try {
      const formData = new FormData();
      formData.append("NOME", data.NOME);
      formData.append("IMAGEM", imagem);
      const response = await http.post(`/barbeiro/criarBarbeiro`, formData,{
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      setBarbeiros([...barbeiros, response.data.barbeiro]);
    } catch(error) {

    }
  };


  return (
      <BarbeiroContext.Provider value={{
          barbeiros,
          setBarbeiros,
          criarBarbeiro,  
          imagem,
          setImagem
    }}>{children}</BarbeiroContext.Provider>
  );
};
