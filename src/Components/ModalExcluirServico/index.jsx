import './index.css';
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ServicoContext } from "../../Context/ServicoContext";
import { MutatingDots } from "react-loader-spinner";

export const ModalExcluirServico = ({ show, handleClose, servico }) => {
  const { excluirServico, loadCriarServico } = useContext(ServicoContext);

  const excluirEFecharModal = () => {
    excluirServico(servico);
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center">
                <h6 className="m-0">Deseja excluir esse serviço ?</h6>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loadCriarServico ? (
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
