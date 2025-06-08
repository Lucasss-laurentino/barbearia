import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { barbeiroSchema } from "../../validations/barbeiroValidation";
import { useContext, useState } from "react";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { MutatingDots } from "react-loader-spinner";

export const ModalBarbeiro = ({ show, setShow, barbeiro = null}) => {
 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
      resolver: yupResolver(barbeiroSchema),
  });

  const {
    criarBarbeiro, 
    loadBarbeiro, 
  } = useContext(BarbeiroContext);
  
  const [imagem, setImagem] = useState(null);

  const limparCampos = () => {
    setValue("Nome", "");
    setValue("Imagem", "");
    setImagem(undefined);
    setShow(false);
  };

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
            Cadastre um Barbeiro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => {
              if (barbeiro) {
                
              } else {
                criarBarbeiro(data, setShow);
              }
            })}
          >
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nome"
                {...register("Nome")}
              />
              {errors.Nome && (
                <p className="m-0 my-1 text-danger">*{errors.Nome.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>Foto</label>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  {...register("Imagem")}
                  onChange={(e) => setImagem(e.target?.files[0])}
                />
                {errors.Imagem && (
                  <p className="m-0 my-1 text-danger">
                    *{errors.Imagem.message}
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
              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
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
