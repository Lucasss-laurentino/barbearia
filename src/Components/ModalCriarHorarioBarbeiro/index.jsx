import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { horariosSchema } from "../../validations/horariosValidation";
import { HorarioContext } from "../../Context/HorarioContext";
import { MutatingDots } from "react-loader-spinner";
import { BarbeiroContext } from "../../Context/BarbeiroContext";

export const ModalCriarHorarioBarbeiro = ({
  show,
  setShow,
  horario = null,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(horariosSchema),
  });

  const { loadHorarios, criarHorario, editarHorario, setHorarioSelecionado, errosHorarios, setErrosHorarios } =
    useContext(HorarioContext);

  const { barbeiroSelecionado } = useContext(BarbeiroContext);

  const handleTimeChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }
    setValue("Hora", value);
    setErrosHorarios(null);
  };

  const handleHorario = async (data) => {
    if (horario === null) {
      await criarHorario(data, setShow);
    } else {
      const resposta = await editarHorario(data);
      if(!resposta) return;
    }
    setShow(false);
  };

  useEffect(() => {
    if (!show) {
      setValue("Hora", "");
      setHorarioSelecionado(null);
      setErrosHorarios(null);
    }
  }, [show]);

  useEffect(() => {
    if (horario) {
      setValue("Hora", horario.hora);
    }
    if (!horario) {
      setValue("Hora", "");
    }
  }, [horario, setValue, show]);

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
              {errosHorarios && <p className="m-0 my-1 text-danger">*{errosHorarios}</p>}
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
                {horario ? "Editar" : "Cadastrar"}
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