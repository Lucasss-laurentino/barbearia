import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { UserContext } from "../../Context/UserContext";
import "./index.css";
import { useContext } from "react";

export const MenuBottom = () => {
  const { active, setActive } = useContext(AbaBottomContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="container-fluid footer-bottom">
        <div className="row">
          <div className={active !== 4 ? "col-12 col-md-11 p-0" : "col-12"}>
            <ul className={active !== 4 ? "list-menu-bottom" : "list-menu-bottom justify-content-end"}>
              <li
                className="col-3 col-sm-2 col-md-2"
                onClick={() => setActive(2)}
              >
                <div className={active === 2 ? "fundo-branco" : "fundo-preto"}>
                  <img
                    src={
                      active === 2
                        ? "/icones_menu_bottom/horarios_dark.png"
                        : "/icones_menu_bottom/horarios.png"
                    }
                    className="img-fluid img-icon-width p-1"
                    width="30%"
                    alt=""
                  />
                  <p className={active === 2 ? "texto-preto" : "texto-branco"}>
                    {user.ADM ? "Horários" : "Serviços"}
                  </p>
                </div>
              </li>
              <li
                className="col-3  col-sm-2 col-md-2"
                onClick={() => setActive(1)}
              >
                <div className={active === 1 ? "fundo-branco" : "fundo-preto"}>
                  <img
                    src={
                      active === 1
                        ? "/icones_menu_bottom/servicos_dark.png"
                        : "/icones_menu_bottom/servicos.png"
                    }
                    className="img-fluid img-icon-width"
                    width="30%"
                    alt=""
                  />
                  <p className={active === 1 ? "texto-preto" : "texto-branco"}>
                    {user.ADM ? "Serviços" : "Agendamento"}
                  </p>
                </div>
              </li>
              <li
                className="col-3 col-sm-2 col-md-2"
                onClick={() => setActive(3)}
              >
                <div className={active === 3 ? "fundo-branco" : "fundo-preto"}>
                  <img
                    src={
                      (active === 3 &&
                        user.ADM &&
                        "/icones_menu_bottom/cliente_dark.png") ||
                      (active !== 3 &&
                        user.ADM &&
                        "/icones_menu_bottom/cliente.png") ||
                      (active === 3 &&
                        !user.ADM &&
                        "/icones_menu_bottom/relogio_preto.png") ||
                      (active !== 3 &&
                        !user.ADM &&
                        "/icones_menu_bottom/relogio_branco.png")
                    }
                    className="img-fluid img-icon-width p-1"
                    width="30%"
                    alt=""
                  />
                  <p className={active === 3 ? "texto-preto" : "texto-branco"}>
                    {user.ADM ? "Barbeiros" : "Meus Horários"}
                  </p>
                </div>
              </li>
              <li
                className="col-3 col-sm-2 col-md-2"
                onClick={() => setActive(4)}
              >
                <div className={active === 4 ? "fundo-branco" : "fundo-preto"}>
                  {active === 4 && user?.ID && (
                    <>
                      <img
                        src="/icones_menu_bottom/configuracao_dark.png"
                        className="img-fluid img-icon-width p-1"
                        width="30%"
                        alt=""
                      />
                      <p className="texto-preto">Configurações</p>
                    </>
                  )}
                  {active !== 4 && user?.ID && (
                    <>
                      <img
                        src="/icones_menu_bottom/configuracao.png"
                        className="img-fluid img-icon-width p-1"
                        width="30%"
                        alt=""
                      />
                      <p className="texto-branco">Configurações</p>
                    </>
                  )}
                  {active === 4 && !user?.ID && (
                    <>
                      <div className="container text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#000"
                          className="bi bi-door-open-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                        </svg>
                      </div>
                      <p className="texto-preto">Login</p>
                    </>
                  )}
                  {active !== 4 && !user?.ID && (
                    <>
                      <div className="container text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          className="bi bi-door-open-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                        </svg>
                      </div>
                      <p className="texto-branco">Login</p>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
