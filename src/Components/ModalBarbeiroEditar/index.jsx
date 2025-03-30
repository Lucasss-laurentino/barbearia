import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { barbeiroEditarSchema, barbeiroSchema } from "../../validations/barbeiroValidation";
import { useContext, useEffect } from "react";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { MutatingDots } from "react-loader-spinner";

export const ModalBarbeiroEditar = ({ show, setShow, handleClose, barbeiro}) => {
 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
      resolver: yupResolver(barbeiroEditarSchema),
  });

  const { 
    imagem, 
    setImagem, 
    loadBarbeiro, 
    editarBarbeiro 
  } = useContext(BarbeiroContext);
  
  const limparCampos = () => {
    setValue("NOME", "");
    setValue("IMAGEM", "");
    handleClose();
    setImagem(undefined);
  };

  useEffect(() => {
    if (barbeiro && show) {
      setValue("NOME", barbeiro.NOME);
      setValue("IMAGEM", barbeiro.IMAGEM);
    }
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => limparCampos()}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Barbeiro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => editarBarbeiro(barbeiro, data, setShow, setImagem))}
          >
            <div className="form-group">
              <label>Nome</label>
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
              <label>Foto</label>
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
            {loadBarbeiro ? (
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
            ) : (
              <button type="submit" className="btn btn-primary">Editar</button>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => limparCampos()}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
