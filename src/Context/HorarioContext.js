import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { BarbeariaContext } from "./BarbeariaContext";
import { BarbeiroContext } from "./BarbeiroContext";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const { setBarbearia, barbearia } = useContext(BarbeariaContext);
  const { barbeiroSelecionado } = useContext(BarbeiroContext);

  const [loadHorario, setLoadHorario] = useState(false);
  const [loadHorarios, setLoadHorarios] = useState(false);
  const [errosHorarios, setErrosHorarios] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horarioOuBarbeiroPraExcluir, setHorarioOuBarbeiroPraExcluir] =
    useState(false); // false = barbeiro, true = horario
  const [horariosFiltrado, setHorariosFiltrado] = useState([]);

  useEffect(() => {
    ordenaHorariosPelaHora();
  }, [barbearia]);

  const criarHorario = async (data) => {
    try {
      setLoadHorarios(true);
      data.IdBarbeiro = barbeiroSelecionado.id;
      const response = await http.post("horario", data, {
        withCredentials: true,
      });
      await atualizaHorariosBarbearia(response);
      setLoadHorarios(false);
    } catch (erro) {
      // setErrosHorarios({ erro: true, menssagem: erro?.response?.data });
      setLoadHorarios(false);
    }
  };

  const atualizaHorariosBarbearia = async (response) => {
    setBarbearia((prev) => {
      const novaBarbearia = structuredClone(prev);
      const barbeiroIndex = barbearia.barbeiros.$values.findIndex(
        (b) => b.id === barbeiroSelecionado.id
      );
      if (barbeiroIndex !== -1) {
        novaBarbearia.barbeiros.$values[barbeiroIndex].horarios.$values.push(
          response.data
        );
      }
      return novaBarbearia;
    });
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
      await retirarHorarioExcluido();
      setHorarioOuBarbeiroPraExcluir(false);
      setHorarioSelecionado(null);
    } catch (error) {
      console.log(error);
    }
  };

  const retirarHorarioExcluido = async () => {
    const novaBarbearia = structuredClone(barbearia);
    novaBarbearia.barbeiros.$values.forEach((barbeiro) => {
      if (barbeiro.horarios && barbeiro.horarios.$values) {
        barbeiro.horarios.$values = barbeiro.horarios.$values.filter(
          (horario) => horario.id !== horarioSelecionado.id
        );
      }
    });
    setBarbearia(novaBarbearia);
  };

  const substituirHorarioEditado = async (horarioAtualizado) => {
    const novaBarbearia = structuredClone(barbearia);

    novaBarbearia.barbeiros.$values.forEach((barbeiro) => {
      if (barbeiro.horarios && barbeiro.horarios.$values) {
        const index = barbeiro.horarios.$values.findIndex(
          (h) => h.id === horarioAtualizado.id
        );

        if (index !== -1) {
          barbeiro.horarios.$values[index] = horarioAtualizado;
        }
      }
    });

    setBarbearia(novaBarbearia);
  };

  const ordenaHorariosPelaHora = () => {
    if (barbearia && barbearia.barbeiros?.$values) {
      barbearia.barbeiros.$values.forEach((barbeiro) => {
        if (barbeiro.horarios?.$values?.length) {
          barbeiro.horarios.$values.sort((a, b) =>
            a.hora.localeCompare(b.hora)
          );
        }
      });
    }
  };

  const atualizarHorariosFiltrado = (barbeiro) => {
    const horaAtual = new Date();
    const horariosFuturo = barbeiro.horarios.$values.filter((horario) => {
      const [hora, minuto, segundo] = horario.hora.split(":").map(Number);
      const horarioFormatado = new Date();
      horarioFormatado.setHours(hora, minuto, segundo || 0, 0);
      return horarioFormatado > horaAtual;
    });
    return horariosFuturo;
  };

  const filtrarPorAgendamento = (dataSelecionada, horariosFuturo) => {
    const dataSelecionadaFormatada = dataSelecionada
      .toISOString()
      .split("T")[0];
    const horariosSemAgendamento = horariosFuturo.filter((horario) => {
      const agendamentos = horario.agendamentos?.$values || [];

      const temAgendamentoMesmaData = agendamentos.some((agendamento) => {
        const dataAgendamento = new Date(agendamento.data)
          .toISOString()
          .split("T")[0];
        return dataAgendamento === dataSelecionadaFormatada;
      });

      return !temAgendamentoMesmaData;
    });
    setHorariosFiltrado([...horariosSemAgendamento]);
  };

  const filtrarHorarios = (barbeiro, dataSelecionada) => {
    const horariosFuturo = atualizarHorariosFiltrado(barbeiro);
    ordenaHorariosPelaHora();
    filtrarPorAgendamento(dataSelecionada, horariosFuturo);
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
