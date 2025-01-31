import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AssinaturaContext } from "../../Context/AssinaturaContext";

export const ModalConfirmarMudarPlano = ({ show, handleClose, plano }) => {

    const { editarAssinatura } = useContext(AssinaturaContext);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{plano?.NOME}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <strong>Atenção!</strong> O plano será alterado e o valor da fatura será ajustado para ${plano?.PRECO}.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => editarAssinatura(plano)}>
                        Mudar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}