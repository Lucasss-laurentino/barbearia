import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { socket } from "../socket";
import { BarbeiroContext } from "./BarbeiroContext";
import { ServicoContext } from "./ServicoContext";
import { HorarioMarcadoContext } from "./HorarioMarcadoContext";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  // CONTEXTS IMPORTS
  const { barbeiros } = useContext(BarbeiroContext);
  const { servicos } = useContext(ServicoContext);

  // STATES
  const [horarios, setHorarios] = useState([]);
  const [limparHoraAposExclusao, setLimparHoraAposExclusao] = useState(false);
  const [usuarioTemHorarioMarcado, setUsuarioTemHorarioMarcado] =
    useState(false);
  const [errosHorarios, setErrosHorarios] = useState({
    erro: false,
    menssagem: "",
  });
  const [horariosAberto, setHorariosAberto] = useState({
    ABERTO: false,
    BARBEIRO_ID: 0,
  });
  const [loadHorarios, setLoadHorarios] = useState(false);
  const [iniciarConexaoSocket, setIniciarConexaoSocket] = useState(false);
  // ao renderizar ja é conectado ao servidor socket pois state está recebendo a função sendo executada "socket()"
  const [socketInstancia] = useState(socket());
  const [agendamento, setAgendamento] = useState({});
  const [showModalMarcarHorarioDeslogado, setShowModalMarcarHorarioDeslogado] =
    useState(false);

  // USE EFFECT

  // esse useEffect é reponsavel por iniciar a conexao web socket
  useEffect(() => {
    // iniciarConexaoSocket recebe true quando o usuario clica em agendar
    if (iniciarConexaoSocket) {
      // enviando agendamento pro processo "agendar"
      socketInstancia.emit("agendar", agendamento);
      // escutando o processo "agendamentoResultado"
      socketInstancia.on("agendamentoResultado", (agendamento) => {
        const agendamentoRetornado = agendamento.agendamento;

        // setar hora como indisponivel no array de objetos horarios
        const novoHorarios = horarios.filter((horaFilter) => {
          if (horaFilter.ID === agendamentoRetornado.HORARIO_ID) {
            horaFilter.DISPONIVEL = false;
          }
          return horaFilter;
        });
        // atualizando horarios
        setHorarios(novoHorarios);

        // gatilho pra mostrar horario marcado abaixo da lista de horario em listBarbeiros
        setUsuarioTemHorarioMarcado(true);

        const hora = horarios.find(
          (h) => h.ID === agendamentoRetornado.HORARIO_ID
        );
        const barbeiro = barbeiros.find(
          (b) => b.ID === agendamentoRetornado.BARBEIRO_ID
        );
        const servico = servicos.find(
          (s) => s.ID === agendamentoRetornado.SERVICO_ID
        );
        const agendamentoObj = {
          HORA: hora,
          BARBEIRO: barbeiro,
          RESERVADO: agendamentoRetornado.RESERVADO,
          SERVICO: servico,
        };

        // armazena informações e status do agendamento no localStorage
        localStorage.setItem("agendamento", JSON.stringify(agendamentoObj));

        setShowModalMarcarHorarioDeslogado(false);
      });
    }
  }, [iniciarConexaoSocket]);

  // FUNÇÕES

  const ordenarHorarios = async (horariosResponse) => {
    const horariosOrdenados = await horariosResponse.sort((a, b) => {
      return a.HORA.localeCompare(b.HORA);
    });
    setHorarios([...horariosOrdenados]);
  };

  const criarHorario = async (data, barbeiro, setShow, setValue) => {
    try {
      setLoadHorarios(true);
      const response = await http.post(
        "horario/criarHorario",
        { horario: data, barbeiro },
        { withCredentials: true }
      );
      if (!response) throw "Erro ao criar horario";
      const horariosResponse = [...horarios, response.data];
      ordenarHorarios(horariosResponse);
      setValue("HORA", "");
      setLoadHorarios(false);
      setShow(false);
    } catch (erro) {}
  };

  const pegarHorarios = async (barbearia) => {
    try {
      const response = await http.get(`horario/pegarHorarios/${barbearia}`);
      if (!response) throw "Erro ao buscar horarios";
      ordenarHorarios(response.data);
    } catch (erro) {}
  };

  const editarHorario = async (data, horario, setShow, setValue) => {
    try {
      setLoadHorarios(true);
      const response = await http.put(
        `horario/editarHorario/${horario.ID}`,
        data,
        {
          withCredentials: true,
        }
      );
      ordenarHorarios(response.data);
      setValue("HORA", "");
      setLoadHorarios(false);
      setShow(false);
    } catch (error) {}
  };

  const excluirHorario = async (horario, handleClose, setLoadExcluir) => {
    try {
      setLoadExcluir(true);
      const response = await http.delete(
        `horario/excluirHorario/${horario.ID}`,
        { withCredentials: true }
      );
      ordenarHorarios(response.data);
      setLimparHoraAposExclusao(true);
      setLoadExcluir(false);
      handleClose();
    } catch (error) {}
  };

  const agendar = async (data, horarioSelecionado, servicoEscolhido) => {
    try {
      const { NOME_CLIENTE } = data;
      const agendamentoObj = {
        NOME_CLIENTE,
        HORA: horarioSelecionado,
        SERVICO: servicoEscolhido,
        STATUS: 1, // 1 = reservado / 0 = nao reservado
      };
      setAgendamento(agendamentoObj);
      // essa mudança de estado ativa o useEffect que escuta esse estado
      setIniciarConexaoSocket(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HorarioContext.Provider
      value={{
        horarios,
        setHorarios,
        horariosAberto,
        setHorariosAberto,
        criarHorario,
        pegarHorarios,
        loadHorarios,
        setLoadHorarios,
        excluirHorario,
        editarHorario,
        limparHoraAposExclusao,
        setLimparHoraAposExclusao,
        errosHorarios,
        setErrosHorarios,
        ordenarHorarios,
        agendar,
        showModalMarcarHorarioDeslogado,
        setShowModalMarcarHorarioDeslogado,
        usuarioTemHorarioMarcado,
        setUsuarioTemHorarioMarcado,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
