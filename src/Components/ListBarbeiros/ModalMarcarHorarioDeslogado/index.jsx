import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { agendarDeslogadoSchema } from "../../../validations/agendarDeslogado";
import { http } from "../../../http";

export const ModalMarcarHorarioDeslogado = ({
  show,
  setShow,
  horarioSelecionado,
  servicoEscolhido
}) => {
  const handleClose = () => {
    setValue("NOME_CLIENTE", "");
    setShow(false);
  };

  const agendar = async (data) => {
    try {
      const { NOME_CLIENTE } = data;
      // preparando obj
      const agendamentoObje = {
        NOME_CLIENTE,
        HORA: horarioSelecionado.HORA,
        SERVICO: servicoEscolhido,
        STATUS: 1, // 0 = marcado, 1 = pendente e 2 = nao marcado
      };
      // enviando pro backend

      // antes de enviar preciso configurar um servidor web socket com um id unico 
      // e envialo pro backend, lá quando o administrador aceitar o agendamento
      // responderei pelo websocket pra conexao aberta que corresponde ao id unico desse usuario

      const response = await http.post("agendarDeslogado", { agendamentoObje });
      console.log(response);
      
      localStorage.setItem(
        "agendamento",
        JSON.stringify(agendamentoObje)
      );
    } catch (error) {}
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendarDeslogadoSchema),
  });

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
                <form onSubmit={handleSubmit(agendar)}>
                  <div className="form-group">
                    <label for="nomeCliente">Seu nome</label>
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
