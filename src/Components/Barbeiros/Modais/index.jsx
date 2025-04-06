import { useContext, useEffect, useState } from "react";
import { ModalBarbeiro } from "../../ModalBarbeiro";
import { ModalBarbeiroEditar } from "../../ModalBarbeiroEditar";
import { ModalExcluir } from "../../ModalExcluir";
import { BarbeiroContext } from "../../../Context/BarbeiroContext";
import { HorarioContext } from "../../../Context/HorarioContext";
import { ModalEditarHorarioBarbeiro } from "../ModalEditarHorarioBarbeiro";
import { ModalMarcarHorarioDeslogado } from "../ModalMarcarHorarioDeslogado";
import { ServicoContext } from "../../../Context/ServicoContext";

export const Modais = () => {
  const [propsModal, setPropsModal] = useState(null);

  const {
    barbeiroSelecionado,
    showModalEditar,
    setShowModalEditar,
    handleCloseModalEditar,
    showModalExcluir,
    setShowModalExcluir,
    excluirBarbeiro,
    quemAcionouModalExcluir,
    showModalCriarBarbeiro,
    setShowModalCriarBarbeiro,
  } = useContext(BarbeiroContext);

  const {
    horarioSelecionado,
    excluirHorario,
    showExcluirHorario,
    setExcluirHorario,
    showModalEditarHorarioBarbeiro,
    setShowModalEditarHorarioBarbeiro,
    setHorarioSelecionado,
    showModalMarcarHorarioDeslogado,
    setShowModalMarcarHorarioDeslogado
  } = useContext(HorarioContext);

  const { servicoEscolhido } = useContext(ServicoContext);

  useEffect(() => {
    if (quemAcionouModalExcluir === 0) {
      setPropsModal({
        show: showModalExcluir,
        setShow: setShowModalExcluir,
        itemParaExclusao: barbeiroSelecionado,
        nomeItemExclusao: "Barbeiro",
        funcExcluir: excluirBarbeiro,
      });
    }
    if (quemAcionouModalExcluir === 1) {
      setPropsModal({
        show: showExcluirHorario,
        setShow: setExcluirHorario,
        itemParaExclusao: horarioSelecionado,
        nomeItemExclusao: "Horário",
        funcExcluir: excluirHorario,
      });
    }
  }, [quemAcionouModalExcluir, showModalExcluir, showExcluirHorario]);
  
  return (
    <>
      <ModalBarbeiro
        show={showModalCriarBarbeiro}
        setShow={setShowModalCriarBarbeiro}
      />

      <ModalEditarHorarioBarbeiro
        show={showModalEditarHorarioBarbeiro}
        setShow={setShowModalEditarHorarioBarbeiro}
        barbeiro={barbeiroSelecionado}
        horario={horarioSelecionado}
        setHorarioSelecionado={setHorarioSelecionado}
      />

      <ModalBarbeiroEditar
        show={showModalEditar}
        setShow={setShowModalEditar}
        handleClose={handleCloseModalEditar}
        barbeiro={barbeiroSelecionado}
      />

      <ModalMarcarHorarioDeslogado
        show={showModalMarcarHorarioDeslogado}
        setShow={setShowModalMarcarHorarioDeslogado}
        horarioSelecionado={horarioSelecionado}
      />

      {propsModal !== null && (
        <ModalExcluir // essa modal é pra excluir qualquer entidade
          {...propsModal}
        />
      )}
    </>
  );
};
