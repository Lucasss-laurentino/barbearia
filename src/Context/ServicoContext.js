import { createContext, useState, useCallback, useEffect, useContext } from "react";
import { http } from "../http";
import { Bounce, toast } from "react-toastify";
import { BarbeariaContext } from "./BarbeariaContext";

export const ServicoContext = createContext();

export const ServicoProvider = ({ children }) => {

  // states
  const [servicos, setServicos] = useState([]);
  const [servicoEscolhido, setServicoEscolhido] = useState();
  const [loadCriarServico, setLoadCriarServico] = useState(false);
  const [servicoAgendado, setServicoAgendado] = useState({});
  const [showModalServico, setShowModalServico] = useState(false);
  const [showModalExcluirServico, setShowModalExcluirServico] = useState(false);
  const [editarServicoState, setEditarServicoState] = useState(null);
  const [servicoASerExcluido, setServicoASerExcluido] = useState();

  // contexts
  const { barbearia } = useContext(BarbeariaContext);

  useEffect(() => { 
    if(barbearia) pegarServicos(barbearia)
  }, [barbearia]);

  const criarServico = async (data, imagem, setShow, setImagem) => {
    try {
      setLoadCriarServico(true);
      const formData = new FormData();

      formData.append("NOME_SERVICO", data.NOME_SERVICO);
      formData.append("PRAZO", data.PRAZO);
      formData.append("PRECO", data.PRECO);
      formData.append("IMAGEM_SERVICO", imagem);

      const response = await http.post("servico/criarServico", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setServicos([...servicos, response.data]);
      setImagem(undefined)
      setLoadCriarServico(false);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const pegarServicos = async (barbearia) => {
    try {
      setLoadCriarServico(true)
      const response = await http.get(`servico/pegarServicos/${barbearia}`);
      setServicos([...response.data]);
      setLoadCriarServico(false);
    } catch (error) {
      console.log(error)
    }
  };

  const pegarServico = (idServico) => {
    const servico = servicos.find((s) => (s.ID === idServico));
    return servico;
  }

  const excluirServico = async (servico, setLoadExcluir) => {
    try {
      setLoadExcluir(true);
      const response = await http.delete(
        `servico/excluirServico/${servico.ID}`,
        { withCredentials: true }
      );
      setServicos([...response.data]);
      setLoadExcluir(false);
    } catch (error) {}
  };

  const editarServico = async (data, imagem, setShow, servico, setImagem) => {
    try {
      setLoadCriarServico(true);
      const formData = new FormData();

      formData.append("NOME_SERVICO", data.NOME_SERVICO);
      formData.append("PRAZO", data.PRAZO);
      formData.append("PRECO", data.PRECO);
      formData.append("IMAGEM_SERVICO", imagem);

      const response = await http.put(
        `servico/editarServico/${servico.ID}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setServicos([...response.data]);
      setLoadCriarServico(false);
      setImagem(undefined);
      setShow(false);
    } catch (error) {}
  };

  const verificarServicoEscolhido = (servico) => {
    if(!servicoEscolhido || Object.keys(servicoEscolhido).length < 1) {
      setServicoEscolhido({
        id: servico.ID,
        contratado: true,
      })
    } else if(servicoEscolhido) {
      if(servico.ID === servicoEscolhido.id) {
        setServicoEscolhido({})
      } else {
        setServicoEscolhido({
          id: servico.ID,
          contratado: true,
        })          
      }
    }
  }

  const gerarErroToast = () => {
    toast.error(
      "Escolha um serviço antes de agendar um horário !",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      }
    );
  }

  const handleCloseServico = useCallback(() => {
    setEditarServicoState(null);
    setShowModalServico(false);
  });

  const handleCloseExcluirServico = useCallback(() => {
    setShowModalExcluirServico(false);
  });

  return (
    <ServicoContext.Provider
      value={{
        servicos,
        setServicos,
        servicoEscolhido,
        setServicoEscolhido,
        criarServico,
        pegarServicos,
        excluirServico,
        editarServico,
        loadCriarServico,
        setLoadCriarServico,
        servicoAgendado,
        setServicoAgendado,
        showModalServico,
        setShowModalServico,
        showModalExcluirServico,
        setShowModalExcluirServico,
        editarServicoState,
        setEditarServicoState,
        handleCloseServico,
        handleCloseExcluirServico,
        servicoASerExcluido,
        setServicoASerExcluido,
        verificarServicoEscolhido,
        gerarErroToast,
        pegarServico,
      }}
    >
      {children}
    </ServicoContext.Provider>
  );
};
