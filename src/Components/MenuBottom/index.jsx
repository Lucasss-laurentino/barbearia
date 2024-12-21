import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { UserContext } from "../../Context/UserContext";
import "./index.css";
import { useContext } from "react";
import Cookies from "js-cookie";

export const MenuBottom = () => {
  const { active, setActive } = useContext(AbaBottomContext);
  const { user } = useContext(UserContext);

  const handleAbaMenu = (aba) => {
    const cookie = Cookies.get("token");
    if(!cookie) setActive(aba)
  }

  return (
    <>
      <div className="footer-bottom p-0">
        <div className="row">
          <div className="p-0 col-12">
            <ul
              className="list-menu-bottom"
            >
              <li
                className="col-3 col-md-2"
                onClick={() => handleAbaMenu(2)}
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
                className="col-3 col-md-2"
                onClick={() => handleAbaMenu(1)}
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
                className="col-3 col-md-2"
                onClick={() => handleAbaMenu(3)}
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
                className="col-3 col-md-2"
                onClick={() => handleAbaMenu(4)}
              >
                <div className={active === 4 ? "fundo-branco" : "fundo-preto"}>

                  {active === 4 && user?.ADM && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                      <p className="texto-preto">Finalizados</p>
                    </>
                  )}
                  {active !== 4 && user?.ADM && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#fff"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                      <p className="texto-branco">Finalizados</p>
                    </>
                  )}
                  {active === 4 && user?.ID && !user.ADM && (
                    <>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill=""
                      className="bi bi-person-fill-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                    </svg>
                      <p className="texto-preto">Perfil</p>
                    </>
                  )}
                  {active !== 4 && user?.ID && !user.ADM && (
                    <>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#fff"
                      className="bi bi-person-fill-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                    </svg>
                      <p className="texto-branco">Perfil</p>
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
