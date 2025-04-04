import { useNavigate } from "react-router-dom";
import "./index.css";
import { Fragment } from 'react';

export const Planos = ({ planos }) => {

  const navigate = useNavigate();

  return (
    <>
      <section className="bg-light py-5 border-bottom">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Nossos Planos</h2>
            <p className="lead mb-0">#Opções para cada necessidade e momento</p>
          </div>
          <div className="row gx-5 justify-content-center">
            {planos.map((plano) => {
              return (
                <Fragment key={plano.ID}>
                  <div className="col-lg-6 col-xl-4">
                    <div className="card mb-5 mb-xl-0">
                      <div className="card-body p-5">
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
                              <strong>
                                Profissionais ilimitado
                              </strong>
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
                          <a
                            className="btn btn-primary btn-lg text-btn-responsive-planos"
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/login/${plano.ID}`, { state: { planos } })}
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#fff"
                              className="bi bi-rocket-takeoff-fill mx-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.6 3.6 0 0 0-.108-.563 2 2 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2 2 0 0 0-.16-.045 4 4 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.55 2.55 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361s.437 1.732-.36 2.531Z" />
                              <path d="M5.205 10.787a7.6 7.6 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925" />
                            </svg>
                            Teste Grátis por 15 dias
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
