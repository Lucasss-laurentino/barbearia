import { useContext, useEffect, useState } from "react";
import { ImgLogo } from "../ImgLogo";
import "./index.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "../../validations/createUserValidation";
import { LoginContext } from "../../Context/LoginContext";
import { loginSchema } from "../../validations/loginValidation";
import { UserContext } from "../../Context/UserContext";
import { MutatingDots } from "react-loader-spinner";
import { MenuBottom } from "../MenuBottom";
import { AbaBottomContext } from "../../Context/AbaBottomContext";

export const PageLogin = () => {
  const [hiddenLogin, setHiddenLogin] = useState("div-login");
  const [showLogin, setShowLogin] = useState("form-login-escondido");
  const [showCadastro, setShowCadastro] = useState("form-login-escondido");

  // contexts
  const { criarUsuario, login, loadLogin, loginError } =
    useContext(LoginContext);
  const { active, setActive } = useContext(AbaBottomContext);
  const { user, pegarUsuario } = useContext(UserContext);
  const [formAberto, setFormAberto] = useState(0);
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formAberto === 1 ? createUserSchema : loginSchema),
  });

  useEffect(() => {
    setActive(4);
  }, [])

  return (
    <>
      <div className="tela-toda-fundo-preto-show position-relative d-sm-flex">
        <ImgLogo />
        {/* BTN LOGIN, CADASTRO E ICONS SOCIAL */}
        <div className={hiddenLogin + " d-flex align-items-center mt-5"}>
          <div className="d-flex flex-column align-self-center col-12">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <button
                className="btn-login"
                onClick={() => {
                  setHiddenLogin("div-login-hidden");
                  setTimeout(() => {
                    setHiddenLogin("d-none");
                    setShowLogin("form-login-show");
                  }, 351);
                  setFormAberto(2);
                }}
              >
                Entrar
              </button>
              <button
                className="btn-login mt-4"
                onClick={() => {
                  setHiddenLogin("div-login-hidden");
                  setTimeout(() => {
                    setHiddenLogin("d-none");
                    setShowCadastro("form-login-show");
                  }, 351);
                  setFormAberto(1);
                }}
              >
                Cadastrar
              </button>
            </div>
            {/* ICONS SOCIAL */}
            <div className="d-flex justify-content-center align-items-center mt-3 pt-3">
              <ul className="lista-icon-social col-12">
                <li className="col-1 mx-2">
                  <img
                    src="socialIcons/facebook.png"
                    alt=""
                    className="img-fluid"
                    width="100%"
                  />
                </li>
                <li className="col-2 mx-1">
                  <img src="socialIcons/instagramIcon.png" alt="" width="70%" />
                </li>
                <li className="col-1 mx-2">
                  <img src="socialIcons/whatsapp.png" alt="" width="100%" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* FORM LOGIN */}
        <div className={showLogin + " mt-sm-5 pt-sm-5"}>
          <div className="container-fluid pt-sm-5 mt-sm-5">
            <div className="row height-row">
              <div className="col-12 d-flex justify-content-center align-items-center pb-5 mb-5 flex-column">
                <form className="col-10" onSubmit={handleSubmit(login)}>
                  <div className="form-group">
                    <label className="text-white">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      {...register("EMAIL_LOGIN")}
                    />
                    {errors.EMAIL_LOGIN && (
                      <p className="m-0 my-1 text-white">
                        *{errors.EMAIL_LOGIN.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-white">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Email"
                      {...register("SENHA_LOGIN")}
                    />
                    {errors.SENHA_LOGIN && (
                      <p className="m-0 my-1 text-white">
                        *{errors.SENHA_LOGIN.message}
                      </p>
                    )}
                  </div>
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
                      wrapperClass=""
                    />
                  ) : (
                    <>
                      {loginError && (
                        <div className="container">
                          <p className="m-0 my-1 text-white font-s">
                            *{loginError}
                          </p>
                        </div>
                      )}
                      <button
                        type="submit"
                        className="btn btn-dark border border-white mt-3"
                      >
                        Entrar
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary border border-white mt-3 mx-2"
                        onClick={() => {
                          setShowLogin("hidden-form");
                          setTimeout(() => {
                            setShowLogin("d-none");
                            setHiddenLogin("div-login");
                          }, 353);
                        }}
                      >
                        Voltar
                      </button>
                    </>
                  )}
                </form>
                <div className="row-white">
                  <span className="span-login-rapido">Login rápido</span>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center flex-column mt-4">
                  <button className="btn-google">
                    <img src="socialIcons/google.png" alt="" width="9%" />
                    oogle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FORM CADASTRO */}
        <div
          className={
            active !== 4
              ? showCadastro + " mt-sm-5 pt-sm-5"
              : showCadastro + " mt-sm-5 pt-sm-5 pb-5 mb-5"
          }
        >
          <div className="container-fluid pt-sm-5 mt-sm-5">
            <div className="row height-row">
              <div className="col-12 d-flex justify-content-center align-items-center pb-5 mb-5 flex-column">
                <form className="col-10" onSubmit={handleSubmit(criarUsuario)}>
                  <div className="form-group">
                    <label className="text-white">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      {...register("EMAIL")}
                    />
                    {errors.EMAIL && (
                      <p className="m-0 my-1 text-white">
                        *{errors.EMAIL.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-white">Barbearia</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nome da sua barbearia"
                      {...register("NOME_BARBEARIA")}
                    />
                    {errors.NOME_BARBEARIA && (
                      <p className="m-0 my-1 text-white">
                        *{errors.NOME_BARBEARIA.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="text-white">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Senha"
                      {...register("SENHA")}
                    />
                    {errors.SENHA && (
                      <p className="m-0 my-1 text-white">
                        *{errors.SENHA.message}
                      </p>
                    )}
                  </div>
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
                      wrapperClass=""
                    />
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="btn btn-dark border border-white mt-3"
                      >
                        Cadastrar
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary border border-white mt-3 mx-2"
                        onClick={() => {
                          setShowCadastro("hidden-form");
                          setTimeout(() => {
                            setShowCadastro("d-none");
                            setHiddenLogin("div-login");
                          }, 353);
                        }}
                      >
                        Voltar
                      </button>
                    </>
                  )}
                </form>
                <div className="row-white">
                  <span className="span-login-rapido">Cadastre-se com</span>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center flex-column mt-4">
                  <button className="btn-google">
                    <img src="socialIcons/google.png" alt="" width="9%" />
                    oogle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!user?.ID && <MenuBottom />}
      </div>
    </>
  );
};
