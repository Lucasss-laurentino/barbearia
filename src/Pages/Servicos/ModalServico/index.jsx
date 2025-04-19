import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { servicoEditarSchema, servicoSchema } from "../../../validations/servicoValidation";
import { ServicoContext } from "../../../Context/ServicoContext";
import { MutatingDots } from "react-loader-spinner";

export const ModalServico = ({
  show,
  setShow,
  handleClose,
  servico = null,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(servico !== null ? servicoEditarSchema : servicoSchema),
  });

  const { criarServico, editarServico, loadCriarServico } =
    useContext(ServicoContext);

  const [imagem, setImagem] = useState();

  const formatCurrency = (event) => {
    const value = event.target.value
      .replace(/\D/g, "") 
      .replace(/(\d)(\d{8})$/, "$1.$2")
      .replace(/(\d)(\d{5})$/, "$1.$2") 
      .replace(/(\d)(\d{2})$/, "$1,$2") 
      .replace(/^\D+/g, "") 
      .replace(/(\d)(\d{3})(\d)/, "$1.$2$3") 
      .replace(/(\d)(\d{3})(\d)/, "$1.$2$3") 
      .replace(/(\d)(?=\d{3})$/, "$1,"); 

    event.target.value = `R$ ${value}`; 
  };

  const limparCampos = () => {
    setValue("NOME_SERVICO", "");
    setValue("PRAZO", "");
    setValue("PRECO", "");
    setValue("IMAGEM_SERVICO", "");
    handleClose();
  };

  useEffect(() => {
    if (servico) {
      setValue("NOME_SERVICO", servico.NOME_SERVICO);
      setValue("PRAZO", servico.PRAZO);
      setValue("PRECO", servico.PRECO);
      setValue("IMAGEM_SERVICO", imagem);
    }
  }, [servico, setValue]);

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
            {servico ? "Editar Serviço" : "Cadastre um serviço"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => {
              if (servico) {
                editarServico(data, imagem, setShow, servico, setImagem);
              } else {
                criarServico(data, imagem, setShow, setImagem);
              }
            })}
          >
            <div className="form-group my-2">
              <label>Nome do serviço</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="ex: Corte/Reflexo"
                {...register("NOME_SERVICO")}
              />
              {errors.NOME_SERVICO && (
                <p className="m-0 my-1 text-danger">
                  *{errors.NOME_SERVICO.message}
                </p>
              )}
            </div>
            <div className="form-group my-2">
              <label>Prazo de conclusão</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="ex: 1H/30min"
                {...register("PRAZO")}
              />
              {errors.PRAZO && (
                <p className="m-0 my-1 text-danger">*{errors.PRAZO.message}</p>
              )}
            </div>
            <div className="form-group my-2">
              <label>Preço</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="R$ 0,00"
                {...register("PRECO")}
                onChange={formatCurrency}
              />
              {errors.PRECO && (
                <p className="m-0 my-1 text-danger">*{errors.PRECO.message}</p>
              )}
            </div>
            <div className="form-group my-2">
              <label>Carregue uma imagem do serviço</label>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  {...register("IMAGEM_SERVICO")}
                  onChange={(e) => setImagem(e.target?.files[0])}
                />
                {errors.IMAGEM_SERVICO && (
                  <p className="m-0 my-1 text-danger">
                    *{errors.IMAGEM_SERVICO.message}
                  </p>
                )}
              </div>
            </div>
            {loadCriarServico ? (
              <MutatingDots
                visible={true}
                height="100"
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
                  {servico !== null ? "Editar" : "Cadastrar"}
              </button>
            )}
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
