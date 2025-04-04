import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { agendarDeslogadoSchema } from "../../../validations/agendarDeslogado";
import { useContext } from "react";
import { DataContext } from "../../../Context/DataContext";
import { SocketContext } from "../../../Context/SocketContext";

export const ModalMarcarHorarioDeslogado = ({
  show,
  setShow,
  horarioSelecionado,
  servicoEscolhido,
}) => {
  const handleClose = () => {
    setValue("NOME_CLIENTE", "");
    setShow(false);
  };

  const { agendarViaSocket } = useContext(SocketContext);
  const { data } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendarDeslogadoSchema),
  });

  const onSubmit = (dataParametro) => {
    agendarViaSocket(dataParametro, horarioSelecionado, servicoEscolhido, data);
  }
  
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
          <h5>Marcar horário: {horarioSelecionado?.HORA}</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="nomeCliente">Seu nome</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="nomeCliente"
                      aria-describedby="nomeCliente"
                      placeholder="Nome"
                      {...register("NOME_CLIENTE")}
                    />
                    {errors.NOME_CLIENTE && (
                      <p className="m-0 my-1 text-danger">
                        *{errors.NOME_CLIENTE.message}
                      </p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-sm btn-dark mt-2">
                    Agendar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
