import { createContext, useState } from "react";
import { http } from "../http";

export const BarbeiroContext = createContext();

export const BarbeiroProvider = ({ children }) => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [loadBarbeiro, setLoadBarbeiro] = useState(false);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);

  const criarBarbeiro = async (data, setShow) => {
    try {
      setLoadBarbeiro(true);
      const formData = formatarFormData(data);
      const response = await http.post("barbeiro", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoadBarbeiro(false);
      inserirBarbeiro(response.data);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const inserirBarbeiro = (barbeiroParametro) => {
    barbeiroParametro.horarios = [...barbeiroParametro.horarios.$values];
    barbeiroParametro.horarios.map((h) => {
      h.agendamentos = [...h.agendamentos.$values];
    });
    setBarbeiros([...barbeiros, barbeiroParametro])
  }

  const formatarFormData = (data) => {
    const formData = new FormData();
    formData.append("Nome", data.Nome);
    if (data.Imagem && data.Imagem.length > 0) {
      formData.append("Imagem", data.Imagem[0]);
    }
    return formData;
  };

  const editarBarbeiro = async (data, setShow) => {
    try {
      setLoadBarbeiro(true);
      const formData = formatarFormData(data);
      const response = await http.put(
        `barbeiro/${barbeiroSelecionado.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      substituirBarbeiroEditado(response.data);
      setLoadBarbeiro(false);
      setShow(false);
      setBarbeiroSelecionado(null);
    } catch (error) {
      setLoadBarbeiro(false);
      console.log(error);
    }
  };

  const substituirBarbeiroEditado = (barbeiro) => {
    const novosBarbeiros = barbeiros.map((b) => {
      if(b.id === barbeiro.id){
        return barbeiro
      }
      return b;
    });
    setBarbeiros([...novosBarbeiros]);
  };

  const excluirBarbeiro = async () => {
    try {
      setLoadBarbeiro(true);
      await http.delete(`barbeiro/${barbeiroSelecionado.id}`, {
        withCredentials: true,
      });
      retirarBarbeiroExcluido();
      setLoadBarbeiro(false);
      setBarbeiroSelecionado(null);
      return true;
    } catch (error) {
      setLoadBarbeiro(false);
      if (error.response?.data === "Token não encontrado!")
        window.location.href = "/login";
      return false;
    }
  };

  const retirarBarbeiroExcluido = () => {
    const novosBarbeiros = barbeiros.filter((b) => b.id !== barbeiroSelecionado.id);
    setBarbeiros(novosBarbeiros);
  };

  return (
    <BarbeiroContext.Provider
      value={{
        barbeiros,
        setBarbeiros,
        criarBarbeiro,
        loadBarbeiro,
        setLoadBarbeiro,
        barbeiroSelecionado,
        setBarbeiroSelecionado,
        editarBarbeiro,
        excluirBarbeiro,
      }}
    >
      {children}
    </BarbeiroContext.Provider>
  );
};
