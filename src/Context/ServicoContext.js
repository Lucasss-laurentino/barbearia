import { createContext, useState, useEffect, useContext } from "react";
import { BarbeariaContext } from "./BarbeariaContext";
import { http } from "../http";

export const ServicoContext = createContext();

export const ServicoProvider = ({ children }) => {
  // states
  const [servicos, setServicos] = useState([]);
  const [servicoEscolhido, setServicoEscolhido] = useState(null);
  const [escolhido, setEscolhido] = useState(false);
  const [loadServico, setLoadServico] = useState(false);

  // contexts
  const { barbearia, setBarbearia } = useContext(BarbeariaContext);

  useEffect(() => {
    if (barbearia && barbearia.servicos)
      setServicos(barbearia.servicos.$values);
  }, [barbearia?.servicos]);

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
      setBarbearia((prev) => ({
        ...prev,
        servicos: {
          ...prev.servicos,
          $values: [...prev.servicos.$values, response.data],
        },
      }));
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
    setBarbearia((prev) => {
      const novosServicos = prev.servicos.$values.map((s) =>
        s.id === servico.id ? servico : s
      );
      return {
        ...prev,
        servicos: {
          ...prev.servicos,
          $values: novosServicos,
        },
      };
    });
  };

  const excluirServico = async () => {
    try {
      await http.delete(`servico/${servicoEscolhido.id}`, {
        withCredentials: true,
      });

      await retirarServicoExcluido();
      setServicoEscolhido(null);
      return true;
    } catch (error) {
      setLoadServico(false);
      if (error.response?.data === "Token não encontrado!")
        window.location.href = "/login";
    }
  };

  const retirarServicoExcluido = async () => {
    setBarbearia((prev) => {
      const servicosAtt = prev.servicos.$values.filter(
        (s) => s.id !== servicoEscolhido.id
      );
      return {
        ...prev,
        servicos: {
          ...prev.servicos,
          $values: servicosAtt,
        },
      };
    });
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
