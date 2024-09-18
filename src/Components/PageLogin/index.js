import { useContext, useState } from "react";
import { ImgLogo } from "../ImgLogo";
import "./index.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "../../validations/createUserValidation";
import { LoginContext } from "../../Context/LoginContext";

export const PageLogin = () => {
  const [hiddenLogin, setHiddenLogin] = useState("div-login");
  const [showLogin, setShowLogin] = useState("form-login-escondido");
  const [showCadastro, setShowCadastro] = useState("form-login-escondido");

  // contexts
  const { criarUsuario } = useContext(LoginContext);

  // react-hook-form
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(createUserSchema),
    });

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
  }

  return (
    <>
      <div className="tela-toda-fundo-preto-show position-relative">
        <ImgLogo />
        {/* BTN LOGIN, CADASTRO E ICONS SOCIAL */}
        <div className={hiddenLogin}>
          <div className="container-fluid">
            <div className="row height-row">
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
                    }}
                  >
                    Cadastrar
                  </button>
                </div>
                {/* ICONS SOCIAL */}
                <div className="d-flex justify-content-center align-items-center mt-3 pt-3">
                  <ul className="lista-icon-social col-12">
                    <li className="col-2">
                      <img
                        src="socialIcons/facebook.png"
                        alt=""
                        className="img-fluid"
                        width="50%"
                      />
                    </li>
                    <li className="col-2">
                      <img
                        src="socialIcons/instagramIcon.png"
                        alt=""
                        width="70%"
                      />
                    </li>
                    <li className="col-2">
                      <img src="socialIcons/whatsapp.png" alt="" width="50%" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FORM LOGIN */}
        <div className={showLogin}>
          <div className="container-fluid">
            <div className="row height-row">
              <div className="col-12 d-flex justify-content-center align-items-center pb-5 mb-5 flex-column">
                <form className="col-10">
                  <div className="form-group">
                    <label className="text-white">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white">Senha</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Senha"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-dark border border-white mt-3"
                  >
                    Entrar
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary border border-white mt-3 mx-2"
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
        <div className={showCadastro}>
          <div className="container-fluid">
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
                    <label className="text-white">Senha</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Senha"
                      {...register("SENHA")}
                      onChange={(e) => handleChange(e)}
                    />
                    {errors.SENHA && (
                      <p className="m-0 my-1 text-white">
                        *{errors.SENHA.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    class="btn btn-dark border border-white mt-3"
                  >
                    Cadastrar
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary border border-white mt-3 mx-2"
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
      </div>
    </>
  );
};
