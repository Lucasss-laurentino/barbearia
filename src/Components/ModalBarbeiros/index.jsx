import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { barbeiroEditarSchema, barbeiroSchema } from "../../validations/barbeiroValidation";
import { useContext, useEffect } from "react";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { MutatingDots } from "react-loader-spinner";

export const ModalBarbeiros = ({ show, setShow, handleClose, barbeiro = null }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
      resolver: yupResolver( barbeiro !== null ? barbeiroEditarSchema : barbeiroSchema),
  });

  const { criarBarbeiro, imagem, setImagem, loadBarbeiro, editarBarbeiro, limparCampos, barbeiros, barbeiroSelecionado } =
    useContext(BarbeiroContext);
  
  // Efeito para preencher os campos se for edição
  useEffect(() => {
    if (barbeiro) {
      setValue("NOME", barbeiro.NOME);
      setValue("IMAGEM", imagem);
    }
  }, [barbeiro, setValue]);

  useEffect(() => {
    barbeiroSelecionado === null && limparCampos(setValue, handleClose);
  }, [barbeiros, barbeiroSelecionado])

  useEffect(() => {
    console.log(barbeiro)
  }, [barbeiro])

  

  return (
    <>
      <Modal
        show={show}
        onHide={() => limparCampos(setValue, handleClose)}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {barbeiro !== null
              ? `Editar ${barbeiro.NOME}`
              : "Cadastre um Barbeiro"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => {
              if (!barbeiro) {
                criarBarbeiro(data, setShow);
              } else {
                editarBarbeiro(barbeiro, data, setShow);
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
              <button type="submit" className="btn btn-primary">
                {barbeiro !== null ? "Editar" : "Cadastrar"}
              </button>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => limparCampos(setValue, handleClose)}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
