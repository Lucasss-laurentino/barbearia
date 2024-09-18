import { createContext, useEffect, useState } from "react";

export const ServicoContext = createContext();

export const ServicoProvider = ({ children }) => {
  const [servicos, setServicos] = useState([
    {
      ID: 1,
      NOME: "Cabelo",
      PRAZO: "30/40 min.",
      PRECO: "R$ 20,00",
      IMG: "servicos/cabelo.jpeg",
    },
    {
      ID: 2,
      NOME: "Cabelo/Reflexo",
      PRAZO: "1h/1h:30 min",
      PRECO: "R$ 50,00",
      IMG: "servicos/reflexo.jpg",
    },
    {
      ID: 3,
      NOME: "Cabelo/barba",
      PRAZO: "40/50 min",
      PRECO: "R$ 35,00",
      IMG: "servicos/cabelo_barba.jpeg",
    },
    {
      ID: 4,
      NOME: "Cabelo/pigmentação",
      PRAZO: "40/50 min",
      PRECO: "R$ 30,00",
      IMG: "servicos/corte_pigmentacao.jpeg",
    },
    {
      ID: 5,
      NOME: "Pézinho",
      PRAZO: "10 min",
      PRECO: "R$ 10,00",
      IMG: "servicos/pezinho.jpeg",
    }
  ]);

  const [servicoEscolhido, setServicoEscolhido] = useState();

  return (
    <ServicoContext.Provider
      value={{
        servicos,
        setServicos,
        servicoEscolhido,
        setServicoEscolhido
      }}
    >
      {children}
    </ServicoContext.Provider>
  );
};
