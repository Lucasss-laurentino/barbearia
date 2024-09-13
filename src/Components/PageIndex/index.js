import { useState } from "react";
import { ImgLogo } from "../ImgLogo";
import "./index.css";

export const PageIndex = () => {
  const [hiddenLogin, setHiddenLogin] = useState("div-login");
  const [showLogin, setShowLogin] = useState("form-login-escondido");

  return (
    <>
      <div className="tela-toda-fundo-preto-show position-relative">
        <ImgLogo />
        {/* BTN LOGIN E ICONS SOCIAL */}
        <div className={hiddenLogin}>
          <div className="container-fluid">
            <div className="row height-row">
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
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
                </div>
                {/* ICONS SOCIAL */}
                <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                  <ul className="lista-icon-social">
                    <li>
                      <img src="socialIcons/facebook.png" alt="" width="30%" />
                    </li>
                    <li>
                      <img
                        src="socialIcons/instagramIcon.png"
                        alt=""
                        width="57%"
                      />
                    </li>
                    <li>
                      <img src="socialIcons/whatsapp.png" alt="" width="30%" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={showLogin}>
          <div className="container-fluid">
            <div className="row height-row">
              <div className="col-12 d-flex justify-content-center align-items-center pb-5 mb-5">
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
                      setShowLogin("hidden-form")
                      setTimeout(() => {
                        setShowLogin("d-none")
                        setHiddenLogin("div-login")
                      }, 353)
                    }}
                  >
                    Voltar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
