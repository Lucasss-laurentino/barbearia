import "./index.css";
import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  servicoEditarSchema,
  servicoSchema,
} from "../../../validations/servicoValidation";
import { ServicoContext } from "../../../Context/ServicoContext";
import { MutatingDots } from "react-loader-spinner";
import InputMask from "react-input-mask";

export const ModalServico = ({ show, setShow, servico = null }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      servico !== null ? servicoEditarSchema : servicoSchema
    ),
    defaultValues: {
      Prazo: "00:00:00",
    },
  });

  const { loadServico, criarServico } = useContext(ServicoContext);

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
    setValue("Nome", "");
    setValue("Prazo", "");
    setValue("Preco", "");
    setValue("Imagem", "");
    setShow(false);
  };

  useEffect(() => {
    if (servico) {
      setValue("Nome", servico.NOME_SERVICO);
      setValue("Prazo", servico.PRAZO);
      setValue("Preco", servico.PRECO);
      setValue("Imagem", imagem);
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
        className="modal-servico"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {servico ? "Editar Serviço" : "Cadastre um serviço"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            className="form-servico"
            onSubmit={handleSubmit((data) => {
              if (servico) {
                //editarServico(data, imagem, setShow, servico, setImagem);
              } else {
                criarServico(data, setShow);
              }
            })}
          >
            {/* Nome */}
            <div className="form-group my-2">
              <label>Nome do serviço</label>
              <input
                type="text"
                className="form-control input-servico"
                placeholder="ex: Corte/Reflexo"
                {...register("Nome")}
              />
              {errors.Nome && (
                <p className="m-0 my-1 text-danger">*{errors.Nome.message}</p>
              )}
            </div>
            {/* Prazo */}
            <div className="form-group my-2">
              <label>Prazo de conclusão</label>
              <InputMask
                mask="99:99:99"
                maskChar={null}
                alwaysShowMask
                {...register("Prazo", {
                  required: "Prazo é obrigatório",
                  pattern: {
                    value: /^\d{2}:\d{2}:\d{2}$/,
                    message: "Formato deve ser HH:mm:ss",
                  },
                })}
                defaultValue="00:00:00"
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    className="form-control input-servico"
                    placeholder="00:00:00"
                  />
                )}
              </InputMask>

              {errors.Prazo && (
                <p className="m-0 my-1 text-danger">*{errors.Prazo.message}</p>
              )}
            </div>
            {/* Preço */}
            <div className="form-group my-2">
              <label>Preço</label>
              <input
                type="text"
                className="form-control input-servico"
                placeholder="R$ 0,00"
                {...register("Preco")}
                onChange={formatCurrency}
              />
              {errors.Preco && (
                <p className="m-0 my-1 text-danger">*{errors.Preco.message}</p>
              )}
            </div>
            {/* Imagem */}
            <div className="form-group my-2">
              <label>Carregue uma imagem do serviço</label>
              <input
                className="form-control form-control-sm input-servico"
                type="file"
                {...register("Imagem")}
                onChange={(e) => setImagem(e.target?.files[0])}
              />
              {errors.IMAGEM_SERVICO && (
                <p className="m-0 my-1 text-danger">*{errors.Imagem.message}</p>
              )}
            </div>

            {loadServico ? (
              <div className="loader-wrapper">
                <MutatingDots
                  visible={true}
                  height="100"
                  width="100"
                  color="#6d6d6d"
                  secondaryColor="#6d6d6d"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                />
              </div>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                {servico !== null ? "Editar" : "Cadastrar"}
              </button>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
