import { useForm } from "react-hook-form";
import "./index.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validations/loginValidation";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/LoginContext";
import { ServicoContext } from "../../../Context/ServicoContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Voltar } from "../Voltar";
import { TitulosETextos } from "./TitulosETextos";
import { MutatingDots } from "react-loader-spinner";
import { Input } from "../Input";
import { ErrosFormLogin } from "../ErrosFormLogin";

export const FormLogin = ({ barbearia, setFormAtivo }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    login,
    loadLogin,
    loginError,
    setLoginError,
  } = useContext(LoginContext);

  const { setServicoEscolhido } = useContext(ServicoContext);

  const [nome_limpo_barbearia, setNome_limpo_barbearia] = useState("");

  useEffect(() => { // limpa erros
    if (errors.EMAIL_LOGIN || errors.SENHA_LOGIN) {
      setLoginError(null);
    }
  }, [errors.EMAIL_LOGIN, errors.SENHA_LOGIN]);

  const verificarAntesDoLogin = (data) => {
    // usuarios nao pode fazer login tendo um horario agendado
    // caso contrario o usuario pode agendar um, fazer login e agendar outro.
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

  useEffect(() => { // limpa nome da barbearia (url) pra exibir no layout
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

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <form
              action=""
              className="col-12 formulario-page-login"
              onSubmit={handleSubmit((data) =>
                verificarAntesDoLogin(data)
              )}
            >
              <Voltar barbearia={barbearia} />
              <TitulosETextos barbearia={barbearia} nome_limpo_barbearia={nome_limpo_barbearia} />
              <Input
                register={register}
                errors={errors}
                span={"Email"}
                nomeInput={"EMAIL_LOGIN"}
                type={"email"}
                placeholder={"Digite seu e-mail"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="#3e3e46"
                    className="bi bi-envelope-at-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                  </svg>
                }
              />
              <Input
                register={register}
                errors={errors}
                span={"Senha"}
                nomeInput={"SENHA_LOGIN"}
                type={"password"}
                placeholder={"Digite sua senha"}
                icon={
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
                }
              />
              {loginError && <ErrosFormLogin error={loginError} />}
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
                <>
                  <button className="btn-form-login" type="submit">
                    Entrar
                  </button>
                  <p className="esqueci-senha" onClick={() => setFormAtivo(3)}>
                    Esqueci minha senha
                  </p>
                  <p className="texto-muda-formulario"
                    onClick={() => {
                      setLoginError(null);
                      setFormAtivo(2);
                    }}
                  >
                    <strong>Não possui uma conta ?</strong> Faça seu cadastro
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
