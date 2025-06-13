import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  barbeiroEditarSchema,
  barbeiroSchema,
} from "../../validations/barbeiroValidation";
import { useContext, useEffect, useState } from "react";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { MutatingDots } from "react-loader-spinner";

export const ModalBarbeiro = ({ show, setShow, barbeiro = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      barbeiro === null ? barbeiroSchema : barbeiroEditarSchema
    ),
  });

  const {
    criarBarbeiro,
    loadBarbeiro,
    setBarbeiroSelecionado,
    editarBarbeiro,
  } = useContext(BarbeiroContext);

  const [imagem, setImagem] = useState();

  const limparCampos = () => {
    reset({
      Nome: "",
      Imagem: "",
    });
    setImagem(undefined);
    setShow(false);
    setBarbeiroSelecionado(null);
  };

  useEffect(() => {
    if (barbeiro) {
      setValue("Nome", barbeiro.nome);
      setValue("Imagem", imagem);
    }
    if (!barbeiro) {
      setValue("Nome", "");
      setValue("Imagem", null);
    }
  }, [barbeiro, setValue, show]);

  useEffect(() => {
    if (!show) limparCampos();
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
            {barbeiro ? "Editar barbeiro" : "Cadastrar Barbeiro"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => {
              if (barbeiro) {
                editarBarbeiro(data, setShow);
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
          <Button variant="secondary" onClick={() => limparCampos()}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
