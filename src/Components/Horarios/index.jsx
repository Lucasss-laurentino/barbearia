import { useContext, useEffect, useState } from "react";
import "./index.css";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { Li } from "./Li";
import { UserContext } from "../../Context/UserContext";

export const Horarios = () => {
  const {
    horariosMarcado,
    aceitarHorarioPendente,
    recusarHorarioPendente,
    cancelarMeuHorarioMarcadoAdm,
    finalizarHorarioAgendado,
    buscarHorariosAgendado,
  } = useContext(HorarioMarcadoContext);
  const { servicos } = useContext(ServicoContext);
  const { user } = useContext(UserContext);
  const { horarios } = useContext(HorarioContext);
  const { barbeiros } = useContext(BarbeiroContext);
  const [lucroDiario, setLucroDiario] = useState();
  const [horariosOrdenados, setHorariosOrdenados] = useState([]);
  const [hoje] = useState(new Date());

  const limparValor = (valor) => {
    return valor
      ? parseFloat(valor.replace(/R\$|\./g, "").replace(",", "."))
      : "";
  };

  // busca todos horarios marcados dessa barbearia
  useEffect(() => {
    buscarHorariosAgendado(user?.NOME_BARBEARIA);
  }, []);

  // setando um faturamento previsto
  useEffect(() => {
    let precos = [];
    horariosOrdenados?.forEach((horarioMarcado) => {
      const servico = servicos.find((s) => s.ID === horarioMarcado?.SERVICO_ID);
      precos.push(limparValor(servico?.PRECO));
    });
    const total = precos.reduce(
      (valorAcumulado, valorAtual) => valorAcumulado + valorAtual,
      0
    );
    setLucroDiario(
      `R$ ${total.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    );
  }, [horariosMarcado, horariosOrdenados]);

  useEffect(() => {
    if (horariosMarcado) {
      const ordenados = [...horariosMarcado].sort((a, b) => {
        // Primeiro, ordenar pela propriedade RESERVADO (2, 1, 0)
        if (a.RESERVADO !== b.RESERVADO) {
          return b.RESERVADO - a.RESERVADO; // RESERVADO = 2 vem primeiro, depois 1, depois 0
        }

        // Se ambos têm o mesmo valor de RESERVADO, ordenar pelo HORARIO_ID
        const horarioA = a.HORARIO_ID; // O valor do HORARIO_ID
        const horarioB = b.HORARIO_ID; // O valor do HORARIO_ID

        // Ordenar pelo HORARIO_ID em ordem crescente
        return horarioA - horarioB; // Ordenação numérica
      });

      const horariosDeHoje = ordenados.filter((horarioOrdenado) => {
        const dataFormatada = `${hoje.toLocaleString("pt-BR", {
          day: "2-digit",
        })}/${hoje.toLocaleString("pt-BR", {
          month: "2-digit",
        })}/${hoje.toLocaleString("pt-BR", { year: "numeric" })}`;
        return horarioOrdenado.DATA === dataFormatada;
      });
      setHorariosOrdenados(horariosDeHoje);
    }
  }, [horariosMarcado, hoje]);

  return (
    <>
      <div className="fundo-imagem">
        <div className="cortina-transparente">
          <div className="container-fluid tamanho-maximo">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 d-flex justify-content-center align-items-center">
                <div className="col-12 head-horarios">
                  <div className="col-5 quantia-agendamento-horarios">
                    <div className="col-12 px-1 align-qnt-agendamento">
                      <h5 className="">{horariosOrdenados?.length}</h5>
                      <p className="m-0">Agendamentos</p>
                    </div>
                  </div>
                  <div className="col-7 align-qnt-agendamento">
                    <h5>{lucroDiario}</h5>
                    <p className="m-0">Faturamento previsto</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-8 d-flex justify-content-center align-items-center">
                <ul className="col-12 m-0 p-0 list-style">
                  {horariosOrdenados.length > 0 ? horariosOrdenados?.map((horario, index) => {
                    const hora = horarios.find(
                      (h) => h.ID === horario?.HORARIO_ID
                    );
                    const servico = servicos.find(
                      (s) => s.ID === horario?.SERVICO_ID
                    );
                    return (
                      <Li
                        key={index}
                        horario={horario}
                        hora={hora}
                        servico={servico}
                        barbeiros={barbeiros}
                        aceitarHorarioPendente={aceitarHorarioPendente}
                        recusarHorarioPendente={recusarHorarioPendente}
                        cancelarMeuHorarioMarcadoAdm={
                          cancelarMeuHorarioMarcadoAdm
                        }
                        finalizarHorarioAgendado={finalizarHorarioAgendado}
                      />
                    );
                  }) : 
                  
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                      <h3 className="text-white">Nenhum horário agendado</h3>
                    </div>
                    
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
