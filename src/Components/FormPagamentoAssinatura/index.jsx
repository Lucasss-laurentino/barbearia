import { useContext, useEffect, useState } from "react";
import "./index.css";
import Cards from "react-credit-cards-2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pagamentoSchema } from "../../validations/pagamento";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { AssinaturaContext } from "../../Context/AssinaturaContext";
import { PlanoContext } from "../../Context/PlanoContext";

export const FormPagamentoAssinatura = () => {
  const { assinaturaLoader, criarAssinaturaPagBank, assinatura } = useContext(AssinaturaContext);
  const { meuPlano } = useContext(PlanoContext);
  const { barbearia } = useParams();

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(pagamentoSchema) });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "EXPIRA") setState((prev) => ({ ...prev, ["expiry"]: value }));
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNomeChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setValue("NOME", inputValue);
  };

  useEffect(() => {
    console.log(meuPlano);
  }, [])

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
        transition={Bounce}
      />
      <div className="fundo-imagem-pagamento">
        <div className="cortina-transparente-pagamento">
          <div className="scroll-form">
            <div className="plan-form">
              {/* CARD PLANO */}
              <div className="d-none d-md-flex col-5 justify-content-center align-items-center flex-column">
                <div className="small text-uppercase fw-bold text-muted">
                  {meuPlano.NOME}
                </div>
                <div className="mb-3">
                  <span className="display-4 fw-bold">{meuPlano.PRECO}</span>
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
                    {meuPlano.ID === 1 &&
                      <strong>2 Profissionais</strong>
                    }
                    {meuPlano.ID === 2 &&
                      <strong>4 Profissionais</strong>

                    }
                    {meuPlano.ID === 3 &&
                      <strong>Profissionais ilimitado</strong>

                    }
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
              </div>
              <div className="col-12 col-md-7 mt-2 d-flex justify-content-center align-items-center flex-column">
                <div className="credit-card-container">
                  <div className="credit-card">
                    <Cards
                      number={state.NUMERO_CARTAO}
                      expiry={state.expiry}
                      cvc={state.cvc}
                      name={state.NOME}
                      focused={state.focus}
                    />
                  </div>
                </div>
                <form
                  className="col-11 col-sm-11 p-4"
                  onSubmit={handleSubmit((data) =>
                    criarAssinaturaPagBank(data, barbearia)
                  )}
                >
                  <div className="form-group col-12 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nome (Mesmo do cartão)"
                      {...register("NOME")}
                      onChange={handleInputChange}
                      onInput={handleNomeChange}
                    />
                    {errors.NOME && (
                      <p className="m-0 my-1 text-danger bg-white">
                        *{errors.NOME.message}
                      </p>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <div className="form-group col-6 mx-1">
                      <InputMask
                        mask={"999.999.999-99"}
                        type="text"
                        className="form-control col-3"
                        placeholder="CPF"
                        {...register("CPF")}
                      />
                      {errors.CPF && (
                        <p className="m-0 my-1 text-danger bg-white">
                          *{errors.CPF?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group col-6">
                      <InputMask
                        mask="(99) 99999-9999"
                        type="text"
                        className="form-control col-3"
                        placeholder="Número de contato"
                        {...register("CELULAR")}
                      />
                      {errors.CELULAR && (
                        <p className="m-0 my-1 text-danger bg-white">
                          *{errors.CELULAR.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group col-12 mt-1">
                    <InputMask
                      mask="9999 9999 9999 9999"
                      type="text"
                      className="form-control col-3"
                      placeholder="Número do cartão"
                      {...register("NUMERO_CARTAO")}
                      onChange={handleInputChange}
                    />
                    {errors.NUMERO_CARTAO && (
                      <p className="m-0 my-1 text-danger bg-white">
                        *{errors.NUMERO_CARTAO.message}
                      </p>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <div className="form-group col-6 mx-1">
                      <input
                        type="text"
                        className="form-control col-3"
                        placeholder="CVC"
                        {...register("CVC")}
                        onChange={handleInputChange}
                      />
                      {errors.CVC && (
                        <p className="m-0 my-1 text-danger bg-white">
                          *{errors.CVC.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group col-6">
                      <InputMask
                        mask="99/99"
                        className="form-control col-3"
                        placeholder="Expiração MM/AA"
                        {...register("EXPIRA")}
                        onChange={handleInputChange}
                      />
                      {errors.EXPIRA && (
                        <p className="m-0 my-1 text-danger bg-white">
                          *{errors.EXPIRA.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {!assinaturaLoader ? (
                    <button
                      type="submit"
                      className="btn btn-primary my-2 col-12"
                    >
                      Assinar plano
                    </button>
                  ) : (
                    <MutatingDots
                      visible={true}
                      height="100"
                      width="100"
                      color="#6d6d6d"
                      secondaryColor="#6d6d6d"
                      radius="12.5"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass="justify-content-center my-2"
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
