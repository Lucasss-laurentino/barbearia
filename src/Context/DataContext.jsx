import { createContext, useContext, useEffect, useState } from "react";
import { AnimacaoContext } from "./AnimacaoHorarios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [dia, setDia] = useState();
  const [mes, setMes] = useState();

  const { setAnimaCalendario } = useContext(AnimacaoContext);

  useEffect(() => {
    const hoje = new Date();
    setDia(hoje.getDate());
    setMes(hoje.toLocaleString("pt-BR", { month: "2-digit" }));
  }, []);

  useEffect(() => {
    setData(`${dia}/${mes}`);
  }, [dia, mes]);

  const mudarData = (diaParametro, mes, diaAtual) => {
    if (diaParametro.dia >= diaAtual) {
    setData(`${diaParametro.dia}/${mes + 1}`);
    setAnimaCalendario("container-fluid calendario-hidden bg-dark");      
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, mudarData }}>
      {children}
    </DataContext.Provider>
  );
};
