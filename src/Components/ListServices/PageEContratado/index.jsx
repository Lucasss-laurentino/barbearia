import { EditarExcluir } from "../EditarExcluir";

export const PageEContratado = ({
  user,
  servico,
  servicoEscolhido,
  servicoAgendado,
  setServicoEscolhido,
  setEditarServico,
  setShowModalServico,
  setServicoASerExcluido,
  setShowModalExcluirServico,
}) => {
  return (
    <>
      <div className="d-flex justify-content-end align-items-center col-4">
        <div className="col-9">
          <h6 className="m-0">{servico?.PRECO}</h6>
          {(servicoEscolhido?.contratado &&
            servicoEscolhido?.id === servico?.ID) ||
          servicoAgendado?.ID === servico.ID ? (
            <div className="container">
              <img
                src="icones_menu_bottom/verificado.gif"
                className="img-fluid mx-3"
                width="40%"
                alt=""
                onClick={() => setServicoEscolhido({})}
              />
            </div>
          ) : (
            <a
              href="#"
              className="d-block m-0 mt-2 text-success text-decoration-none"
              onClick={() =>
                setServicoEscolhido({
                  id: servico.ID,
                  contratado: true,
                })
              }
            >
              Escolher
            </a>
          )}
          {user.ADM && (
            <EditarExcluir
              servico={servico}
              setEditarServico={setEditarServico}
              setShowModalServico={setShowModalServico}
              setServicoASerExcluido={setServicoASerExcluido}
              setShowModalExcluirServico={setShowModalExcluirServico}
            />
          )}
        </div>
      </div>
    </>
  );
};
