import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { BarbeariaContext } from "./BarbeariaContext";
import { BarbeiroContext } from "./BarbeiroContext";
import { CalendarioContext } from "./CalendarioContext";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  // const { setBarbearia, barbearia } = useContext(BarbeariaContext);
  const { barbeiroSelecionado, barbeiros, setBarbeiros } =
    useContext(BarbeiroContext);

  const [loadHorario, setLoadHorario] = useState(false);
  const [loadHorarios, setLoadHorarios] = useState(false);
  const [errosHorarios, setErrosHorarios] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horarioOuBarbeiroPraExcluir, setHorarioOuBarbeiroPraExcluir] =
    useState(false); // false = barbeiro, true = horario
  const [horariosFiltrado, setHorariosFiltrado] = useState([]);

  const { dataSelecionada } = useContext(CalendarioContext);

  useEffect(() => {
    ordenaHorariosPelaHora();
  }, [barbeiros]);

  const criarHorario = async (data) => {
    try {
      setLoadHorarios(true);
      data.IdBarbeiro = barbeiroSelecionado.id;
      const response = await http.post("horario", data, {
        withCredentials: true,
      });
      atualizaHorariosBarbearia(response.data);
      setLoadHorarios(false);
    } catch (erro) {
      // setErrosHorarios({ erro: true, menssagem: erro?.response?.data });
      setLoadHorarios(false);
    }
  };

  const atualizaHorariosBarbearia = async (horario) => {
    const novosBarbeiros = barbeiros.map((b) => {
      if (b.id === horario.idBarbeiro) {
        b.horarios = [...b.horarios, horario];
        b.horarios.map((h) => {
          h.agendamentos = h.agendamentos?.$values
            ? [...h.agendamentos.$values]
            : [...h.agendamentos];
          return h;
        });
      }
      return b;
    });
    setBarbeiros(novosBarbeiros);
  };

  const editarHorario = async (data) => {
    data.IdBarbeiro = horarioSelecionado.idBarbeiro;
    try {
      const response = await http.put(
        `horario/${horarioSelecionado.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      setHorarioSelecionado(null);
      await substituirHorarioEditado(response.data);
      return true;
    } catch (error) {
      if (
        error.response.data.detail ===
        "Esse horário já existe pra esse barbeiro!"
      ) {
        setErrosHorarios("Esse horário já existe pra esse barbeiro!");
      }
      return false;
    }
  };

  const excluirHorario = async () => {
    try {
      await http.delete(`horario/${horarioSelecionado.id}`, {
        withCredentials: true,
      });
      retirarHorarioExcluido();
      setHorarioOuBarbeiroPraExcluir(false);
      setHorarioSelecionado(null);
    } catch (error) {
      console.log(error);
    }
  };

  const retirarHorarioExcluido = () => {
    const novosBarbeiros = barbeiros.map((b) => {
      if (b.id === horarioSelecionado.idBarbeiro) {
        const novosHorarios = b.horarios.filter(
          (h) => h.id !== horarioSelecionado.id
        );
        b.horarios = novosHorarios;
      }
      return b;
    });
    setBarbeiros(novosBarbeiros);
  };

  const substituirHorarioEditado = async (horarioAtualizado) => {
    // const novaBarbearia = structuredClone(barbearia);
    // novaBarbearia.barbeiros.$values.forEach((barbeiro) => {
    //   if (barbeiro.horarios && barbeiro.horarios.$values) {
    //     const index = barbeiro.horarios.$values.findIndex(
    //       (h) => h.id === horarioAtualizado.id
    //     );
    //     if (index !== -1) {
    //       barbeiro.horarios.$values[index] = horarioAtualizado;
    //     }
    //   }
    // });
    // setBarbearia(novaBarbearia);
  };

  const ehHoje = (data) => {
    const hoje = new Date();
    return (
      data.getDate() === hoje.getDate() &&
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    );
  };

  const ordenaHorariosPelaHora = () => {
    barbeiros.forEach((barbeiro) => {
      if (barbeiro.horarios?.length) {
        barbeiro.horarios.sort((a, b) => a.hora.localeCompare(b.hora));
      }
    });
  };

  const atualizarHorariosFiltrado = (barbeiro) => {
    const horaAtual = new Date();
    const horariosFuturo = barbeiro.horarios.filter((horario) => {
      const [hora, minuto, segundo] = horario.hora.split(":").map(Number);
      const horarioFormatado = new Date();
      horarioFormatado.setHours(hora, minuto, segundo || 0, 0);
      return horarioFormatado > horaAtual;
    });
    return horariosFuturo;
  };

  const filtrarPorAgendamento = (horariosFuturo) => {
    const dataSelecionadaFormatada =
      dataSelecionada.toLocaleDateString("pt-BR");
    const horariosSemAgendamento = horariosFuturo.filter((horario) => {
      const agendamentos = horario.agendamentos || [];
      const existeAgendamentoMesmaDataHora = agendamentos.some(
        (agendamento) => {
          const dataAgendamento = new Date(agendamento.data).toLocaleDateString(
            "pt-BR"
          );
          return (
            dataAgendamento === dataSelecionadaFormatada &&
            agendamento.hora === horario.hora
          );
        }
      );
      return !existeAgendamentoMesmaDataHora;
    });
    setHorariosFiltrado([...horariosSemAgendamento]);
  };

  const filtrarHorarios = (barbeiro) => {
    if (ehHoje(dataSelecionada)) {
      const horariosFuturo = atualizarHorariosFiltrado(barbeiro);
      ordenaHorariosPelaHora();
      filtrarPorAgendamento(horariosFuturo);
    } else {
      ordenaHorariosPelaHora();
      filtrarPorAgendamento(barbeiro.horarios);
    }
  };

  return (
    <HorarioContext.Provider
      value={{
        criarHorario,
        loadHorarios,
        setLoadHorarios,
        excluirHorario,
        editarHorario,
        loadHorario,
        setLoadHorario,
        horarioSelecionado,
        setHorarioSelecionado,
        horarioOuBarbeiroPraExcluir,
        setHorarioOuBarbeiroPraExcluir,
        errosHorarios,
        setErrosHorarios,
        atualizarHorariosFiltrado,
        horariosFiltrado,
        setHorariosFiltrado,
        ordenaHorariosPelaHora,
        filtrarHorarios,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
