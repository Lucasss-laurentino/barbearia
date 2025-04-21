import "./index.css";
import { useContext } from "react";
import { ServicoContext } from "../../../Context/ServicoContext";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";
import { LocalStorageAgendamentoContext } from "../../../Context/LocalStorageAgendamentoContext";

export const PageEContratado = ({
  servico,
}) => {
  const { servicoEscolhido } = useContext(ServicoContext);
  const { horarioMarcado } = useContext(HorarioMarcadoContext);
  const { localStorageAgendamento } = useContext(
    LocalStorageAgendamentoContext
  );

  return (
    <>
      <div className="d-flex justify-content-end align-items-center col-3">
        <div className="col-9">
          <h6 className="m-0 nome-servico">{servico?.PRECO}</h6>
          {(horarioMarcado?.SERVICO_ID === servico?.ID && localStorageAgendamento?.ID === horarioMarcado.ID) |
          (servicoEscolhido?.id === servico?.ID) ? (
            <div className="container imagem-height">
              <img
                src="/icones_menu_bottom/verificado.gif"
                className="img-fluid mx-1 cursor"
                alt=""
              />
            </div>
          ) : (
            <a
              href="#"
              className="d-block m-0 mt-2 text-success text-decoration-none nome-servico"
            >
              Escolher
            </a>
          )}
        </div>
      </div>
    </>
  );
};
