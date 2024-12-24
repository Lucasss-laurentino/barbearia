import { createContext, useState } from "react";
import { http } from "../http";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
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
  const [agendamento, setAgendamento] = useState({});
  const [showModalMarcarHorarioDeslogado, setShowModalMarcarHorarioDeslogado] =
    useState(false);

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
    } catch (erro) {
      setErrosHorarios({ erro: true, menssagem: erro?.response?.data });
      setTimeout(() => {
        setLoadHorarios(false);
      }, 4000);
    }
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

  const marcarAlmoco = async (horario) => {
    try {
      const result = await http.post("/horario/marcarAlmoco", horario, {
        withCredentials: true,
      });
      if (!result) throw "Erro ao marcar horário de almoço";

      setHorarios(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agendar = async (
    data,
    horarioSelecionado,
    servicoEscolhido,
    dataEscolhida,
    user = null
  ) => {
    try {
      const { NOME_CLIENTE } = data;

      let agendamentoObj;
      if (user !== null) {
        agendamentoObj = {
          NOME_CLIENTE,
          ID: user.ID,
          HORA: horarioSelecionado,
          SERVICO: servicoEscolhido,
          DATA: dataEscolhida,
          STATUS: 1, // 1 = reservado / 0 = nao reservado
        };
      } else {
        agendamentoObj = {
          NOME_CLIENTE,
          HORA: horarioSelecionado,
          SERVICO: servicoEscolhido,
          DATA: dataEscolhida,
          STATUS: 1, // 1 = reservado / 0 = nao reservado
        };
      }
      // agendamento é escutado em horarioMarcadoContext (trazer esse useEffect pra cá)
      setAgendamento(agendamentoObj); // ativa useEffect
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
        agendamento,
        showModalMarcarHorarioDeslogado,
        setShowModalMarcarHorarioDeslogado,
        usuarioTemHorarioMarcado,
        setUsuarioTemHorarioMarcado,
        marcarAlmoco,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
