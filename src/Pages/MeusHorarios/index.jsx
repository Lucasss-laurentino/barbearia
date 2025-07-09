import "./index.css";
// import { CardHorarioMarcado } from "./CardHorarioMarcado";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { AgendamentoContext } from "../../Context/AgendamentoContext";
import { CardHorarioMarcado } from "./CardHorarioMarcado";
import { CardHorariosMarcadosAnterior } from "./CardHorariosMarcadosAnterior";

export const MeusHorarios = () => {
  const [agendamentosFiltrado, setAgendamentosFiltrado] = useState([]);

  const { usuario } = useContext(UserContext);
  const {
    getMeusAgendamentos,
    meusAgendamentos,
    setMeusAgendamentos,
    meuAgendamento,
    setMeuAgendamento,
  } = useContext(AgendamentoContext);

  useEffect(() => {
    const pegaAgendamentos = async () => {
      await getMeusAgendamentos();
    };
    pegaAgendamentos();
  }, []);

  useEffect(() => {
    if (meuAgendamento) {
      const agendamentos = meusAgendamentos.filter(
        (mA) => mA.id !== meuAgendamento?.id
      );
      setAgendamentosFiltrado([...agendamentos]);
    }
  }, [meusAgendamentos, meuAgendamento]);

  return (
    <>
      {meusAgendamentos.length < 1 && (
        <div className="encapsula-horarios">
          {/* <CardHorarioMarcado /> */}
          <div className="estado-vazio-meusHorarios">
            <h4 className="mensagem-vazia">
              Nenhum horário agendado até o momento
            </h4>
            <p className="subtexto-vazio">
              {!usuario && "Faça login e acesse seu histórico de agendamentos."}
              {usuario && "Você ainda não agendou nenhum horário."}
            </p>
          </div>
        </div>
      )}
      <div className="encapsula-horarios">
        {meuAgendamento && <CardHorarioMarcado />}
        {agendamentosFiltrado.length > 0 &&
          agendamentosFiltrado.map((agendamento) => (
            <CardHorariosMarcadosAnterior agendamento={agendamento} />
          ))}
      </div>
    </>
  );
};
