import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { barbeiroSchema } from "../../validations/barbeiroValidation";
import { useContext } from "react";
import { BarbeiroContext } from "../../Context/BarbeiroContext";

export const ModalBarbeiros = ({ show, setShow, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(barbeiroSchema),
  });

  const { criarBarbeiro, imagem, setImagem } = useContext(BarbeiroContext);

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
          <Modal.Title>Cadastre um Barbeiro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => criarBarbeiro(data, setShow))}
          >
            <div className="form-group">
              <label for="exampleInputEmail1">Nome</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nome"
                {...register("NOME")}
              />
              {errors.NOME && (
                <p className="m-0 my-1 text-danger">*{errors.NOME.message}</p>
              )}
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Foto</label>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  {...register("IMAGEM")}
                  onChange={(e) => setImagem(e.target?.files[0])}
                />
                {errors.IMAGEM && (
                  <p className="m-0 my-1 text-danger">
                    *{errors.IMAGEM.message}
                  </p>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </form>
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
