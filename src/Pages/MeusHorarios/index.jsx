import "./index.css";
// import { CardHorarioMarcado } from "./CardHorarioMarcado";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export const MeusHorarios = () => {

  const { usuario } = useContext(UserContext);

  return (
    <>
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
    </>
  );
};
