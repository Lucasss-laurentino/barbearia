import "./index.css";
import { useState, Fragment } from "react";
import { Watch } from "react-loader-spinner";

export const ListService = () => {
  const [servicos, setServicos] = useState([
    {
      ID: 1,
      NOME: "Cabelo",
      PRAZO: "30/40 min.",
      PRECO: "R$ 20,00",
      IMG: "servicos/cabelo.jpeg",
    },
    {
      ID: 2,
      NOME: "Cabelo/Reflexo",
      PRAZO: "1h/1h:30 min",
      PRECO: "R$ 50,00",
      IMG: "servicos/reflexo.jpg",
    },
    {
      ID: 3,
      NOME: "Cabelo/barba",
      PRAZO: "40/50 min",
      PRECO: "R$ 35,00",
      IMG: "servicos/cabelo_barba.jpeg",
    },
    {
      ID: 4,
      NOME: "Cabelo/pigmentação",
      PRAZO: "40/50 min",
      PRECO: "R$ 30,00",
      IMG: "servicos/corte_pigmentacao.jpeg",
    },
    {
      ID: 5,
      NOME: "Pézinho",
      PRAZO: "10 min",
      PRECO: "R$ 10,00",
      IMG: "servicos/pezinho.jpeg",
    },
  ]);

  const [loaderEscolher, setLoaderEscolher] = useState(false);

  return (
    <>
      <div className="container-fluid bg-dark height-main">
        <div className="row">
          <div className="col-12 p-0">
            <ul className="m-0 p-0">
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
                            {loaderEscolher ? (
                              <div className="col-12 mx-3 mt-2">
                                <div className="col-3">
                                  <Watch
                                    visible={true}
                                    height="25"
                                    width="25"
                                    radius="48"
                                    color="#4fa94d"
                                    ariaLabel="watch-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                  />
                                </div>
                              </div>
                            ) : (
                              <a
                                href="#"
                                className="d-block m-0 mt-2 text-success"
                                onClick={() => setLoaderEscolher(true)}
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
