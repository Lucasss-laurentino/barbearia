import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { HorarioContext } from "./HorarioContext";
import { ServicoContext } from "./ServicoContext";

export const HorarioMarcadoContext = createContext();

export const HorarioMarcadoProvider = ({ children }) => {
  const { setUsuarioTemHorarioMarcado, setHorarios } = useContext(HorarioContext);
  const { setServicoEscolhido } = useContext(ServicoContext);
  const [horarioMarcado, setHorarioMarcado] = useState();
  const [horariosMarcado, setHorariosMarcado] = useState([]);

  const { ordenarHorarios, setErrosHorarios } = useContext(HorarioContext);

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

  const marcarHorario = async (userContrata) => {
    try {
      const response = await http.post(
        "horario/marcarHorario",
        { userContrata },
        { withCredentials: true }
      );
      if (!response) throw "Erro ao marcar horario";
      ordenarHorarios(response.data);
      setUsuarioTemHorarioMarcado(true);
    } catch (error) {
      console.log(error);
    }
  };

  const verificaAntesDeMarcar = (horario_id, userContrata) => {
    // verifica se o usuario marcou um serviço antes de agendar um horario
    if (Object.keys(userContrata.servicoEscolhido).length < 1) {
      setErrosHorarios({
        erro: true,
        menssagem: "Selecione um serviço antes de agendar um horário",
      });
    } else {
      // futuramente será necessario verificar se o usuario ja possui um horario marcado
      marcarHorario(userContrata);
    }
  };

  const desmarcarHorario = async () => {
    try {
      const response = await http.post(
        "horario/desmarcarHorario",
        {},
        {
          withCredentials: true,
        }
      );
      ordenarHorarios(response.data);
      setUsuarioTemHorarioMarcado(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelarMeuHorarioPendente = async (meuHorarioPendente) => {
    try {
      const response = await http.post("horario/cancelarHorarioPendente", { meuHorarioPendente });
      if (!response) throw "Não foi possivel cancelar seu horário";
      console.log(response.data);
      setUsuarioTemHorarioMarcado(false);
      setHorarios(response.data.horarios);
      setHorarioMarcado({});
      localStorage.setItem("agendamento", "");
      setServicoEscolhido({})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <HorarioMarcadoContext.Provider
      value={{
        horarioMarcado,
        setHorarioMarcado,
        verificaAntesDeMarcar,
        desmarcarHorario,
        buscarHorariosAgendado,
        horariosMarcado,
        setHorariosMarcado,
        cancelarMeuHorarioPendente
      }}
    >
      {children}
    </HorarioMarcadoContext.Provider>
  );
};
