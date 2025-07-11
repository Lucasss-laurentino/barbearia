import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { UserContext } from "./UserContext";
import { ServicoContext } from "./ServicoContext";
import { BarbeiroContext } from "./BarbeiroContext";
import { AgendamentoContext } from "./AgendamentoContext";

export const BarbeariaContext = createContext();

export const BarbeariaProvider = ({ children }) => {
  const [barbearia, setBarbearia] = useState();
  const [loadData, setLoadData] = useState(false);
  const { setUsuario, setCarregado } = useContext(UserContext);
  const { setServicos } = useContext(ServicoContext);
  const { setBarbeiros } = useContext(BarbeiroContext);
  const { setAgendamentos } = useContext(AgendamentoContext);

  const getBarbearia = async (barbeariaNome) => {
    try {
      setLoadData(true);
      const nome = { Nome: barbeariaNome };
      const resposta = await http.post(
        "barbearia/buscarBarbeariaPeloNome",
        nome,
        { withCredentials: true }
      );
      separarEntidadesBarbearia(resposta.data.barbearia);
      setUsuario(resposta.data.usuario);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.location.href = "/notFound";
      }
    } finally {
      setLoadData(false);
      setCarregado(true);
    }
  };

  const separarEntidadesBarbearia = (barbeariaParametro) => {
    const agendamentos = separarAgendamentos(barbeariaParametro);
    const barbeiros = separarBarbeiros(barbeariaParametro);
    const servicos = separarServicos(barbeariaParametro);
    const barbeariaFormatada = {
      id: barbeariaParametro.id,
      idUsuario: barbeariaParametro.idUsuario,
      logo: barbeariaParametro.logo,
      nome: barbeariaParametro.nome,
      agendamentos,
      barbeiros,
      servicos
    }
    setBarbearia(barbeariaFormatada);
  }

  const separarAgendamentos = (barbearia) => {
    const agendamentos = [...barbearia.agendamentos.$values];
    setAgendamentos(agendamentos);
    return agendamentos;
  }

  const separarBarbeiros = (barbearia) => {
    const barbeirosTemp = [...barbearia.barbeiros.$values];
    barbeirosTemp.map((barbeiroTemp) => {
      const horariosTemp = [...barbeiroTemp.horarios.$values];
      horariosTemp.map((horarioTemp) => {
        const agendamentosTemp = [...horarioTemp.agendamentos.$values];
        horarioTemp.agendamentos = agendamentosTemp;
      });
      barbeiroTemp.horarios = horariosTemp;
    });
    setBarbeiros(barbeirosTemp);
    return barbeirosTemp;
  }

  const separarServicos = (barbearia) => {
    const servicos = [...barbearia.servicos.$values];
    setServicos(servicos);
    return servicos;
  }

  return (
    <BarbeariaContext.Provider
      value={{ barbearia, setBarbearia, getBarbearia, loadData, setLoadData }}
    >
      {children}
    </BarbeariaContext.Provider>
  );
};
