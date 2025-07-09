import { useContext } from "react";
import "./index.css";
import { Li } from "./Li";
import "react-toastify/dist/ReactToastify.css";
import { AgendamentoContext } from "../../Context/AgendamentoContext";

export const Agendamentos = () => {
  const { agendamentos } = useContext(AgendamentoContext);

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <div className="container-fluid tamanho-maximo">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 d-flex justify-content-center align-items-center">
                <div className="col-12 head-horarios">
                  <div className="col-5 quantia-agendamento-horarios">
                    <div className="col-12 px-1 align-qnt-agendamento">
                      <h5 className="">0</h5>
                      <p className="m-0">Agendamentos</p>
                    </div>
                  </div>
                  <div className="col-7 align-qnt-agendamento">
                    <h5>R$0</h5>
                    <p className="m-0">Faturamento previsto</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-8 d-flex justify-content-center align-items-center">
                <ul className="col-12 m-0 p-0 list-style scroll-horarios">
                  {agendamentos && agendamentos.length > 0 ? (
                    agendamentos.map((agendamento, index) => {
                      return <Li key={index} agendamento={agendamento} />;
                    })
                  ) : (
                    <div className="estado-vazio-agendamento">
                      <h4 className="mensagem-vazia">
                        Nenhum horário agendado até o momento
                      </h4>
                      <p className="subtexto-vazio">
                        Os agendamentos da barbearia aparecerão aqui assim que
                        forem feitos.
                      </p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
