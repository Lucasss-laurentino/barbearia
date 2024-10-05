import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalPagamentoAgendamento = ({
  show,
  handleClose,
  horarioSelecionado,
}) => {
  const [metodoPagamento, setMetodoPagamento] = useState();
  const handleChange = (event) => {
    console.log(event.target.value);
    setMetodoPagamento(event.target.value);
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
        <Modal.Header closeButton>
          <Modal.Title>{horarioSelecionado?.HORA}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={handleChange}
            value={metodoPagamento}
          >
            <option value="">Escolha um módo de pagamento</option>
            <option value="pix">Pix</option>
            <option value="cartao">Cartão</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
