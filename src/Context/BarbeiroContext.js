import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { BarbeariaContext } from "./BarbeariaContext";

export const BarbeiroContext = createContext();

export const BarbeiroProvider = ({ children }) => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [loadBarbeiro, setLoadBarbeiro] = useState(false);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);
  const { barbearia, setBarbearia } = useContext(BarbeariaContext);

  useEffect(() => {
    if (barbearia) {
      setBarbeiros(barbearia.barbeiros.$values);
    }
  }, [barbearia]);

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
      setBarbearia((prev) => ({
        ...prev,
        barbeiros: {
          ...prev.barbeiros,
          $values: [...prev.barbeiros.$values, response.data],
        },
      }));
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

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
    setBarbearia((prev) => {
      const novosBarbeiros = prev.barbeiros.$values.map((b) =>
        b.id === barbeiro.id ? barbeiro : b
      );
      return {
        ...prev,
        barbeiros: {
          ...prev.barbeiros,
          $values: novosBarbeiros,
        },
      };
    });
  };

  const excluirBarbeiro = async () => {
    try {
      setLoadBarbeiro(true);
      const response = await http.delete(`barbeiro/${barbeiroSelecionado.id}`, {
        withCredentials: true,
      });
      await retirarBarbeiroExcluido(response.data);
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

  const retirarBarbeiroExcluido = async () => {
    setBarbearia((prev) => {
      const barbeiroAtt = prev.barbeiros.$values.filter(
        (s) => s.id !== barbeiroSelecionado.id
      );
      return {
        ...prev,
        barbeiros: {
          ...prev.barbeiros,
          $values: barbeiroAtt,
        },
      };
    });
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
