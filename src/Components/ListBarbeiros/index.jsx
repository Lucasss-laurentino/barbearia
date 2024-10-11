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
    pegarBarbeiros,
    barbeiros,
    barbeiroSelecionado,
    setBarbeiroSelecionado,
  } = useContext(BarbeiroContext);
  const [id, setId] = useState();
  const [setMarcarEsseHorario] = useState({ horario: null });

  const {
    setHorarioMarcado,
    usuarioTemHorarioMarcado,
    horarioMarcado,
    verificaAntesDeMarcar,
    desmarcarHorario,
  } = useContext(HorarioMarcadoContext);

  const {
    horarios,
    horariosAberto,
    setHorariosAberto,
    errosHorarios,
    setErrosHorarios,
  } = useContext(HorarioContext);

  const { abrirListaHorarios } = useContext(AnimacaoContext);

  const { user, setUserContrata } = useContext(UserContext);

  // USE EFECTS
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
    const horario = horarios.find((h) => h.DISPONIVEL === false);
    setHorarioMarcado(horario);
  }, [horarios]);

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

      {user.ADM && <SpanAdd handleShow={handleShow} />}
      <div className="container-fluid bg-dark height-main">
        <div className="row">
          <div className="col-12 p-0">
            <ul className={user.ADM ? "lista-barbeiros" : "lista-barbeiros-sem-margin-bottom"}>
              {barbeiros.map((barbeiro) => {
                const horariosFiltrado = horarios.filter(
                  (h) => h.BARBEIRO_ID === barbeiro.ID
                );
                return (
                  <Fragment key={barbeiro.ID}>
                    <li className="py-3 border-list-services text-claro">
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
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <ListaHorarios
                          barbeiro={barbeiro}
                          user={user}
                          horariosFiltrado={horariosFiltrado}
                          setBarbeiro={setBarbeiro}
                          setShowHorarios={setShowHorarios}
                          setHorarioSelecionado={setHorarioSelecionado}
                          setExcluirHorario={setExcluirHorario}
                          setId={setId}
                        />
                        {usuarioTemHorarioMarcado &&
                          horarioMarcado?.BARBEIRO_ID === barbeiro?.ID && (
                            <HoraMarcada
                              horarioMarcado={horarioMarcado}
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
    </>
  );
};
