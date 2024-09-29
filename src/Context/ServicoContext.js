import { createContext, useState } from "react";
import { http } from "../http";

export const ServicoContext = createContext();

export const ServicoProvider = ({ children }) => {
  const [servicos, setServicos] = useState([]);

  const [servicoEscolhido, setServicoEscolhido] = useState();
  const [loadCriarServico, setLoadCriarServico] = useState(false);

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

  const pegarServicos = async () => {
    try {
      setLoadCriarServico(true)
      const response = await http.get("servico/pegarServicos", {
        withCredentials: true,
      });
      setServicos([...response.data]);
      setLoadCriarServico(false);
    } catch (error) {}
  };

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
      }}
    >
      {children}
    </ServicoContext.Provider>
  );
};
