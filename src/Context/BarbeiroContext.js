import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { BarbeariaContext } from "./BarbeariaContext";

export const BarbeiroContext = createContext();

export const BarbeiroProvider = ({ children }) => {
  const [barbeiros, setBarbeiros] = useState([]);
  // const [barbeiro, setBarbeiro] = useState({});
  // const [imagem, setImagem] = useState();
  const [loadBarbeiro, setLoadBarbeiro] = useState(false);
  // const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null); // props pras modais
  // const [erroBarbeiro, setErroBarbeiro] = useState(null);
  // const [showModalPagamentoAgendamento, setShowModalPagamentoAgendamento] =
  //   useState(false);
  // const [showHorariosBarbeiro, setShowHorariosBarbeiro] = useState(false);
  // const [showModalEditar, setShowModalEditar] = useState(false);
  // const [showModalExcluir, setShowModalExcluir] = useState(false);
  // const [showModalCriarBarbeiro, setShowModalCriarBarbeiro] = useState(false);
  const { barbearia, setBarbearia } = useContext(BarbeariaContext);

  useEffect(() => {
    if (barbearia) {
      setBarbeiros(barbearia.barbeiros.$values);
    }
  }, [barbearia]);

  /* 
    Modal de exclusão serve pra excluir qualquer entidade, e eu tenho duas entidades no mesmo componente
    oque quer dizer que tanto excluir barbeiro ou excluir horario pode abrir esse modal
    entao esse componente identifica quem está abrindo o modal de exclusão pra passar as props certas.
  */
  // const [quemAcionouModalExcluir, setQuemAcionouModalExcluir] = useState(false); // 0 = barbeiro, 1 = horario

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

  // const pegarBarbeiros = async (barbearia) => {
  //   try {
  //     const response = await http.get(`barbeiro/pegarBarbeiros/${barbearia}`);
  //     if (!response) throw "Erro ao buscar barbeiros";
  //     setBarbeiros([...response.data.barbeiros]);
  //   } catch (erro) {}
  // };

  // const editarBarbeiro = async (barbeiro, data, setShow) => {
  //   try {
  //     setLoadBarbeiro(true);
  //     const formData = new FormData();
  //     formData.append("NOME", data.NOME);
  //     formData.append("IMAGEM", imagem);
  //     const response = await http.put(
  //       `barbeiro/editarBarbeiro/${barbeiro.ID}`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     setBarbeiros([...response.data]);
  //     setLoadBarbeiro(false);
  //     setShow(false);
  //     setImagem(undefined);
  //     setBarbeiroSelecionado(null);
  //   } catch (error) {}
  // };

  // const excluirBarbeiro = async (barbeiro, setLoadExcluir, setShow) => {
  //   try {
  //     setLoadExcluir(true);
  //     const response = await http.delete(
  //       `barbeiro/excluirBarbeiro/${barbeiro.ID}`,
  //       { withCredentials: true }
  //     );
  //     setBarbeiros([...response.data]);
  //     setLoadExcluir(false);
  //     setBarbeiroSelecionado(null);
  //     setShow(false);
  //   } catch (error) {}
  // };

  // const closeModalPagamentoAgendamento = () => {
  //   setShowModalPagamentoAgendamento(false);
  // };

  // const pegarBarbeiro = (idBarbeiro) => {
  //   const barbeiro = barbeiros.find((b) => b.ID === idBarbeiro);
  //   return barbeiro;
  // };

  // const handleCloseModalEditar = () => setShowModalEditar(false);

  // const handleCloseModalExcluir = () => setShowModalExcluir(false);

  // const handleShowModalBarbeiro = () => setShowModalCriarBarbeiro(true);

  return (
    <BarbeiroContext.Provider
      value={{
        barbeiros,
        setBarbeiros,
        criarBarbeiro,
        // imagem,
        // setImagem,
        // pegarBarbeiros,
        loadBarbeiro,
        setLoadBarbeiro,
        // editarBarbeiro,
        // excluirBarbeiro,
        // barbeiroSelecionado,
        // setBarbeiroSelecionado,
        // erroBarbeiro,
        // setErroBarbeiro,
        // showModalPagamentoAgendamento,
        // setShowModalPagamentoAgendamento,
        // closeModalPagamentoAgendamento,
        // showHorariosBarbeiro,
        // setShowHorariosBarbeiro,
        // barbeiro,
        // setBarbeiro,
        // showModalEditar,
        // setShowModalEditar,
        // handleCloseModalEditar,
        // showModalExcluir,
        // setShowModalExcluir,
        // handleCloseModalExcluir,
        // quemAcionouModalExcluir,
        // setQuemAcionouModalExcluir,
        // handleShowModalBarbeiro,
        // showModalCriarBarbeiro,
        // setShowModalCriarBarbeiro,
        // pegarBarbeiro,
      }}
    >
      {children}
    </BarbeiroContext.Provider>
  );
};
