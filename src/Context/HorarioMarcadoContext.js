import { createContext, useState } from "react";
import { http } from "../http";

export const HorarioMarcadoContext = createContext();

export const HorarioMarcadoProvider = ({ children }) => {
  const [horarioMarcado, setHorarioMarcado] = useState();
  const [horariosMarcado, setHorariosMarcado] = useState([]);
  const [agendamentosOrdenados, setAgendamentosOrdenados] = useState([]);
  const [hoje] = useState(new Date());

  const ordenaAgendamentos = () => {
    if (horariosMarcado.length > 0) {
      const ordenados = [...horariosMarcado].sort((a, b) => {
        // Primeiro, ordenar pela propriedade RESERVADO (2, 1, 0)
        if (a.RESERVADO !== b.RESERVADO) {
          return b.RESERVADO - a.RESERVADO; // RESERVADO = 2 vem primeiro, depois 1, depois 0
        }

        // Se ambos têm o mesmo valor de RESERVADO, ordenar pelo HORARIO_ID
        const horarioA = a.HORARIO_ID;
        const horarioB = b.HORARIO_ID;

        // Ordenar pelo HORARIO_ID em ordem crescente
        return horarioA - horarioB;
      });

      const horariosDeHoje = ordenados.filter((horarioOrdenado) => {
        const dataFormatada = `${hoje.toLocaleString("pt-BR", {
          day: "2-digit",
        })}/${hoje.toLocaleString("pt-BR", {
          month: "2-digit",
        })}/${hoje.toLocaleString("pt-BR", { year: "numeric" })}`;
        return horarioOrdenado.DATA === dataFormatada;
      });
      setAgendamentosOrdenados(horariosDeHoje);
    } else {
      setAgendamentosOrdenados(horariosMarcado);
    }
  }

  const buscarHorariosAgendado = async (barbearia) => {
    try {
      const response = await http.get(
        `horario/pegarHorariosAgendado/${barbearia}`
      );
      if (!response) throw "Erro ao buscar horários";
      setHorariosMarcado(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <HorarioMarcadoContext.Provider
      value={{
        horarioMarcado,
        setHorarioMarcado,
        buscarHorariosAgendado,
        horariosMarcado,
        setHorariosMarcado,
        agendamentosOrdenados, 
        setAgendamentosOrdenados,
        ordenaAgendamentos,
      }}
    >
      {children}
    </HorarioMarcadoContext.Provider>
);
};