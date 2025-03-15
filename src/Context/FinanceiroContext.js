import { createContext, useContext, useState } from "react";
import { HorarioMarcadoContext } from "./HorarioMarcadoContext";
import { ServicoContext } from "./ServicoContext";

export const FinanceiroContext = createContext();

export const FinanceiroProvider = ({children}) => {

    const [lucroDiario, setLucroDiario] = useState();

    const { agendamentosOrdenados } = useContext(HorarioMarcadoContext);
    const { servicos } = useContext(ServicoContext);

    const calculaFaturamentoPrevisto = () => {
        let precos = [];
        agendamentosOrdenados?.forEach((horarioMarcado) => {
          const servico = servicos.find((s) => s.ID === horarioMarcado?.SERVICO_ID);
          precos.push(limparValor(servico?.PRECO));
        });
        const total = precos.reduce(
          (valorAcumulado, valorAtual) => valorAcumulado + valorAtual,
          0
        );
        setLucroDiario(
          `R$ ${total.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        );
    }

    const limparValor = (valor) => {
        return valor
          ? parseFloat(valor.replace(/R\$|\./g, "").replace(",", "."))
          : "";
      };    

    return (
        <FinanceiroContext.Provider value={{
            calculaFaturamentoPrevisto,
            lucroDiario, 
            setLucroDiario,
        }}>
            {children}
        </FinanceiroContext.Provider>
    )
}