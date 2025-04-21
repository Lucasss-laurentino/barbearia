import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { useFormatarHorarioMarcado } from "../Hooks/horarioMarcado";
import { ServicoContext } from "./ServicoContext";
import { BarbeiroContext } from "./BarbeiroContext";
import { HorarioContext } from "./HorarioContext";
import { BarbeariaContext } from "./BarbeariaContext";

export const HorarioMarcadoContext = createContext();

export const HorarioMarcadoProvider = ({ children }) => {
  
  // states
  const [horarioMarcado, setHorarioMarcado] = useState();
  const [meusHorarios, setMeusHorarios] = useState([]);
  const [horariosMarcado, setHorariosMarcado] = useState([]);
  const [agendamentosOrdenados, setAgendamentosOrdenados] = useState([]);
  const [hoje] = useState(new Date());

  // hooks
  const { formatarHorarioMarcado } =
    useFormatarHorarioMarcado();

  // contexts
  const { servicos } = useContext(ServicoContext);
  const { barbeiros } = useContext(BarbeiroContext);
  const { horarios } = useContext(HorarioContext);
  const { barbearia } = useContext(BarbeariaContext);

  useEffect(() => {
    if (servicos.length > 0 && barbeiros.length > 0 && horarios.length > 0) {
      pegarMeuHorarioMarcado();
    }
  }, [servicos, barbeiros, horarios])

  useEffect(() => {
    if (barbearia) buscarHorariosAgendado(barbearia);
  }, [barbearia]);

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
  };

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

  const pegarMeuHorarioMarcado = async () => {
    try {
      const agendamento = await pegarHorarioMarcadoPeloLocalStorage();
      if (!agendamento) throw new Error("Não tem horário marcado");
      const result = await http.post("/horario/buscarMeuHorarioMarcado", {
        agendamento,
      });
      if (!result) throw new Error("");
      const agendamentoRetornado = result.data;
      const agendamentoObj = await formatarHorarioMarcado(agendamentoRetornado);
      localStorage.setItem("agendamento", JSON.stringify(agendamentoObj));
      setHorarioMarcado(agendamentoObj);
    } catch (error) {
      console.log(error);
    }
  };

  const pegarHorarioMarcadoPeloLocalStorage = () => {
    const agendamento = localStorage.getItem("agendamento");
    if (!agendamento || agendamento === "{}") return null;
    return JSON.parse(agendamento);
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
        pegarMeuHorarioMarcado,
        meusHorarios,
        setMeusHorarios,
      }}
    >
      {children}
    </HorarioMarcadoContext.Provider>
  );
};
