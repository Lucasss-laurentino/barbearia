import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./index.css";
import Cards from "react-credit-cards-2";
import { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pagamentoSchema } from "../../validations/pagamento";
import { PagamentoContext } from "../../Context/PagamentoContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormPagamento = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pagamentoSchema),
  });

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name === "EXPIRA") setState((prev) => ({ ...prev, ["expiry"]: value }));
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNomeChange = (e) => {
    let inputValue = e.target.value;
    // Capitaliza a primeira letra e mantém as demais inalteradas
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    // Atualiza o valor no formulário
    setValue("NOME", inputValue);
  };

  const { pagamento, msgError, setMsgError } = useContext(PagamentoContext);

  useEffect(() => {
    if (msgError !== null) {
      toast.error(msgError, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setMsgError(null);
    }
  }, [msgError]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
        <div className="cortina-transparente d-flex align-items-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 d-md-flex">
                <div className="col-12 mt-sm-4 col-md-6 d-flex justify-content-center align-items-center">
                  <Cards
                    number={state.NUMERO_CARTAO}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.NOME}
                    focused={state.focus}
                  />
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center custom-encapsula-form-pg">
                  <form
                    action=""
                    className="col-12 formulario-page-pagamento adapt-this-page"
                    onSubmit={handleSubmit(pagamento)}
                  >
                    <div className="col-12 text-center responsive-div-encapsula-campos">
                      <h5 className="text-white pt-3">Pagamento</h5>
                      <p className="m-0 p-form-login">
                        Preencha os campos com os seus dados
                      </p>
                      {/* NOME */}
                      <div className="encapsula-span-input-login my-3">
                        <div className="col-8 d-flex flex-column">
                          {/* SPAN */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <span className="span-login">Nome do titular</span>
                          </div>
                          {/* ICONE E INPUT */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <div className="input-icone">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#fff"
                                className="bi bi-person-fill col-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                              </svg>
                              <input
                                type="text"
                                className="input-login col-10"
                                placeholder="Nome"
                                {...register("NOME")}
                                onChange={handleInputChange}
                                onInput={handleNomeChange}
                              />
                            </div>
                          </div>
                          {errors.NOME && (
                            <p className="m-0 my-1 text-danger bg-white">
                              *{errors.NOME.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* CPF */}
                      <div className="encapsula-span-input-login my-3">
                        <div className="col-8 d-flex flex-column">
                          {/* SPAN */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <span className="span-login">CPF</span>
                          </div>
                          {/* ICONE E INPUT */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <div className="input-icone">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="#fff"
                                className="bi bi-person-vcard col-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                              </svg>
                              <InputMask
                                mask="999.999.999-99"
                                type="text"
                                className="input-login col-10"
                                placeholder="Digite o seu cpf"
                                {...register("CPF")}
                              />
                            </div>
                          </div>
                          {errors.CPF && (
                            <p className="m-0 my-1 text-danger bg-white">
                              *{errors.CPF.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* CELULAR */}
                      <div className="encapsula-span-input-login my-3">
                        <div className="col-8 d-flex flex-column">
                          {/* SPAN */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <span className="span-login">Celular</span>
                          </div>
                          {/* ICONE E INPUT */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <div className="input-icone">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="#fff"
                                className="bi bi-phone col-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                              </svg>
                              <InputMask
                                mask="(99) 99999-9999"
                                type="text"
                                className="input-login col-10"
                                placeholder="Número de contato"
                                {...register("CELULAR")}
                              />
                            </div>
                          </div>
                          {errors.CELULAR && (
                            <p className="m-0 my-1 text-danger bg-white">
                              *{errors.CELULAR.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* NUMERO DO CARTÃO */}
                      <div className="encapsula-span-input-login my-3">
                        <div className="col-8 d-flex flex-column">
                          {/* SPAN */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <span className="span-login">Número do cartão</span>
                          </div>
                          {/* ICONE E INPUT */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <div className="input-icone">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="#fff"
                                className="bi bi-123 col-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                              </svg>
                              <InputMask
                                mask="9999 9999 9999 9999"
                                type="text"
                                className="input-login col-10"
                                placeholder="**** **** **** ****"
                                {...register("NUMERO_CARTAO")}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          {errors.NUMERO_CARTAO && (
                            <p className="m-0 my-1 text-danger bg-white">
                              *{errors.NUMERO_CARTAO.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* CVC */}
                      <div className="encapsula-span-input-login my-3">
                        <div className="col-8 d-flex flex-column">
                          {/* SPAN */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <span className="span-login">CVC</span>
                          </div>
                          {/* ICONE E INPUT */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <div className="input-icone">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#fff"
                                className="bi bi-credit-card-fill col-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
                              </svg>
                              <input
                                type="text"
                                className="input-login col-10"
                                placeholder="cvc"
                                {...register("CVC")}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          {errors.CVC && (
                            <p className="m-0 my-1 text-danger bg-white">
                              *{errors.CVC.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* EXPIRA */}
                      <div className="encapsula-span-input-login my-3">
                        <div className="col-8 d-flex flex-column">
                          {/* SPAN */}
                          <div className="col-12 d-flex justify-content-start align-items-center">
                            <span className="span-login">
                              Data de expiração
                            </span>
                          </div>
                          {/* ICONE E INPUT */}
                          <div className="col-12 d-flex justify-content-start align-items-center flex-column">
                            <div className="input-icone">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#fff"
                                className="bi bi-calendar-check col-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                              </svg>
                              <InputMask
                                mask="99/99"
                                className="input-login col-10"
                                placeholder="MM/AA"
                                {...register("EXPIRA")}
                                onChange={handleInputChange}
                                
                              />
                            </div>
                            {errors.EXPIRA && (
                              <p className="m-0 my-1 text-danger bg-white">
                                *{errors.EXPIRA.message}
                              </p>
                            )}
                          </div>
                          <div className="col-12 d-flex justify-content-start align-items-center my-3 pb-4 flex-column">
                            <button
                              className="col-12 btn-form-login"
                              type="submit"
                            >
                              Entrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
