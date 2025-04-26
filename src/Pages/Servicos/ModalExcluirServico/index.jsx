import { useContext, useState } from "react";
import "./index.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ServicoContext } from "../../../Context/ServicoContext";

export const ModalExcluirServico = ({show, handleClose, servico}) => {

    const { excluirServico } = useContext(ServicoContext);
    const [loadExcluir, setLoadExcluir] = useState(false);

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
                <h6 className="m-0">
                  Deseja excluir esse Serviço ?
                </h6>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Não</Button>
            <Button variant="danger" onClick={() => excluirServico(servico, setLoadExcluir)}>Sim</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
