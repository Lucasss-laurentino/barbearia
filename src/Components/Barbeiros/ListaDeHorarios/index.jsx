import { useContext, useEffect, useState } from "react";
import { AdicionarHorario } from "./AdicionarHorario";
import "./index.css";
import { UserContext } from "../../../Context/UserContext";
import { Data } from "./Data";
import { HorarioContext } from "../../../Context/HorarioContext";
import { DataContext } from "../../../Context/DataContext";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";
import { ItemDaLista } from "./ItemDaLista";
import { useParams } from "react-router-dom";

export const ListaDeHorarios = ({ barbeiro }) => {
  const [horariosVagos, setHorariosVagos] = useState([]);

  const { user } = useContext(UserContext);
  const {
    horarios,
    horariosDesseBarbeiro,
    filtraHorariosPelaHora,
    filtraHorariosDisponiveis,
  } = useContext(HorarioContext);
  const { data, pegarDataDeHoje } = useContext(DataContext);
  const { horariosMarcado, buscarHorariosAgendado } = useContext(
    HorarioMarcadoContext
  );
  const { barbearia } = useParams();
  useEffect(() => {
    pegarDataDeHoje();
    buscarHorariosAgendado(barbearia);
  }, []);

  useEffect(() => {
    const filtrarHorarios = async () => {
      if (data) {
        const horariosBarbeiro = await horariosDesseBarbeiro(barbeiro);
        if (horariosBarbeiro.length > 0) {
          const horariosFiltradoPelaHora = await filtraHorariosPelaHora(
            horariosBarbeiro
          );
          if (horariosFiltradoPelaHora !== null) {
            const horariosFiltrado = await filtraHorariosDisponiveis(
              horariosFiltradoPelaHora,
              horariosMarcado,
              data
            );
            setHorariosVagos(horariosFiltrado);
          }
        }
      }
    };
    filtrarHorarios();
  }, [barbeiro, horarios, data, horariosMarcado]);

  return (
    <>
      <div className="d-flex z-ind justify-content-center align-items-center flex-column">
        <ul className="horarios-fechado" id={barbeiro.ID}>
          {user?.ADM && <AdicionarHorario barbeiro={barbeiro} />}
          <Data />
          {horariosVagos.map((horarioFiltrado) => (
            <ItemDaLista
              horario={horarioFiltrado}
              key={horarioFiltrado.ID}
              barbeiro={barbeiro}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
