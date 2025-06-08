import "./index.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MutatingDots } from "react-loader-spinner";

export const ModalExcluir = ({
  show,
  setShow,
  itemParaExclusao,
  nomeItemExclusao,
  funcExcluir,
}) => {

  const [loadExcluir, setLoadExcluir] = useState(false);

  const excluirEFecharModal = async () => {
    setLoadExcluir(true);
    var resposta = await funcExcluir();
    if (resposta) {
      setLoadExcluir(false);
      setShow(false);
    } else {
      setLoadExcluir(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
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
                  Deseja excluir esse {nomeItemExclusao} ?
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
              <Button variant="secondary" onClick={() => setShow(false)}>Não</Button>
              <Button variant="danger" onClick={() => excluirEFecharModal()}>Sim</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
