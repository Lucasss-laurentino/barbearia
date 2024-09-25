import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { horariosSchema } from "../../validations/horariosValidation";
import { HorarioContext } from "../../Context/HorarioContext";
import { MutatingDots } from "react-loader-spinner";

export const ModalHorarios = ({ show, setShow, handleClose, barbeiro }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(horariosSchema),
  });

  const { criarHorario, loadHorarios } = useContext(HorarioContext);

  const handleTimeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = value.replace(/(\d{2})(\d{2})/, "$1:$2"); // Formata como HH:MM
    setValue("HORA", formattedValue.slice(0, 5));
  };

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
          <Modal.Title>{barbeiro?.NOME}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) =>
              criarHorario(data, barbeiro, setShow)
            )}
          >
            <div className="form-group my-2">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="ex: 09:00"
                {...register("HORA")}
                onChange={handleTimeChange}
              />
              {errors.HORA && (
                <p className="m-0 my-1 text-danger">*{errors.HORA.message}</p>
              )}
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
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
