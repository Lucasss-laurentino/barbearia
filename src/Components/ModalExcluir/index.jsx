import "./index.css";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ServicoContext } from "../../Context/ServicoContext";
import { MutatingDots } from "react-loader-spinner";
import { HorarioContext } from "../../Context/HorarioContext";
import { BarbeiroContext } from "../../Context/BarbeiroContext";

export const ModalExcluir = ({
  show,
  handleClose,
  itemParaExclusao,
  idItemExclusao /* idItemExclusao é um id unico pra diferenciar itemParaExclusao decidindo entao qual rumo a requisição deve tomar */,
}) => {
  const { excluirServico } = useContext(ServicoContext);
  const { excluirHorario } = useContext(HorarioContext);
  const { excluirBarbeiro, setBarbeiroSelecionado, barbeiroSelecionado } = useContext(BarbeiroContext);
  const [loadExcluir, setLoadExcluir] = useState(false);
  const excluirEFecharModal = () => {
    if (idItemExclusao === 1) {
      excluirServico(itemParaExclusao, setLoadExcluir);
      handleClose();
    }
    if (idItemExclusao === 2)
      excluirHorario(itemParaExclusao, handleClose, setLoadExcluir);
    if (idItemExclusao === 3)
      excluirBarbeiro(itemParaExclusao, handleClose, setLoadExcluir);
  };

  const reiniciarVariaveisEFecharModal = () => {
    handleClose();
    setBarbeiroSelecionado(null);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={reiniciarVariaveisEFecharModal}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center">
                <h6 className="m-0">
                  Deseja excluir esse{" "}
                  {(idItemExclusao === 1 && "Serviço") ||
                    (idItemExclusao === 2 && "Horario") ||
                    (idItemExclusao === 3 && "Barbeiro")}{" "}
                  ?
                </h6>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loadExcluir ? (
            <div className="h-loader-excluir-servico">
              <MutatingDots
                visible={true}
                height={"100"}
                width="100"
                color="#6d6d6d"
                secondaryColor="#6d6d6d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Não
              </Button>

              <Button variant="danger" onClick={() => excluirEFecharModal()}>
                Sim
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
