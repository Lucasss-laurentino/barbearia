import { useContext, useEffect, useState } from "react";
import "./index.css";
import { AgendamentoContext } from "../../../Context/AgendamentoContext";

export const CardHorarioMarcado = () => {
  const [data, setData] = useState(null);
  const [hoje, setHoje] = useState(new Date().toLocaleDateString("pt-BR"));
  const { meuAgendamento, cancelarAgendamentoPendente } =
    useContext(AgendamentoContext);

  useEffect(() => {
    if (meuAgendamento && meuAgendamento?.data) {
      const dataObj = new Date(meuAgendamento.data);
      const dataFormadata = dataObj.toLocaleDateString("pt-BR");
      setData(dataFormadata);
    }
  }, [meuAgendamento]);

  return (
    <div className="card-horario">
      <div className="card-header">
        <h3>Agendamento</h3>
        {meuAgendamento?.status === 0 && (
          <span className="status-flag pendente">Pendente</span>
        )}
        {/* <span className="status-flag aceito">Aceito</span> */}
      </div>
      <p>
        <strong>Data:</strong> {data}
      </p>
      <p>
        <strong>Hora:</strong> {meuAgendamento?.hora}
      </p>
      <p>
        <strong>Serviço:</strong> {meuAgendamento?.servicoNome}
      </p>
      <p>
        <strong>Preço: </strong>
        R$ {meuAgendamento?.servicoPreco}
      </p>
      <p>
        <strong>Barbeiro:</strong> {meuAgendamento?.barbeiroNome}
      </p>
      {hoje <= data && (
        <button
          className="btn-cancelar"
          onClick={() => {
            if(meuAgendamento?.status === 0 || meuAgendamento?.status === 1) {
              cancelarAgendamentoPendente(meuAgendamento);
            }
          }}
        >
          Cancelar
        </button>
      )}
    </div>
  );
};
