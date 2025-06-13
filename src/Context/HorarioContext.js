import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
// import { socket } from "../socket";
// import { BarbeariaContext } from "./BarbeariaContext";
// import { BarbeiroContext } from "./BarbeiroContext";
// import {
//   retornaBarbeirosComHorariosFiltrado,
//   retornaHorariosDisponiveisPraAgendamento,
//   filtraHorariosPorHoraEminuto,
// } from "../Utils/filtrarHorarios";
// import { UserContext } from "./UserContext";

export const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  // states
  // const [horarios, setHorarios] = useState([]);
  // const [limparHoraAposExclusao, setLimparHoraAposExclusao] = useState(false);
  // const [errosHorarios, setErrosHorarios] = useState({
  //   erro: false,
  //   menssagem: "",
  // });
  // const [horariosAberto, setHorariosAberto] = useState({
  //   ABERTO: false,
  //   BARBEIRO_ID: 0,
  // });
  const [loadHorarios, setLoadHorarios] = useState(false);
  // const [loadEditarHorarioBarbeiro, setLoadEditarHorarioBarbeiro] =
  //   useState(false);
  // const [marcarAlmocoState, setMarcarAlmocoState] = useState({});
  // const [agendamento, setAgendamento] = useState({});
  // const [showModalMarcarHorarioDeslogado, setShowModalMarcarHorarioDeslogado] =
  //   useState(false);
  // const [showExcluirHorario, setExcluirHorario] = useState(false);
  // const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  // const [showModalEditarHorarioBarbeiro, setShowModalEditarHorarioBarbeiro] =
  //   useState(false);
  // const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  // // contexts
  // const { barbearia } = useContext(BarbeariaContext);
  // const { barbeiros } = useContext(BarbeiroContext);
  // const { user } = useContext(UserContext);

  // useEffect(() => {
  //   if (Object.keys(marcarAlmocoState).length > 0) {
  //     const socketInstancia = socket();
  //     socketInstancia.emit(`marcarAlmoco`, marcarAlmocoState);

  //     socketInstancia.on(`almocoMarcado${barbearia}`, async (result) => {
  //       setHorarios([...result]);
  //     });
  //   }
  // }, [marcarAlmocoState]);

  // useEffect(() => {
  //   if (barbearia) pegarHorarios();
  // }, [barbearia]);

  // const ordenarHorarios = async (horariosResponse) => {
  //   const horariosOrdenados = await horariosResponse.sort((a, b) => {
  //     return a.HORA.localeCompare(b.HORA);
  //   });
  //   setHorarios([...horariosOrdenados]);
  // };

  const criarHorario = async (data, barbeiro, setShow) => {
    try {
      setLoadHorarios(true);
      data.IdBarbeiro = barbeiro.id;
      const response = await http.post(
        "horario",
        { data },
        { withCredentials: true }
      );
      setLoadHorarios(false);
      setShow(false);
    } catch (erro) {
      // setErrosHorarios({ erro: true, menssagem: erro?.response?.data });
      setLoadHorarios(false);
    }
  };

  // const editarHorario = async (data, horario, setShow, setValue) => {
  //   try {
  //     setLoadEditarHorarioBarbeiro(true);
  //     const response = await http.put(
  //       `horario/editarHorario/${horario.ID}`,
  //       data,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     ordenarHorarios(response.data);
  //     setValue("HORA", "");
  //     setLoadEditarHorarioBarbeiro(false);
  //     setShow(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const excluirHorario = async (horario, setLoadExcluir) => {
  //   try {
  //     setLoadExcluir(true);
  //     const response = await http.delete(
  //       `horario/excluirHorario/${horario.ID}`,
  //       { withCredentials: true }
  //     );
  //     await ordenarHorarios(response.data);
  //     setLimparHoraAposExclusao(true);
  //     setLoadExcluir(false);
  //     handleCloseExcluirHorario();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <HorarioContext.Provider
      value={{
        // horarios,
        // setHorarios,
        // horariosAberto,
        // setHorariosAberto,
        criarHorario,
        // pegarHorarios,
        loadHorarios,
        setLoadHorarios,
        // excluirHorario,
        // editarHorario,
        // limparHoraAposExclusao,
        // setLimparHoraAposExclusao,
        // errosHorarios,
        // setErrosHorarios,
        // ordenarHorarios,
        // agendamento,
        // showModalMarcarHorarioDeslogado,
        // setShowModalMarcarHorarioDeslogado,
        // marcarAlmoco,
        // showExcluirHorario,
        // setExcluirHorario,
        // handleCloseExcluirHorario,
        // horarioSelecionado,
        // setHorarioSelecionado,
        // showModalEditarHorarioBarbeiro,
        // setShowModalEditarHorarioBarbeiro,
        // loadEditarHorarioBarbeiro,
        // setLoadEditarHorarioBarbeiro,
        // horariosDesseBarbeiro,
        // filtraHorariosPelaHora,
        // filtraHorariosDisponiveis,
        // pegarHorario,
        // setarHorariosDisponiveis,
        // horariosDisponiveis,
        // setHorariosDisponiveis,
        // validarEntradaDeHorarioPraCadastro,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};
