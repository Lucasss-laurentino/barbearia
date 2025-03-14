import { useForm } from "react-hook-form";
import "./index.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validations/loginValidation";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/LoginContext";
import { MutatingDots } from "react-loader-spinner";
import { ServicoContext } from "../../../Context/ServicoContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Voltar } from "../Voltar";

export const FormLogin = ({ barbearia, setFormAtivo }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const {
    login,
    loadLogin,
    loginError,
    setLoginError,
    setControlaLoginECadastro,
    setEsqueceuSenha,
  } = useContext(LoginContext);

  const { setServicoEscolhido } = useContext(ServicoContext);

  const [nome_limpo_barbearia, setNome_limpo_barbearia] = useState("");

  // LIMPA O PARAGRAFO DE ERRO SEMPRE QUE UM INPUT FOR MODIFICADO
  useEffect(() => {
    if (errors.EMAIL_LOGIN || errors.SENHA_LOGIN) {
      setLoginError(null);
    }
  }, [errors.EMAIL_LOGIN, errors.SENHA_LOGIN]);

  const verificarAntesDoLogin = (data) => {
    const storage = localStorage.getItem("agendamento");
    if (storage) {
      const obj = JSON.parse(storage);
      if (obj?.ID) {
        toast.error("Não é possivel fazer login com um horário agendado !", {
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
      } else {
        setServicoEscolhido(null);
        login(data, barbearia);
      }
    } else {
      setServicoEscolhido(null);
      login(data, barbearia);
    }
  };

  useEffect(() => {
    if (barbearia) {
      const cleanedString = barbearia
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setNome_limpo_barbearia(cleanedString);
    }
  }, [barbearia]);

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
      <form
        action=""
        className="col-12 formulario-page-login"
        onSubmit={handleSubmit((data) =>
          verificarAntesDoLogin(data)
        )}
      >
        <div className="col-12 text-center">
          <Voltar barbearia={barbearia}/>
          <h3 className="titulo-form-login my-4">
            {barbearia ? nome_limpo_barbearia : "Barba Cabelo & Bigode"}
          </h3>
          <h5 className="text-white">Acesse sua conta</h5>
          <p className="m-0 p-form-login">
            Gerencie sua barbearia de forma fácil e rápida
          </p>
          {/* EMAIL */}
          <div className="encapsula-span-input-login my-3">
            <div className="col-8 d-flex flex-column">
              {/* SPAN */}
              <div className="col-12 d-flex justify-content-start align-items-center">
                <span className="span-login">Email</span>
              </div>
              {/* ICONE E INPUT */}
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
                    {...register("EMAIL_LOGIN")}
                  />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-start align-items-center">
                {errors.EMAIL_LOGIN && (
                  <p className="m-0 my-1 text-danger bg-white">
                    *{errors.EMAIL_LOGIN.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* SENHA */}
          <div className="encapsula-span-input-login my-3">
            <div className="col-8 d-flex flex-column">
              {/* SPAN */}
              <div className="col-12 d-flex justify-content-start align-items-center">
                <span className="span-login">Senha</span>
              </div>
              {/* ICONE E INPUT */}
              <div className="col-12 d-flex justify-content-start align-items-center flex-column">
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
                    {...register("SENHA_LOGIN")}
                  />
                </div>
                <div className="col-12 d-flex justify-content-start align-items-center">
                  {errors.SENHA_LOGIN && (
                    <p className="m-0 my-1 text-danger bg-white">
                      *{errors.SENHA_LOGIN.message}
                    </p>
                  )}
                </div>
                <div className="col-12 d-flex justify-content-start align-items-center">
                  {loginError !== null && (
                    <p className="m-0 my-1 text-danger bg-white">
                      *{loginError}
                    </p>
                  )}
                </div>
              </div>
              {/* LINK PRA CADASTRO, BTN ENTRAR E ESQUECEU A SENHA */}
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
                  wrapperClass="justify-content-center"
                />
              ) : (
                <div className="col-12 d-flex justify-content-start align-items-center my-3 flex-column">
                  <button className="col-12 btn-form-login" type="submit">
                    Entrar
                  </button>
                  <p
                    className="m-0 col-12 text-center text-white my-3 p-esqueci-senha"
                    onClick={() => setFormAtivo(3)}
                  >
                    Esqueci minha senha
                  </p>
                  <p
                    className="m-0 col-12 text-center text-white cursor"
                    onClick={() => {
                      setLoginError(null);
                      setFormAtivo(2)
                    }}
                  >
                    <strong>Não possui uma conta ?</strong> Faça seu cadastro
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
