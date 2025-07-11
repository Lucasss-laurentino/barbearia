import "./index.css";
// import { CardHorarioMarcado } from "./CardHorarioMarcado";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { AgendamentoContext } from "../../Context/AgendamentoContext";
import { CardHorarioMarcado } from "./CardHorarioMarcado";
import { CardHorariosMarcadosAnterior } from "./CardHorariosMarcadosAnterior";

export const MeusHorarios = () => {

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

  return (
    <>
      {meusAgendamentos.length < 1 && (
        <div className="card-sem-agendamentos">
          <div className="mensagem-centralizada">
            <h4 className="titulo-sem-agendamentos">
              Nenhum horário agendado até o momento
            </h4>
            <p className="texto-secundario">
              {!usuario && "Faça login e acesse seu histórico de agendamentos."}
              {usuario && "Você ainda não agendou nenhum horário."}
            </p>
          </div>
        </div>
      )}

      {meusAgendamentos.length > 0 && (
        <ul className="lista-agendamentos">
          {meuAgendamento && (
            <li>
              <CardHorarioMarcado agendamento={meuAgendamento} />
            </li>
          )}

          {meusAgendamentos
            .filter((agendamento) => agendamento.id !== meuAgendamento?.id)
            .map((agendamento) => (
              <li key={agendamento.id}>
                <CardHorariosMarcadosAnterior agendamento={agendamento} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
