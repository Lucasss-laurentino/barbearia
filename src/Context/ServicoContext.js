import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { BarbeariaContext } from "./BarbeariaContext";
import { http } from "../http";
// import { http } from "../http";
// import { Bounce, toast } from "react-toastify";
// import { BarbeariaContext } from "./BarbeariaContext";

export const ServicoContext = createContext();

export const ServicoProvider = ({ children }) => {
  // states
  const [servicos, setServicos] = useState([]);
  const [servicoEscolhido, setServicoEscolhido] = useState(null);
  const [loadServico, setLoadServico] = useState(false);
  // const [servicoAgendado, setServicoAgendado] = useState({});
  // const [showModalServico, setShowModalServico] = useState(false);
  // const [showModalExcluirServico, setShowModalExcluirServico] = useState(false);
  // const [editarServicoState, setEditarServicoState] = useState(null);
  // const [servicoASerExcluido, setServicoASerExcluido] = useState();

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
    } catch (error) {
      setLoadServico(false);
      console.log(error);
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
    } catch (error) {
      setLoadServico(false);
      if(error.response?.data === 'Token não encontrado!') window.location.href = '/login';
    }
  };

  const substituirServicoEditado = (servico) => {
    setBarbearia((prev) => {
      const novosServicos = prev.servicos.$values.map((s) => s.id === servico.id ? servico : s);
      return {
        ...prev,
        servicos: {
          ...prev.servicos,
          $values: novosServicos
        }
      }
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
      }}
    >
      {children}
    </ServicoContext.Provider>
  );
};
