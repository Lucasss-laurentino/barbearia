import { useContext, useEffect, useState } from "react";
import "./index.css";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { Li } from "./Li";
import { FinanceiroContext } from "../../Context/FinanceiroContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "../../Context/SocketContext";

export const Agendamentos = () => {
  const { horariosMarcado, ordenaAgendamentos, agendamentosOrdenados } =
    useContext(HorarioMarcadoContext);
  const { calculaFaturamentoPrevisto, lucroDiario } =
    useContext(FinanceiroContext);
  const [hoje] = useState(new Date());
  const { erroFinalizarHorario, setErroFinalizarHorario } =
    useContext(SocketContext);
  useEffect(() => {
    calculaFaturamentoPrevisto();
  }, [horariosMarcado, agendamentosOrdenados]);

  useEffect(() => {
    ordenaAgendamentos();
  }, [horariosMarcado, hoje]);

  useEffect(() => {
    if (erroFinalizarHorario) {
      toast.error(erroFinalizarHorario, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setErroFinalizarHorario();
    }
  }, [erroFinalizarHorario]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
        transition={Bounce}
      />
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
              {agendamentosOrdenados.length > 0 ? (
                agendamentosOrdenados?.map((horario, index) => {
                  return <Li key={index} horario={horario} />;
                })
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <h3 className="text-white">Nenhum horário agendado</h3>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
