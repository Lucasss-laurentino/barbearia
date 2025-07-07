import "./index.css";
// import { CardHorarioMarcado } from "./CardHorarioMarcado";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { AgendamentoContext } from "../../Context/AgendamentoContext";
import { CardHorarioMarcado } from "./CardHorarioMarcado";

export const MeusHorarios = () => {
  const { usuario } = useContext(UserContext);
  const { getMeusAgendamentos, meusAgendamentos } =
    useContext(AgendamentoContext);

  useEffect(() => {
    const pegaAgendamentos = async () => {
      await getMeusAgendamentos();
    };
    pegaAgendamentos();
  }, []);

  return (
    <>
      {!meusAgendamentos && meusAgendamentos.length < 1 && (
        <div className="container-horarios">
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
      {meusAgendamentos.length > 0 &&
        meusAgendamentos.map((agendamento) => {
          return <CardHorarioMarcado agendamento={agendamento}/>;
        })}
    </>
  );
};
