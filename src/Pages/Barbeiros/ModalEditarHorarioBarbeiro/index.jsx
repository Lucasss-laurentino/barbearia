import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { horariosSchema } from "../../../validations/horariosValidation";
import { HorarioContext } from "../../../Context/HorarioContext";
import { MutatingDots } from "react-loader-spinner";
import { DataContext } from "../../../Context/DataContext";

export const ModalEditarHorarioBarbeiro = ({
  show,
  setShow,
  barbeiro,
  horario,
  setHorarioSelecionado,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(horariosSchema),
  });

  const {
    loadEditarHorarioBarbeiro,
    editarHorario,
    limparHoraAposExclusao,
    setLimparHoraAposExclusao,
  } = useContext(HorarioContext);

  const handleTimeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    const formattedValue = value.replace(/(\d{2})(\d{2})/, "$1:$2");
    setValue("HORA", formattedValue.slice(0, 5));
  };

  useEffect(() => {
    if (horario) {
      setValue("HORA", horario.HORA);
    }
  }, [horario, setValue]);

  useEffect(() => {
    if (!show) {
      setValue("HORA", "");
      setHorarioSelecionado(null);
    }
  }, [show]);

  // acionado quando um horario for excluido
  useEffect(() => {
    // limparHoraAposExclusao é setado em horarioContext.excluirHorario, é um gatilho pra limpar o campo HORA
    // modal de excluir nao tem acesso a setValue, por isso criei esse gatilho
    if (limparHoraAposExclusao) {
      setValue("HORA", "");
      setLimparHoraAposExclusao(false);
    }
  }, [limparHoraAposExclusao]);

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
          <Modal.Title>{barbeiro?.NOME}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => editarHorario(data, horario, setShow, setValue))}
          >
            <div className="form-group my-2">
              <label>Hora</label>
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
            {loadEditarHorarioBarbeiro ? (
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
                Editar
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
