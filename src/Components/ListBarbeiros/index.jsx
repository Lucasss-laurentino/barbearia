// BIBLIOTECA IMPORTS
import { useEffect, useState } from "react";
import "./index.css";
import { Fragment, useContext } from "react";
import { ModalHorarioBarbeiro } from "./ModalHorarioBarbeiro";
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
import { Calendario } from "../Calendar";
import { ModalBarbeiro } from "./ModalBarbeiro";
import { SocketContext } from "../../Context/SocketContext";

export const ListBarbeiros = () => {

  const [classeCalendario, setClasseCalendario] = useState(
    "encapsula-calendario-hidden"
  );
  const [calendarioAberto, setCalendarioAberto] = useState(false);

  const [id, setId] = useState();
  const [horarioObjeto, setHorarioObjeto] = useState({});

  // CONTEXTS
  const {
    barbeiros,
    barbeiroSelecionado,
    erroBarbeiro,
    setErroBarbeiro,
    pegarBarbeiros,
    showModalPagamentoAgendamento,
    closeModalPagamentoAgendamento,
    showHorariosBarbeiro,
    setShowHorariosBarbeiro,
    handleCloseHorarioBarbeiro,
    horarioSelecionado,
    setHorarioSelecionado,
    barbeiro,
    setBarbeiro,
    showModalBarbeiro, 
    setShowModalBarbeiro,
    handleCloseModalBarbeiro,
    showExcluirHorario, 
    setExcluirHorario,
    handleCloseExcluirHorario,
    handleShowModalBarbeiro,
  } = useContext(BarbeiroContext);
  
  const {
    setHorarioMarcado,
    buscarHorariosAgendado
  } = useContext(HorarioMarcadoContext);

  const {
    horarios,
    horariosAberto,
    setHorariosAberto,
    errosHorarios,
    setErrosHorarios,
    pegarHorarios
  } = useContext(HorarioContext);
  
  const { abrirListaHorarios } = useContext(AnimacaoContext);
  const { storage, setStorage } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { barbearia } = useParams();

  // USE EFFECTS
  useEffect(() => {
    if (!showExcluirHorario) setHorarioSelecionado(null);
  }, [showExcluirHorario]);

  useEffect(() => {
    setHorariosAberto(false);
    pegarBarbeiros(barbearia);
    pegarHorarios(barbearia);
    buscarHorariosAgendado(barbearia);
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
        setHorarioMarcado(obj.HORA);
      }
      setStorage(obj);
    } else if (localStorage.getItem("agendamento") === "{}") {
      setStorage({});
    }
  }, [localStorage.getItem("agendamento")]);

  useEffect(() => {
    if (Object.keys(horarioObjeto).length > 0) {
      localStorage.setItem("agendamento", JSON.stringify(horarioObjeto));
      setStorage(horarioObjeto);
    }
  }, [horarioObjeto]);

  // toast erros
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
  }, [erroBarbeiro, errosHorarios]);

  return (
    <>
      <ModalPagamentoAgendamento
        show={showModalPagamentoAgendamento}
        handleClose={closeModalPagamentoAgendamento}
        horarioSelecionado={horarioSelecionado}
      />
      <ModalHorarioBarbeiro
        show={showHorariosBarbeiro}
        setShow={setShowHorariosBarbeiro}
        handleClose={handleCloseHorarioBarbeiro}
        barbeiro={barbeiro}
        horario={horarioSelecionado}
        setHorarioSelecionado={setHorarioSelecionado}
      />

      <ModalBarbeiro
        show={showModalBarbeiro}
        setShow={setShowModalBarbeiro}
        handleClose={handleCloseModalBarbeiro}
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

      {user?.ADM && <SpanAdd handleShow={handleShowModalBarbeiro} barbeiros={barbeiros} />}

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 d-flex justify-content-center align-items-center p-0">
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
                        setId={setId}
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
                          setShowHorarios={setShowHorariosBarbeiro}
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
    </>
  );
};
