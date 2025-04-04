import Modal from "react-bootstrap/Modal";

export const ModalHabilitarCobranca = ({ show, handleClose }) => {
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
          <h5>Pagamento antecipado</h5>
        </Modal.Header>
        <Modal.Body>
          <p className="m-0">
            Para Habilitar o pagamento antecipado, crie uma conta na Pagbank, cadastre uma chave Pix e insira essa chave no campo abaixo (O horário será agendado imediatamente após a confirmação do
            pagamento).
          </p>

          <hr />
          <div className="container">
            <span>
              Cadastre sua chave Pix <strong>(Mesma do Pagbank)</strong>
            </span>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <img src="/pix.png" className="img-fluid" alt="" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-primary">Habilitar</button>
          <button className="btn btn-sm btn-primary">Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
