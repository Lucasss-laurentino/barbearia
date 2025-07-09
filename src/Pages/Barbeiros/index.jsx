import { useContext, useEffect, useState } from "react";
import { SpanAdd } from "../../Components/SpanAdd";
import "./index.css";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { ModalBarbeiro } from "../../Components/ModalBarbeiro";
import { AcoesADM } from "./AcoesADM";
import { ExpandeHorarios } from "./ExpandeHorarios";
import { ModalExcluir } from "../../Components/ModalExcluir";
import { ModalCriarHorarioBarbeiro } from "../../Components/ModalCriarHorarioBarbeiro";
import { HorarioContext } from "../../Context/HorarioContext";
import { UserContext } from "../../Context/UserContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServicoContext } from "../../Context/ServicoContext";
import { AgendamentoContext } from "../../Context/AgendamentoContext";
import { AgendamentoFeedBack } from "../../Components/AgendamentoFeedBack";

export const Barbeiros = () => {
  const { barbeiros, barbeiroSelecionado, excluirBarbeiro } =
    useContext(BarbeiroContext);
  const { excluirHorario, horarioOuBarbeiroPraExcluir, horarioSelecionado } =
    useContext(HorarioContext);
  const { usuario } = useContext(UserContext);
  const { servicoEscolhido } = useContext(ServicoContext);
  const { erroAgendamento, setErroAgendamento } =
    useContext(AgendamentoContext);

  const [showModalCriarBarbeiro, setShowModalCriarBarbeiro] = useState(false);
  const [showModalDeletarBarbeiro, setShowModalDeletarBarbeiro] =
    useState(false);
  const [showModalCriarHorarioBarbeiro, setShowModalCriarHorarioBarbeiro] =
    useState(false);
  const [showModalDeletarHorario, setShowModalDeletarHorario] = useState(false);
  const [expandedBarbeiroId, setExpandedBarbeiroId] = useState(null);
  const toggleHorarios = (id) => {
    setExpandedBarbeiroId(expandedBarbeiroId === id ? null : id);
  };

  const hoje = new Date();

  useEffect(() => {
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
  }, [erroAgendamento]);

  return (
    <>
      <ModalBarbeiro
        show={showModalCriarBarbeiro}
        setShow={setShowModalCriarBarbeiro}
        barbeiro={barbeiroSelecionado}
      />

      <ModalExcluir
        show={
          horarioOuBarbeiroPraExcluir
            ? showModalDeletarHorario
            : showModalDeletarBarbeiro
        }
        setShow={
          horarioOuBarbeiroPraExcluir
            ? setShowModalDeletarHorario
            : setShowModalDeletarBarbeiro
        }
        nomeItemExclusao={horarioOuBarbeiroPraExcluir ? "Horário" : "Barbeiro"}
        funcExcluir={
          horarioOuBarbeiroPraExcluir ? excluirHorario : excluirBarbeiro
        }
      />

      <ModalCriarHorarioBarbeiro
        show={showModalCriarHorarioBarbeiro}
        setShow={setShowModalCriarHorarioBarbeiro}
        horario={horarioSelecionado}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={7000}
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

      <div className="pagina-barbeiros">
        <div className="barbeiros-container">
          <ul className="lista-barbeiros">
            {barbeiros.map((barbeiro) => (
              <li key={barbeiro.id} className="item-barbeiro">
                <div className="d-flex justify-content-around">
                  <img
                    src={`${process.env.REACT_APP_IMG_PATH_SERVER}/${barbeiro.caminhoImagem}`}
                    alt={barbeiro.nome}
                    className="imagem-barbeiro"
                  />
                  <div className="info-barbeiro">
                    {usuario?.adm && (
                      <AcoesADM
                        barbeiro={barbeiro}
                        setShow={setShowModalCriarBarbeiro}
                        setShowExcluir={setShowModalDeletarBarbeiro}
                      />
                    )}
                    <div className="d-flex justify-content-between align-items-start">
                      <h4 className="nome-barbeiro">{barbeiro.nome}</h4>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#000"
                          className="bi bi-clock-fill mx-1 cursor"
                          viewBox="0 0 16 16"
                          onClick={() => toggleHorarios(barbeiro.id)}
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                        </svg>
                        <p className="horarios-text">horários</p>
                      </div>
                    </div>
                  </div>
                </div>
                {expandedBarbeiroId === barbeiro.id && (
                  <ExpandeHorarios
                    expandedBarbeiroId={expandedBarbeiroId}
                    barbeiro={barbeiro}
                    setShow={setShowModalCriarHorarioBarbeiro}
                    setShowModalDeletarHorario={setShowModalDeletarHorario}
                  />
                )}
                <AgendamentoFeedBack barbeiro={barbeiro} />
              </li>
            ))}
          </ul>
          {usuario?.adm && (
            <SpanAdd
              setShow={setShowModalCriarBarbeiro}
              entity={barbeiros}
              text={"Cadastre um barbeiro aqui!"}
            />
          )}
        </div>
      </div>
    </>
  );
};
