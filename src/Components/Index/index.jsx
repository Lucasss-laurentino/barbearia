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
import { PageLogin } from "../PageLogin";
import { Finalizados } from "../Finalizados";
import { Configurações } from "../Configuracoes";

export const Index = () => {
  const { active, setActive } = useContext(AbaBottomContext);
  const { user, pegarUsuario, buscarBarbearia } = useContext(UserContext);
  const { pegarServicos, setServicoEscolhido } = useContext(ServicoContext);
  const { pegarBarbeiros } = useContext(BarbeiroContext);
  const { pegarHorarios, setHorarios } = useContext(HorarioContext);
  const { buscarHorariosAgendado, setHorariosMarcado } = useContext(
    HorarioMarcadoContext
  );
  const { barbearia } = useParams();

  useEffect(() => {
    setActive(2);
  }, []);

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
      <div className="body">
        {/* Navbar para dispositivos móveis (excluindo quando o usuário não estiver logado e active for 4) */}
        {user?.ID && (
          <div className="d-sm-none">
            <Navbar />
          </div>
        )}

        <Menu />

        {/* Condições para renderizar diferentes componentes com base no estado do usuário e 'active' */}
        {user?.ID ? (
          // Se o usuário estiver logado
          <>
            {/* Condições para usuários administradores */}
            {user.ADM ? (
              <>
                {active === 1 && <ListService />}
                {active === 2 && <Horarios />}
                {active === 3 && <ListBarbeiros />}
                {active === 4 && <Finalizados />}
              </>
            ) : (
              // Se o usuário não for administrador
              <>
                {active === 1 && <ListBarbeiros />}
                {active === 2 && <ListService />}
                {active === 4 && <Configurações />}
              </>
            )}
          </>
        ) : (
          // Se o usuário não estiver logado
          <>
            {active === 1 && <ListBarbeiros />}
            {active === 2 && <ListService />}
            {active === 4 && <PageLogin />}
          </>
        )}

        {/* MenuBottom para dispositivos móveis */}
        <div className="d-sm-none">
          <MenuBottom />
        </div>
      </div>
    </>
  );
};
