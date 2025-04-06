import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { UserContext } from "./UserContext";

export const HorarioMarcadoContext = createContext();

export const HorarioMarcadoProvider = ({ children }) => {
  const [horarioMarcado, setHorarioMarcado] = useState();
  const [meusHorarios, setMeusHorarios] = useState([]);
  const [horariosMarcado, setHorariosMarcado] = useState([]);
  const [agendamentosOrdenados, setAgendamentosOrdenados] = useState([]);
  // sem esse gatilho re-renderiza PageDefault e nao aciona o item do menuFooter
  const [
    gatilhoPraDirecionarPraMeusHorarios,
    setGatilhoPraDirecionarPraMeusHorarios,
  ] = useState(false);
  const [hoje] = useState(new Date());
  const { user } = useContext(UserContext);

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
      const objFormatado = await formatarObjePraEnvio();
      if (objFormatado?.erro) throw new Error(objFormatado.mensagem);
      const { objEnvio } = objFormatado;
      const result = await http.post("/horario/buscarMeuHorarioMarcado", {
        agendamento: objEnvio,
      });
      if (!result) throw new Error("");
      if (!objEnvio.logado) setHorarioMarcado(result.data);
     
      // se usuario estiver logado, seta meusHorarios e chama uma função pra pegar a hora marcada e setar horarioMarcado
    } catch (error) {
      console.log(error);
    }
  };

  const formatarObjePraEnvio = async () => {
    try {
      let objPraEnviarNaRequisicao;
      if (!user?.ID)
        objPraEnviarNaRequisicao = await pegarHorarioMarcadoDeslogado();
      // se tem esse erro é porque alem de nao logado o usuario nao tem hora marcada
      if (objPraEnviarNaRequisicao?.erro)
        throw new Error(objPraEnviarNaRequisicao.mensagem);
      if (user?.ID) {
        objPraEnviarNaRequisicao.USER = user;
        objPraEnviarNaRequisicao.logado = true;
      }
      return { erro: false, objEnvio: objPraEnviarNaRequisicao };
    } catch (error) {
      return { erro: false, mensagem: error.Mesage };
    }
  };

  const pegarHorarioMarcadoDeslogado = async () => {
    try {
      const horarioAgendado = localStorage.getItem("agendamento");
      if (Object.keys(horarioAgendado).length > 0) {
        return {
          erro: false,
          horarioAgendado: JSON.parse(horarioAgendado),
          logado: false,
        };
      }
      return {
        erro: true,
        mensagem: "Agendamento não encontrado!",
        logado: false,
      };
    } catch (error) {
      return { erro: true, mensagem: error.Mesage, logado: false };
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
        pegarMeuHorarioMarcado,
        gatilhoPraDirecionarPraMeusHorarios,
        setGatilhoPraDirecionarPraMeusHorarios,
        meusHorarios,
        setMeusHorarios,
      }}
    >
      {children}
    </HorarioMarcadoContext.Provider>
  );
};
