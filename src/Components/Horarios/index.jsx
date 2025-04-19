import { useContext, useEffect, useState } from "react";
import "./index.css";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { Li } from "./Li";
import { useParams } from "react-router-dom";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { FinanceiroContext } from "../../Context/FinanceiroContext";

export const Horarios = () => {
  const {
    horariosMarcado,
    buscarHorariosAgendado,
    ordenaAgendamentos,
    agendamentosOrdenados,
  } = useContext(HorarioMarcadoContext);
  const { pegarServicos } = useContext(ServicoContext);
  const { pegarHorarios } = useContext(HorarioContext);
  const { pegarBarbeiros } = useContext(BarbeiroContext);
  const { calculaFaturamentoPrevisto, lucroDiario } = useContext(FinanceiroContext);
  const { barbearia } = useParams();
  const [hoje] = useState(new Date());

  useEffect(() => {
    buscarHorariosAgendado(barbearia);
    pegarHorarios(barbearia);
    pegarServicos(barbearia);
    pegarBarbeiros(barbearia);
  }, []);

  useEffect(() => {
    calculaFaturamentoPrevisto();
  }, [horariosMarcado, agendamentosOrdenados]);

  useEffect(() => {
    ordenaAgendamentos();
  }, [horariosMarcado, hoje]);

  return (
    <>
      <div className="container-fluid tamanho-maximo">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 d-flex justify-content-center align-items-center">
            <div className="col-12 head-horarios">
              <div className="col-5 quantia-agendamento-horarios">
                <div className="col-12 px-1 align-qnt-agendamento">
                  <h5 className="">{agendamentosOrdenados?.length}</h5>
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
            <ul className="col-12 m-0 p-0 list-style scroll-horarios">
              {agendamentosOrdenados.length > 0 ? agendamentosOrdenados?.map((horario, index) => {
                return (<Li key={index} horario={horario} />);
              }) :
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                  <h3 className="text-white">Nenhum horário agendado</h3>
                </div>
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};