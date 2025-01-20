import "./index.css";
import { useContext, useEffect, useState } from "react";
import { PlanoContext } from "../../Context/PlanoContext";
import { UserContext } from "../../Context/UserContext";
import Cards from "react-credit-cards-2";
import { AssinaturaContext } from "../../Context/AssinaturaContext";

export const Assinatura = () => {
  const { planos, getPlanos, meuPlano, getMeuPlano } = useContext(PlanoContext);
  const { user } = useContext(UserContext);
  const { getAssinatura, assinatura, getParcelas, parcelas } =
    useContext(AssinaturaContext);

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  useEffect(() => {
    getPlanos();
    getMeuPlano(user);
    getAssinatura();
    getParcelas();
  }, []);

  useEffect(() => {
    if (assinatura) {
      setState({
        NUMERO_CARTAO: assinatura.PRIMEIROS_DIGITOS,
        expiry: assinatura.DATA_VENCIMENTO,
        cvc: "",
        NOME: assinatura.NOME,
        focus: "",
      });
    }
  }, [assinatura]);

  return (
    <>
      <div className="fundo-imagem">
        <div className="cortina-transparente">
          <div className="assinatura-cards pb-1 pt-xl-5">
            <div className="container-fluid">
              <h2 className="m-0 text-white">Planos:</h2>
            </div>
            <ul className="lista-planos-assinatura justify-content-xl-center">
              {planos.map((plano) => {
                return (
                  <li className="col-10 col-sm-4 col-xl-3 mx-1" key={plano.ID}>
                    <div className="card mb-3 mb-xl-0">
                      <div className="card-body p-3">
                        <div className="small text-uppercase fw-bold text-muted">
                          {plano.NOME}
                        </div>
                        <div className="mb-3">
                          <span className="display-4 fw-bold">
                            ${plano.PRECO}
                          </span>
                          <span className="text-muted">/ mês</span>
                        </div>
                        <ul className="list-unstyled mb-4">
                          <li className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#1f4e1f"
                              className="bi bi-check2-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                            {plano.PROFISSIONAIS > 5 ? (
                              <strong>Profissionais +</strong>
                            ) : (
                              <strong>
                                {plano.PROFISSIONAIS} Profissionais
                              </strong>
                            )}
                          </li>
                          <li className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#1f4e1f"
                              className="bi bi-check2-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                            <strong>Relatórios Financeiro</strong>
                          </li>
                          <li className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#1f4e1f"
                              className="bi bi-check2-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                            <strong>Sua página personalizada</strong>
                          </li>
                          <li className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#1f4e1f"
                              className="bi bi-check2-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                            <strong>Suporte Técnico</strong>
                          </li>
                          <li className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#1f4e1f"
                              className="bi bi-check2-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                            <strong>Agendamento</strong>
                          </li>
                        </ul>
                        <div className="d-grid">
                          {meuPlano &&
                          meuPlano.ID_PAGSEGURO !== plano.ID_PAGSEGURO ? (
                            <a
                              className="btn btn-primary btn-lg text-btn-responsive-planos"
                              href={`/login/${plano.ID}`}
                            >
                              Mudar Plano
                            </a>
                          ) : (
                            <a
                              className={
                                "btn btn-primary btn-lg bg-success border-success text-btn-responsive-planos"
                              }
                              href={`/login/${plano.ID}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#fff"
                                className="bi bi-check2-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                              </svg>
                              Assinado
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="container-fluid mb-3">
              <h2 className="m-0 text-white">Meio de Pagamento:</h2>
            </div>
            <div className="col-12 mt-sm-4 mb-4 col-md-6 d-flex justify-content-center align-items-center">
              <Cards
                number={state.NUMERO_CARTAO}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.NOME}
                focused={state.focus}
              />
            </div>
            <div className="container-fluid mb-3">
              <h2 className="m-0 text-white">Cancelamento:</h2>
            </div>
            <div className="col-12 mb-3">
              <div className="container">
                <button className="btn btn-sm btn-danger">
                  Cancelar Assinatura
                </button>
              </div>
            </div>
            <div className="container-fluid mb-3">
              <h2 className="m-0 text-white">Parcelas:</h2>
            </div>
            <div className="col-12 mb-4">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Vencimento</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelas.map((parcela) => {
                    return (
                      <>
                        <tr>
                          <td>{parcela?.vencimento}</td>
                          <td>{parcela?.valor}</td>
                          {parcela?.pago === "APPROVED" ? (
                            <td>
                              <img
                                src="icones_menu_bottom/verificado.gif"
                                className="img-fluid col-3 col-md-2 col-xl-1"
                                alt=""
                              />
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
