import { useContext, useEffect } from "react";
import { ListService } from "../ListServices";
import { Menu } from "../Menu";
import { MenuBottom } from "../MenuBottom";
import { Navbar } from "../Navbar";
import "./index.css";
import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { Horarios } from "../Horarios";
import { ListBarbeiros } from "../ListBarbeiros";
import { UserContext } from "../../Context/UserContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { useParams } from "react-router-dom";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { socket } from "../../socket";

export const Index = () => {
  const { active } = useContext(AbaBottomContext);
  const { user, pegarUsuario, buscarBarbearia } = useContext(UserContext);
  const { pegarServicos, setServicoEscolhido } = useContext(ServicoContext);
  const { pegarBarbeiros } = useContext(BarbeiroContext);
  const { pegarHorarios, setHorarios } = useContext(HorarioContext);
  const { buscarHorariosAgendado, setHorariosMarcado } = useContext(
    HorarioMarcadoContext
  );
  const { barbearia } = useParams();

  useEffect(() => {
    const carregarDadosNecessario = async () => {
      await Promise.all([
        buscarBarbearia(barbearia),
        pegarHorarios(barbearia),
        buscarHorariosAgendado(barbearia),
        pegarUsuario(),
        pegarServicos(barbearia),
        pegarBarbeiros(barbearia),
      ]);
    };
    carregarDadosNecessario();
  }, []);

  // eventos socket direcionado aos usuarios
  useEffect(() => {
    const socketInstancia = socket();
    socketInstancia.on(
      `agendamentoResultado${barbearia}`,
      async (agendamentoReturn) => {
        setHorarios(agendamentoReturn.horarios);
        // const { agendamento } = agendamentoReturn;
        setHorariosMarcado([...agendamentoReturn.horariosMarcado]);
      }
    );

    // recusa horario marcado, disponibilizando horario pra todos usuarios e tirando a pendencia do usuario que marcou o horario
    socketInstancia.on(
      `confirmarHorarioRecusadoUsuario${barbearia}`,
      (horarioParametro) => {
        const { horarios, horarioRecusado } = horarioParametro;
        setHorarios(horarios);
        if (localStorage.getItem("agendamento")) {
          const horarioAgendado = JSON.parse(
            localStorage.getItem("agendamento")
          );
          if (horarioAgendado?.ID === horarioRecusado?.ID) {
            localStorage.setItem("agendamento", "");
          }
        }
      }
    );

    // aceita horario pendente
    socketInstancia.on(
      `confirmarHorarioRecusadoUsuario${barbearia}`,
      (horarioParametro) => {
        console.log(horarioParametro);
        const { horarios, horarioNaoPendente } = horarioParametro;
        if (localStorage.getItem("agendamento")) {
          // se gerar algum bug pode ser por nao esta verificando o id do localStorage antes de setar
          // sendo assim acredito que essa função esteja setando todos localStorage de todos usuarios
          // preciso fazer esse teste..
          const storage = JSON.parse(localStorage.getItem("agendamento"));
          storage.RESERVADO = horarioNaoPendente.RESERVADO;
          localStorage.setItem("agendamento", JSON.stringify(storage));
        }
        setHorariosMarcado(horarioParametro.horariosMarcado);
        setHorarios(horarios);
      }
    );

    // confirma horario pendente cancelado
    socketInstancia.on(
      `confirmarCancelamentoHorarioPendente${barbearia}`,
      (horarioPendenteCancelado) => {
        setHorarios(horarioPendenteCancelado.horarios);
        setHorariosMarcado(horarioPendenteCancelado.horariosMarcado);
      }
    );

    // horario cancelado pelo usuario (depois de aceito)
    socketInstancia.on(
      `horarioMarcadoCancelado${barbearia}`,
      (horarioResponse) => {
        setHorariosMarcado(horarioResponse.horariosMarcado);
        setHorarios(horarioResponse.horarios);
      }
    );

    // horario cancelado pelo adm (depois de aceito)
    socketInstancia.on(
      `horarioMarcadoCanceladoAdm${barbearia}`,
      (horarioResponse) => {
        setHorariosMarcado(horarioResponse.horariosMarcado);
        setHorarios(horarioResponse.horarios);
        if (localStorage.getItem("agendamento")) {
          const storage = JSON.parse(localStorage.getItem("agendamento"));
          if (storage.ID === horarioResponse.horarioRecusado.ID)
            localStorage.setItem("agendamento", "");
          setServicoEscolhido();
        }
      }
    );
  }, []);

  return (
    <>
      {user?.ID ? (
        <div className="body">
          <div className="d-sm-none">
            <Navbar />
          </div>
          <Menu />
          {/* Se o usuario for adm */}
          {active === 1 && user.ADM && <ListService />}
          {active === 2 && user.ADM && <Horarios />}
          {active === 3 && user.ADM && <ListBarbeiros />}

          {/* Se o usuario não for adm */}
          {active === 1 && !user.ADM && <ListBarbeiros />}
          {active === 2 && !user.ADM && <ListService />}

          <div className="d-sm-none">
            <MenuBottom />
          </div>
        </div>
      ) : (
        <div className="body">
          <div className="d-sm-none">
            <Navbar />
          </div>
          <Menu />
          {active === 2 && <ListService />}
          {active === 1 && <ListBarbeiros />}
          <div className="d-sm-none">
            <MenuBottom />
          </div>
        </div>
      )}
    </>
  );
};
