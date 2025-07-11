import { createContext, useState } from "react";
import { http } from "../http";

export const ServicoContext = createContext();

export const ServicoProvider = ({ children }) => {
  // states
  const [servicos, setServicos] = useState([]);
  const [servicoEscolhido, setServicoEscolhido] = useState(null);
  const [escolhido, setEscolhido] = useState(false);
  const [loadServico, setLoadServico] = useState(false);

  const criarServico = async (data, setShow) => {
    try {
      setLoadServico(true);
      const formData = formatarFormData(data);
      const response = await http.post("servico", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoadServico(false);
      setServicos([...servicos, response.data]);
      setShow(false);
      setServicoEscolhido(null);
    } catch (error) {
      setLoadServico(false);
    }
  };

  const formatarFormData = (data) => {
    const formData = new FormData();
    formData.append("Nome", data.Nome);
    formData.append("Prazo", data.Prazo);
    const precoLimpo = parseFloat(
      data.Preco.replace(/[R$\s]/g, "").replace(",", ".")
    );
    formData.append("Preco", precoLimpo.toString());
    if (data.Imagem && data.Imagem.length > 0) {
      formData.append("Imagem", data.Imagem[0]);
    }
    return formData;
  };

  const editarServico = async (data, setShow) => {
    try {
      setLoadServico(true);
      const formData = formatarFormData(data);
      const response = await http.put(
        `servico/${servicoEscolhido.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      substituirServicoEditado(response.data);
      setLoadServico(false);
      setShow(false);
      setServicoEscolhido(null);
    } catch (error) {
      setLoadServico(false);
      if (error.response?.data === "Token não encontrado!")
        window.location.href = "/login";
    }
  };

  const substituirServicoEditado = (servico) => {
    const novosServicos = servicos.map((s) => {
      if (s.id === servico.id) {
        return servico;
      }
      return s;
    });
    setServicos([...novosServicos]);
  };

  const excluirServico = async () => {
    try {
      await http.delete(`servico/${servicoEscolhido.id}`, {
        withCredentials: true,
      });

      retirarServicoExcluido();
      setServicoEscolhido(null);
      return true;
    } catch (error) {
      setLoadServico(false);
      if (error.response?.data === "Token não encontrado!")
        window.location.href = "/login";
    }
  };

  const retirarServicoExcluido = () => {
    const novosServicos = servicos.filter((s) => s.id !== servicoEscolhido.id);
    setServicos(novosServicos);
  };

  return (
    <ServicoContext.Provider
      value={{
        servicos,
        setServicos,
        loadServico,
        setLoadServico,
        servicoEscolhido,
        setServicoEscolhido,
        criarServico,
        editarServico,
        excluirServico,
        escolhido,
        setEscolhido,
      }}
    >
      {children}
    </ServicoContext.Provider>
  );
};
