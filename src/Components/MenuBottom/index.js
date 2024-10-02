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
          <div className="col-12 p-0">
            <ul className="list-menu-bottom">
              <li className="col-3" onClick={() => setActive(2)}>
                <div className={active === 2 ? "fundo-branco" : "fundo-preto"}>
                  <img
                    src={
                      active === 2
                        ? "icones_menu_bottom/horarios_dark.png"
                        : "icones_menu_bottom/horarios.png"
                    }
                    className="img-fluid p-1"
                    width="30%"
                    alt=""
                  />
                  <p className={active === 2 ? "texto-preto" : "texto-branco"}>
                    {user.BARBEIRO ? "Horários" : "Serviços"}
                  </p>
                </div>
              </li>
              <li className="col-3" onClick={() => setActive(1)}>
                <div className={active === 1 ? "fundo-branco" : "fundo-preto"}>
                  <img
                    src={
                      active === 1
                        ? "icones_menu_bottom/servicos_dark.png"
                        : "icones_menu_bottom/servicos.png"
                    }
                    className="img-fluid"
                    width="30%"
                    alt=""
                  />
                  <p className={active === 1 ? "texto-preto" : "texto-branco"}>
                    {user.BARBEIRO ? "Serviços" : "Agendamento"}
                  </p>
                </div>
              </li>
              <li className="col-3" onClick={() => setActive(3)}>
                <div className={active === 3 ? "fundo-branco" : "fundo-preto"}>
                  <img
                    src={
                      active === 3
                        ? "icones_menu_bottom/relogio_preto.png"
                        : "icones_menu_bottom/relogio_branco.png"
                    }
                    className="img-fluid p-1"
                    width="30%"
                    alt=""
                  />
                  <p className={active === 3 ? "texto-preto" : "texto-branco"}>
                    {user.BARBEIRO ? 'Barbeiros' : 'Meus Horários'}
                  </p>
                </div>
              </li>
              <li className="col-3" onClick={() => setActive(4)}>
                <div className={active === 4 ? "fundo-branco" : "fundo-preto"}>
                  <img
                    src={
                      active === 4
                        ? "icones_menu_bottom/configuracao_dark.png"
                        : "icones_menu_bottom/configuracao.png"
                    }
                    className="img-fluid p-1"
                    width="30%"
                    alt=""
                  />
                  <p className={active === 4 ? "texto-preto" : "texto-branco"}>
                    Configurações
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
