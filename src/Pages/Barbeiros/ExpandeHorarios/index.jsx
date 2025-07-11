import "./index.css";
import { useContext, useEffect } from "react";
import { BarbeiroContext } from "../../../Context/BarbeiroContext";
import { HorarioContext } from "../../../Context/HorarioContext";
import { UserContext } from "../../../Context/UserContext";
import { ServicoContext } from "../../../Context/ServicoContext";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AgendamentoContext } from "../../../Context/AgendamentoContext";
import { Calendario } from "../../../Components/Calendario";
import { CalendarioContext } from "../../../Context/CalendarioContext";

export const ExpandeHorarios = ({
  expandedBarbeiroId,
  barbeiro,
  setShow,
  setShowModalDeletarHorario,
}) => {
  const { setBarbeiroSelecionado, barbeiros } = useContext(BarbeiroContext);
  const {
    setHorarioSelecionado,
    setHorarioOuBarbeiroPraExcluir,
    horariosFiltrado,
    setHorariosFiltrado,
    filtrarHorarios,
  } = useContext(HorarioContext);
  const { servicoEscolhido } = useContext(ServicoContext);
  const { usuario } = useContext(UserContext);
  const {
    agendar,
    erroAgendamento,
    setErroAgendamento,
    pegarAgendamentosPelaData,
  } = useContext(AgendamentoContext);
  const { dataSelecionada } = useContext(CalendarioContext);

  const handleAdicionarHorario = () => {
    setBarbeiroSelecionado(barbeiro);
    setShow(true);
  };

  const handleDeleteHorario = (horario) => {
    setHorarioOuBarbeiroPraExcluir(true);
    setShowModalDeletarHorario(true);
    setHorarioSelecionado(horario);
  };

  const handleUpdateHorario = (horario) => {
    setHorarioSelecionado(horario);
    setShow(true);
  };

  const handleAgendamento = async (barbeiro, horario) => {
    if (!servicoEscolhido) {
      toast.error("Selecione um serviço antes!", {
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
      return;
    }
    if (servicoEscolhido && erroAgendamento !== null) {
      toast.error(erroAgendamento, {
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
      setErroAgendamento(null);
      return;
    }
    await agendar(barbeiro, horario);
  };

  useEffect(() => {
    if (!usuario?.adm) {
      filtrarHorarios(barbeiro);
      return;
    }
    if (barbeiro.horarios.length > 0) {
      setHorariosFiltrado([...barbeiro.horarios]);
      return;
    }
    setHorariosFiltrado([]);
  }, [expandedBarbeiroId, barbeiros]);

  useEffect(() => {
    const pegarAgendamentos = async () => {
      await pegarAgendamentosPelaData(barbeiro);
    };
    pegarAgendamentos();
  }, [dataSelecionada]);

  return (
    <>
      <div
        className={`horarios-barbeiro ${
          expandedBarbeiroId === barbeiro.id ? "expanded" : ""
        }`}
      >
        <ul className="lista-horarios">
          {usuario?.adm && (
            <li className="d-flex justify-content-center">
              <button
                className="btn-adicionar-horario"
                onClick={handleAdicionarHorario}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Adicionar Horário
              </button>
            </li>
          )}
          <Calendario />
          {horariosFiltrado < 1 ? (
            usuario?.adm ? (
              <li className="sem-horarios">
                <p>Nenhum horário cadastrado</p>
              </li>
            ) : (
              <li className="sem-horarios">
                <p>Nenhum horário disponível</p>
              </li>
            )
          ) : (
            horariosFiltrado.map((horario, index) => (
              <li key={index} className="horario-item">
                <div className="encapsula-btns">
                  <span className="horario-hora">{horario.hora}</span>
                  <button
                    className="btn-horario"
                    onClick={() => handleAgendamento(barbeiro, horario)}
                  >
                    <span>Agendar</span>
                  </button>
                  {usuario?.adm && (
                    <button className="btn-horario btn-almoco">
                      <span>Almoço</span>
                    </button>
                  )}
                </div>
                {usuario?.adm && (
                  <div className="botoes-bottom">
                    <button
                      className="btn-bottom editar"
                      onClick={() => handleUpdateHorario(horario)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a1.5 1.5 0 0 1 0 2.12L6.207 13.354l-4.243.707.707-4.243L11.966 1.94a1.5 1.5 0 0 1 2.122 0z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      className="btn-bottom excluir"
                      onClick={() => handleDeleteHorario(horario)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                        <path d="M3.5 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1H15a.5.5 0 0 1 0 1h-.5v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H2.5a.5.5 0 0 1 0-1H3.5zm1 1v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4H4.5z" />
                      </svg>
                      Excluir
                    </button>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
