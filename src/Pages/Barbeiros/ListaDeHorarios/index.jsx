import { useContext, useEffect, useState } from "react";
import { AdicionarHorario } from "./AdicionarHorario";
import "./index.css";
import { UserContext } from "../../../Context/UserContext";
import { Data } from "./Data";
import { HorarioContext } from "../../../Context/HorarioContext";
import { DataContext } from "../../../Context/DataContext";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";
import { ItemDaLista } from "./ItemDaLista";

export const ListaDeHorarios = ({ barbeiro }) => {

  // contexts
  const { user, verificandoUsuarioLogado } = useContext(UserContext);
  const { setarHorariosDisponiveis, horariosDisponiveis, horarios } = useContext(HorarioContext);
  const { data, pegarDataDeHoje } = useContext(DataContext);
  const { horariosMarcado } = useContext(
    HorarioMarcadoContext
  );

  const horariosDoBarbeiro = horariosDisponiveis.find(h => h.barbeiro.ID === barbeiro.ID)?.horarios || [];
  
  useEffect(() => {
    pegarDataDeHoje();
  }, []);

  useEffect(() => {
    if (data && verificandoUsuarioLogado) {
      setarHorariosDisponiveis(horariosMarcado);
    }
  }, [horariosMarcado, data, verificandoUsuarioLogado, horarios]);

  return (
    <>
      <div className="d-flex z-ind justify-content-center align-items-center flex-column">
        <ul className="horarios-fechado" id={barbeiro.ID}>
          {user?.ADM && <AdicionarHorario barbeiro={barbeiro} />}
          <Data />
          {horariosDoBarbeiro.map((horario) => (
            <ItemDaLista
              horario={horario}
              key={horario.ID}
              barbeiro={barbeiro}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
