import { useContext, useEffect } from "react";
import "./index.css";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { CardHorarioMarcado } from "./CardHorarioMarcado";
import { CardHorariosMarcadosAnterior } from "./CardHorariosMarcadosAnterior";

export const MeusHorarios = () => {
  const {
    gatilhoPraDirecionarPraMeusHorarios,
    setGatilhoPraDirecionarPraMeusHorarios,
    pegarMeuHorarioMarcado,
    horarioMarcado
  } = useContext(HorarioMarcadoContext);

  useEffect(() => {
    if (gatilhoPraDirecionarPraMeusHorarios)
      setGatilhoPraDirecionarPraMeusHorarios(false);
    pegarMeuHorarioMarcado();
  }, [gatilhoPraDirecionarPraMeusHorarios]);

  return (
    <>
      <div className="container-horarios">
        <CardHorarioMarcado horario={horarioMarcado} />
        {/*<CardHorariosMarcadosAnterior />  // testar quando criar um usuario e agendar um horario logado.     */}
      </div>
    </>
  );
};
