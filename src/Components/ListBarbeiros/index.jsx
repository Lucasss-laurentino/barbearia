// BIBLIOTECA IMPORTS
import { useEffect, useState } from "react";
import { ModalBarbeiros } from "../ModalBarbeiros";
import "./index.css";
import { Fragment, useContext } from "react";
import { ModalHorarios } from "../ModalHorarios";
import { ModalExcluir } from "../ModalExcluir";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalPagamentoAgendamento } from "../ModalPagamentoAgendamento";
import { SpanAdd } from "../SpanAdd";
import { FotoEIcones } from "./FotoEIcones";
import { ListaHorarios } from "./ListaHorarios";
import { HoraMarcada } from "./HoraMarcada";

// CONTEXTS IMPORT
import { AnimacaoContext } from "../../Context/AnimacaoHorarios";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { UserContext } from "../../Context/UserContext";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";
import { Calendario } from "../Calendar";
import { ServicoContext } from "../../Context/ServicoContext";

// COMPONENTE
export const ListBarbeiros = () => {
  // STATES
  const [show, setShow] = useState(false);
  const [showHorarios, setShowHorarios] = useState(false);
  const [barbeiro, setBarbeiro] = useState({});
  const [showExcluirHorario, setExcluirHorario] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [showModalPagamentoAgendamento, setShowModalPagamentoAgendamento] =
    useState(false);
  const [classeCalendario, setClasseCalendario] = useState(
    "encapsula-calendario-hidden"
  );
  const [calendarioAberto, setCalendarioAberto] = useState(false);

  const [id, setId] = useState();
  const [horarioObjeto, setHorarioObjeto] = useState({});
  // HANDLES
  const handleCloseExcluirHorario = () => {
    setExcluirHorario(false);
    setHorarioSelecionado(null);
  };
  const handleClose = () => {
    setShow(false);
    setBarbeiroSelecionado(null);
  };
  const handleCloseHorario = () => {
    setShowHorarios(false);
    setHorarioSelecionado(null);
  };
  const handleShow = () => setShow(true);

  const closeModalPagamentoAgendamento = () =>
    setShowModalPagamentoAgendamento(false);

  // CONTEXTS
  const {
    barbeiros,
    barbeiroSelecionado,
    setBarbeiroSelecionado,
    erroBarbeiro,
    setErroBarbeiro,
  } = useContext(BarbeiroContext);
  const {
    setHorarioMarcado,
    horarioMarcado,
    desmarcarHorario,
    storage,
    setStorage,
  } = useContext(HorarioMarcadoContext);

  const {
    horarios,
    horariosAberto,
    setHorariosAberto,
    setUsuarioTemHorarioMarcado,
    errosHorarios,
    setErrosHorarios,
  } = useContext(HorarioContext);
  const { abrirListaHorarios } = useContext(AnimacaoContext);
  const { user } = useContext(UserContext);
  const { setServicoEscolhido } = useContext(ServicoContext);
  const { barbearia } = useParams();

  // USE EFFECTS
  useEffect(() => {
    if (!showExcluirHorario) setHorarioSelecionado(null);
  }, [showExcluirHorario]);

  useEffect(() => {
    if (errosHorarios?.erro) {
      toast.error(errosHorarios.menssagem, {
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

      setErrosHorarios({
        erro: false,
        menssagem: "",
      });
    }
  }, [errosHorarios]);

  useEffect(() => {
    setHorariosAberto(false);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("agendamento") &&
      localStorage.getItem("agendamento") !== "{}"
    ) {
      const storage = JSON.parse(localStorage.getItem("agendamento"));
      const horario = horarios.find((h) => h.ID === storage?.HORA?.ID);
      setHorarioMarcado(horario);
    }
  }, [horarios]);

  // verifica se o localStorage tem algum horario marcado
  useEffect(() => {
    if (
      localStorage.getItem("agendamento") &&
      localStorage.getItem("agendamento") !== "{}"
    ) {
      const obj = JSON.parse(localStorage.getItem("agendamento"));
      if (obj?.RESERVADO !== 0) {
        setUsuarioTemHorarioMarcado(true);
        setHorarioMarcado(obj.HORA);
      }
      setStorage(obj);
    } else if(localStorage.getItem("agendamento") === '{}') {
      setStorage({});
    } 
  }, [localStorage.getItem("agendamento")]);

  useEffect(() => {
    if (Object.keys(horarioObjeto).length > 0) {
      localStorage.setItem("agendamento", JSON.stringify(horarioObjeto));
      setStorage(horarioObjeto);
    }
  }, [horarioObjeto]);

  // tira a flag de horario aceito quando esse horario é finalizado pelo adm
  useEffect(() => {
    const socketInstancia = socket();
    socketInstancia.on(
      `confirmarFinalizacaoHorarioAgendado${barbearia}`,
      (horarioFinalizado) => {
        if (
          localStorage.getItem("agendamento") &&
          localStorage.getItem("agendamento") !== "{}"
        ) {
          const storage = JSON.parse(localStorage.getItem("agendamento"));
          if (storage.ID === horarioFinalizado.ID) {
            localStorage.setItem("agendamento", "{}");
            setStorage(null);
          }
        }
      }
    );
  }, []);

  // ativa toast de erro caso tente cadastrar um barbeiro que excede o permitido do plano de assinatura
  useEffect(() => {
    if (erroBarbeiro !== null) {
      toast.error(erroBarbeiro, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setErroBarbeiro(null);
    }
  }, [erroBarbeiro]);

  return (
    <>
      <ModalPagamentoAgendamento
        show={showModalPagamentoAgendamento}
        handleClose={closeModalPagamentoAgendamento}
        horarioSelecionado={horarioSelecionado}
      />
      <ModalHorarios
        show={showHorarios}
        setShow={setShowHorarios}
        handleClose={handleCloseHorario}
        barbeiro={barbeiro}
        horario={horarioSelecionado}
        setHorarioSelecionado={setHorarioSelecionado}
      />
      <ModalBarbeiros
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        barbeiro={barbeiroSelecionado}
      />
      <ModalExcluir
        show={showExcluirHorario}
        handleClose={handleCloseExcluirHorario}
        itemParaExclusao={
          (id === 2 && horarioSelecionado) || (id === 3 && barbeiroSelecionado)
        }
        idItemExclusao={id}
      />
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

      <Calendario
        classeCalendario={classeCalendario}
        setClassCalendario={setClasseCalendario}
        calendarioAberto={calendarioAberto}
        setClasseCalendario={setClasseCalendario}
      />

      {user.ADM && <SpanAdd handleShow={handleShow} barbeiros={barbeiros} />}
      <div className="fundo-imagem">
        <div className="cortina-transparente">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 d-flex justify-content-center align-items-center">
                <ul className="col-12 list-style heiht-scroll">
                  {barbeiros.map((barbeiro) => {
                    const horariosFiltrado = horarios.filter(
                      (h) => h.BARBEIRO_ID === barbeiro.ID
                    );
                    return (
                      <Fragment key={barbeiro.ID}>
                        <li className="py-1 border-list-services text-claro">
                          <FotoEIcones
                            barbeiro={barbeiro}
                            user={user}
                            setBarbeiroSelecionado={setBarbeiroSelecionado}
                            setExcluirHorario={setExcluirHorario}
                            setId={setId}
                            setShow={setShow}
                            abrirListaHorarios={abrirListaHorarios}
                            horariosAberto={horariosAberto}
                            setHorariosAberto={setHorariosAberto}
                          />
                          <div className="d-flex z-ind justify-content-center align-items-center flex-column">
                            <ListaHorarios
                              barbeiro={barbeiro}
                              user={user}
                              horariosFiltrado={horariosFiltrado}
                              setBarbeiro={setBarbeiro}
                              setShowHorarios={setShowHorarios}
                              setClasseCalendario={setClasseCalendario}
                              setHorarioSelecionado={setHorarioSelecionado}
                              horarioSelecionado={horarioSelecionado}
                              setExcluirHorario={setExcluirHorario}
                              setId={setId}
                              barbearia={barbearia}
                              setCalendarioAberto={setCalendarioAberto}
                            />
                            {storage !== null &&
                              storage?.BARBEIRO?.ID === barbeiro?.ID && (
                                <HoraMarcada
                                  horario={horarioObjeto}
                                  desmarcarHorario={desmarcarHorario}
                                />
                              )}
                          </div>
                        </li>
                      </Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
