import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { HorarioContext } from "./HorarioContext";

export const HorarioMarcadoContext = createContext();

export const HorarioMarcadoProvider = ({ children }) => {
  const [usuarioTemHorarioMarcado, setUsuarioTemHorarioMarcado] =
    useState(false);
  const [horarioMarcado, setHorarioMarcado] = useState();

  const { ordenarHorarios, setErrosHorarios } = useContext(HorarioContext);

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

  const buscarMeuHorarioMarcado = async () => {
    try {
      const response = await http.get("horario/buscarMeuHorarioMarcado", {
        withCredentials: true,
      });
      const horario = response.data;
      console.log(horario);
      setHorarioMarcado(response.data);
      setUsuarioTemHorarioMarcado(true);
    } catch (error) {
      setUsuarioTemHorarioMarcado(false);
    }
  };

  const desmarcarHorario = async () => {
    try {
        const response = await http.post("horario/desmarcarHorario", {}, {
          withCredentials: true,
        });
        ordenarHorarios(response.data);
        setUsuarioTemHorarioMarcado(false);
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <HorarioMarcadoContext.Provider
      value={{
        usuarioTemHorarioMarcado,
        setUsuarioTemHorarioMarcado,
        horarioMarcado,
        setHorarioMarcado,
        verificaAntesDeMarcar,
        buscarMeuHorarioMarcado,
        desmarcarHorario
      }}
    >
      {children}
    </HorarioMarcadoContext.Provider>
  );
};
