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
import { Finalizados } from "../Finalizados";
import { Configurações } from "../Configuracoes";
import { EditarUser } from "../EditarUser";
import { Login } from "../Login";
import { EditarSenha } from "../EditarSenha";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const Index = () => {
  const { active, setActive } = useContext(AbaBottomContext);
  const { user, pegarUsuario } = useContext(UserContext);
  const { pegarServicos, setServicoEscolhido } = useContext(ServicoContext);
  const { pegarBarbeiros } = useContext(BarbeiroContext);
  const { pegarHorarios, setHorarios } = useContext(HorarioContext);
  const { buscarHorariosAgendado, setHorariosMarcado } = useContext(
    HorarioMarcadoContext
  );
  const { barbearia } = useParams();

  // nao lembro o motivo exato desse useEffect mas está comentado porque quando um usuario e direcionado pra pagina de edição sem está logado (recuperar senha) active é setado pra 5 e esse useEffect estava setando de volta pra 2
  // useEffect(() => {
  //   setActive(2);
  // }, []);

  useEffect(() => {
    const carregarDadosNecessario = async () => {
      await Promise.all([
        pegarHorarios(barbearia),
        buscarHorariosAgendado(barbearia),
        pegarUsuario(),
        pegarServicos(barbearia),
        pegarBarbeiros(barbearia),
      ]);
    };
    carregarDadosNecessario();
  }, [barbearia]);

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
        if (localStorage.getItem("agendamento") && localStorage.getItem("agendamento") !== "") {
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
        if (localStorage.getItem("agendamento") && localStorage.getItem("agendamento") !== "") {
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
        if (
          localStorage.getItem("agendamento") &&
          localStorage.getItem("agendamento") !== ""
        ) {
          const storage = JSON.parse(localStorage.getItem("agendamento"));
          if (storage.ID === horarioResponse.horarioRecusado.ID)
            localStorage.setItem("agendamento", '{"":""}');
          setServicoEscolhido();
        }
      }
    );
  }, []);

  // gravar em um localStorage o parametro barbearia pra quando um usuario editar a conta saber pra qual url envia-lo de volta
  useEffect(() => {
    if (barbearia) {
      localStorage.setItem("barbearia", barbearia);
    }
  }, []);

  useEffect(() => {
    const cookie = Cookies.get("token");
    if (cookie) {
      const jwt_decode = jwtDecode(cookie);
      const agora = new Date().getTime();
      if (jwt_decode.exp < agora) {
        // token valido
        setActive(5);
      } else {
        // token invalido (expirado)
        setActive(2);
      }
    } else {
      setActive(2);
    }
  }, []);

  return (
    <>
      <div className="body">
        {/* Navbar para dispositivos móveis (excluindo quando o usuário não estiver logado e active for 4) */}
        {!user.ID && active !== 4 && <Navbar />}
        {user.ID && <Navbar />}
        {user.ID && <Menu />}

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
                {active === 5 && <EditarUser user={user} />}
              </>
            ) : (
              // Se o usuário não for administrador
              <>
                {active === 1 && <ListBarbeiros />}
                {active === 2 && <ListService />}
                {active === 4 && <EditarUser user={user} />}
              </>
            )}
          </>
        ) : (
          // Se o usuário não estiver logado
          <>
            {active === 1 && <ListBarbeiros />}
            {active === 2 && <ListService />}
            {active === 4 && <Login />}
            {active === 5 && <EditarSenha />}
          </>
        )}

        {/* MenuBottom para dispositivos móveis */}

        <MenuBottom />
      </div>
    </>
  );
};
