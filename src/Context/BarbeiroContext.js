import { createContext, useContext, useState } from "react";
import { http } from "../http";
import { UserContext } from "./UserContext";

export const BarbeiroContext = createContext();

export const BarbeiroProvider = ({ children }) => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [imagem, setImagem] = useState();
  const [loadBarbeiro, setLoadBarbeiro] = useState(false);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);
  const [erroBarbeiro, setErroBarbeiro] = useState(null);

  const criarBarbeiro = async (data, setShow) => {
    try {
      setLoadBarbeiro(true);
      const formData = new FormData();
      formData.append("NOME", data.NOME);
      formData.append("IMAGEM", imagem);
      const response = await http.post(`/barbeiro/criarBarbeiro`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setBarbeiros([...barbeiros, response.data.barbeiro]);
      setLoadBarbeiro(false);
      setBarbeiroSelecionado(null);
      setShow(false);
    } catch (error) {
      setErroBarbeiro(error?.response?.data);
      setLoadBarbeiro(false);
      setBarbeiroSelecionado(null);
      setShow(false);
    }
  };

  const pegarBarbeiros = async (barbearia) => {
    try {
      const response = await http.get(`barbeiro/pegarBarbeiros/${barbearia}`);
      if (!response) throw "Erro ao buscar barbeiros";
      setBarbeiros([...response.data.barbeiros]);
    } catch (erro) {}
  };

  const editarBarbeiro = async (barbeiro, data, setShow) => {
    try {
      setLoadBarbeiro(true);
      const formData = new FormData();
      formData.append("NOME", data.NOME);
      formData.append("IMAGEM", imagem);
      const response = await http.put(
        `barbeiro/editarBarbeiro/${barbeiro.ID}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBarbeiros([...response.data]);
      setLoadBarbeiro(false);
      setShow(false);
      setImagem(undefined);
    } catch (error) {}
  };

  const excluirBarbeiro = async (barbeiro, handleClose, setLoadExcluir) => {
    try {
      setLoadExcluir(true);
      const response = await http.delete(
        `barbeiro/excluirBarbeiro/${barbeiro.ID}`,
        { withCredentials: true }
      );
      setBarbeiros([...response.data]);
      setLoadExcluir(false);
      setBarbeiroSelecionado(null);
      handleClose();
    } catch (error) {}
  };

  const limparCampos = (setValue, handleClose) => {
    setValue("NOME", "");
    setValue("IMAGEM", "");
    handleClose();
    setImagem(undefined);
  };

  return (
    <BarbeiroContext.Provider
      value={{
        barbeiros,
        setBarbeiros,
        criarBarbeiro,
        imagem,
        setImagem,
        pegarBarbeiros,
        loadBarbeiro,
        setLoadBarbeiro,
        editarBarbeiro,
        excluirBarbeiro,
        barbeiroSelecionado,
        setBarbeiroSelecionado,
        limparCampos,
        erroBarbeiro,
        setErroBarbeiro,
      }}
    >
      {children}
    </BarbeiroContext.Provider>
  );
};
