import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { horariosSchema } from "../../validations/horariosValidation";
import { HorarioContext } from "../../Context/HorarioContext";
import { MutatingDots } from "react-loader-spinner";
import { BarbeiroContext } from "../../Context/BarbeiroContext";

export const ModalCriarHorarioBarbeiro = ({ show, setShow }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(horariosSchema),
  });

  const { loadHorarios, criarHorario } = useContext(HorarioContext);

  const { barbeiroSelecionado } = useContext(BarbeiroContext);

  const handleTimeChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }
    setValue("Hora", value);
  };

  const handleHorario = async (data) => {
    await criarHorario(data, barbeiroSelecionado, setShow);
    setValue("Hora", "")
  }

  useEffect(() => {
    if (!show) {
      setValue("Hora", "");
    }
  }, [show]);

  // useEffect(() => {
  //   if (limparHoraAposExclusao) {
  //     setValue("HORA", "");
  //     setLimparHoraAposExclusao(false);
  //   }
  // }, [limparHoraAposExclusao]);

  // const limparErroEFechar = () => {
  //   setErrosHorarios({ erro: false, menssagem: "" });
  //   handleClose();
  // }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{barbeiroSelecionado?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => handleHorario(data))}
          >
            <div className="form-group my-2">
              <label>Hora</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="ex: 09:00"
                {...register("Hora")}
                onChange={handleTimeChange}
              />
              {errors.Hora && (
                <p className="m-0 my-1 text-danger">*{errors.Hora.message}</p>
              )}
              {/* {errosHorarios.erro && <p className="m-0 my-1 text-danger">*{errosHorarios.menssagem}</p>} */}
            </div>
            {loadHorarios ? (
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
          <Button variant="secondary" onClick={() => setShow(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
