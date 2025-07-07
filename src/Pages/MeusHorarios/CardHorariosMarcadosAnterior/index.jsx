import { useEffect, useState } from "react";

export const CardHorariosMarcadosAnterior = ({ agendamento }) => {
  const [data, setData] = useState(null);
  const [hoje, setHoje] = useState(new Date().toLocaleDateString("pt-BR"));

    useEffect(() => {
      if (agendamento && agendamento?.data) {
        const dataObj = new Date(agendamento.data);
        const dataFormadata = dataObj.toLocaleDateString("pt-BR");
        setData(dataFormadata);
      }
    }, [agendamento]);
  

  return (
    <div className="card-horario muted">
      <h3>Horário anterior</h3>
      <p>
        <strong>Data:</strong> {data}
      </p>
      <p>
        <strong>Hora:</strong> {agendamento?.hora}
      </p>
      <p>
        <strong>Serviço:</strong> {agendamento.servicoNome}
      </p>
      <p>
        <strong>Preço:</strong> R$ {agendamento.servicoPreco}
      </p>
      <p>
        <strong>Barbeiro:</strong> {agendamento.barbeiroNome}
      </p>
    </div>
  );
};
