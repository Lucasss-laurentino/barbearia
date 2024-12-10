import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createUserSchemaADM } from "../../../validations/createUserValidation";
import { useContext } from "react";
import { LoginContext } from "../../../Context/LoginContext";
import { MutatingDots } from "react-loader-spinner";

export const FormCadastro = () => {
  // CONFIGURANDO USER FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserSchemaADM),
  });

  // CONTEXT LOGIN
  const {
    confirmarEmail,
    loadLogin,
    cadastroError,
    setCadastroError,
    setControlerLoginECadastro,
  } = useContext(LoginContext);

  return (
    <>
      <form
        action=""
        className="col-12 formulario-page-login"
        onSubmit={handleSubmit(confirmarEmail)}
      >
        <div className="col-12 text-center">
          <h3 className="titulo-form-login my-4">Barba Cabelo & Bigode</h3>
          <h5 className="text-white">Criar Conta</h5>
          <p className="m-0 p-form-login">
            Comece agora a gerenciar sua barbearia de forma fácil e prática.
          </p>
          {/* EMAIL */}
          <div className="encapsula-span-input-login my-1">
            <div className="col-8 d-flex flex-column">
              <div className="col-12 d-flex justify-content-start align-items-center">
                <span className="span-login">Email</span>
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                <div className="input-icone">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="#fff"
                    className="bi bi-envelope-at-fill col-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                  </svg>
                  <input
                    type="email"
                    className="input-login col-10"
                    placeholder="Digite seu e-mail"
                    {...register("EMAIL")}
                  />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                {errors.EMAIL && (
                  <p className="m-0 my-1 text-danger bg-white">
                    *{errors.EMAIL.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* NOME BARBEARIA */}
          <div className="encapsula-span-input-login my-1">
            <div className="col-8 d-flex flex-column">
              <div className="col-12 d-flex justify-content-start align-items-center">
                <span className="span-login">Nome Barbearia</span>
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                <div className="input-icone">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="#fff"
                    className="bi bi-shop col-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                  </svg>
                  <input
                    type="text"
                    className="input-login col-10"
                    placeholder="Digite o nome da barbearia"
                    {...register("NOME_BARBEARIA")}
                  />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                {errors.NOME_BARBEARIA && (
                  <p className="m-0 my-1 text-danger bg-white">
                    *{errors.NOME_BARBEARIA.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* SENHA, BTN CADASTRAR E LINK PRA LOGIN */}
          <div className="encapsula-span-input-login my-1">
            <div className="col-8 d-flex flex-column">
              {/* SPAN E INPUT */}
              <div className="col-12 d-flex justify-content-start align-items-center">
                <span className="span-login">Senha</span>
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                <div className="input-icone">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="#fff"
                    className="bi bi-key-fill col-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                  <input
                    type="password"
                    className="input-login col-10"
                    placeholder="Digite sua senha"
                    {...register("SENHA")}
                  />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                {errors.SENHA && (
                  <p className="m-0 my-1 text-danger bg-white">
                    *{errors.SENHA.message}
                  </p>
                )}
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                {cadastroError !== null && (
                  <p className="m-0 my-1 text-danger bg-white">
                    *{cadastroError}
                  </p>
                )}
              </div>
              {/* BTN CADASTRAR */}
              {loadLogin ? (
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
              ) : (
                <div className="col-12 d-flex justify-content-start align-items-center my-3 flex-column">
                  <button className="col-12 btn-form-login" type="submit">
                    Cadastrar
                  </button>
                  {/* LINK P/ LOGIN */}
                  <p
                    className="m-0 col-12 text-center text-white my-3 cursor"
                    onClick={() => {
                      setCadastroError(null);
                      setControlerLoginECadastro(true);
                    }}
                  >
                    <strong>Já possui uma conta ?</strong> Faça Login
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
