import "./index.css";
import { Fragment, useContext, useEffect } from "react";
import { ServicoContext } from "../../Context/ServicoContext";

export const ListService = () => {
  const { servicos, servicoEscolhido, setServicoEscolhido } =
    useContext(ServicoContext);

  
  useEffect(() => {
    console.log(servicoEscolhido)
  }, [servicoEscolhido])
  
  return (
    <>
      <div className="container-fluid bg-dark height-main">
        <div className="row">
          <div className="col-12 p-0">
            <ul className="m-0 p-0 list-servicos-tamanho">
              {servicos.map((servico) => {
                return (
                  <Fragment key={servico.ID}>
                    <li
                      className="py-3 border-list-services text-claro"
                      id={`item-servico-${servico.ID}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center col-8">
                          <div className="col-3 mx-3 border-radius-personalizada">
                            <img
                              className="img-fluid img-corte"
                              src={servico.IMG}
                              width="87%"
                            />
                          </div>
                          <div className="col-9">
                            <h6 className="m-0">{servico.NOME}</h6>
                            <p className="m-0">{servico.PRAZO}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center col-4">
                          <div className="col-9">
                            <h6 className="m-0">{servico.PRECO}</h6>
                            {servicoEscolhido?.contratado &&
                            servicoEscolhido?.id === servico.ID ? (
                                <div className="container">
                                  <img src="icones_menu_bottom/verificado.gif" className="img-fluid mx-3" width="40%" alt="" onClick={() => setServicoEscolhido({})} />
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
                          </div>
                        </div>
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
