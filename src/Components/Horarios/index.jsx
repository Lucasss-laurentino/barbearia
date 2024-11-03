import { useContext, useEffect, useState } from "react";
import "./index.css";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { MenuBottom } from "../MenuBottom";
import { Li } from "./Li";

export const Horarios = () => {
  const {
    horariosMarcado,
    aceitarHorarioPendente,
    recusarHorarioPendente,
    cancelarMeuHorarioMarcadoAdm,
  } = useContext(HorarioMarcadoContext);
  const { servicos } = useContext(ServicoContext);
  const { horarios } = useContext(HorarioContext);
  const { barbeiros } = useContext(BarbeiroContext);
  const [lucroDiario, setLucroDiario] = useState();
  const [horariosOrdenados, setHorariosOrdenados] = useState([]);

  const limparValor = (valor) => {
    return valor
      ? parseFloat(valor.replace(/R\$|\./g, "").replace(",", "."))
      : "";
  };

  useEffect(() => {
    let precos = [];
    horariosMarcado?.forEach((horarioMarcado) => {
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
  }, [horariosMarcado]);

  useEffect(() => {
    if (horariosMarcado) {
      const ordenados = [...horariosMarcado].sort((a, b) => {
        // Primeiro, ordenar pela propriedade RESERVADO
        if (a.RESERVADO === 2 && b.RESERVADO !== 2) {
          return -1; // a deve vir antes de b
        }
        if (a.RESERVADO !== 2 && b.RESERVADO === 2) {
          return 1; // b deve vir antes de a
        }
        // Se ambos têm o mesmo valor de RESERVADO, ordenar pela DATA
        const dataA = new Date(a.DATA.split('/').reverse().join('-'));
        const dataB = new Date(b.DATA.split('/').reverse().join('-'));
        return dataA - dataB; // Ordenar por DATA
      });
      setHorariosOrdenados(ordenados);
    }
  }, [horariosMarcado]);

  return (
    <>
      <div className="container-fluid col-12 d-flex justify-content-center altura">
        <div className="col-3 col-sm-4 col-md-5 d-none d-sm-flex justify-content-sm-center  borda-direita">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <img
              src="/logo_preto.png"
              className="img-fluid"
              width={"80%"}
              alt=""
            />
          </div>
        </div>
        <div className="row col-12 col-sm-9 col-md-8 text-white d-sm-flex justify-content-md-center align-items-sm-center">
          <div className="col-12 col-md-10 col-lg-9 p-0 pt-sm-5 scroll-horarios">
            <div className="col-12 head-horarios">
              <div className="col-5 quantia-agendamento-horarios">
                <div className="col-11 px-1 align-qnt-agendamento">
                  <h5 className="">{horariosMarcado?.length}</h5>
                  <p className="m-0">Agendamentos</p>
                </div>
              </div>
              <div className="col-6 align-qnt-agendamento">
                <h5>{lucroDiario}</h5>
                <p className="m-0">Faturamento previsto</p>
              </div>
            </div>
            <ul className="list-horarios">
              {horariosOrdenados?.map((horario, index) => {
                const hora = horarios.find((h) => h.ID === horario?.HORARIO_ID);
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
                    cancelarMeuHorarioMarcadoAdm={cancelarMeuHorarioMarcadoAdm}
                  />
                );
              })}
            </ul>
          </div>
          <div className="d-none d-sm-block">
            <MenuBottom />
          </div>
        </div>
      </div>
    </>
  );
};
