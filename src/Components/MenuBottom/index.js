import { AbaBottomContext } from '../../Context/AbaBottomContext';
import './index.css';
import { useContext } from 'react';

export const MenuBottom = () => {

  const { active, setActive } = useContext(AbaBottomContext);

    return (
      <>
        <div className="container-fluid footer-bottom">
          <div className="row">
            <div className="col-12 p-0">
              <ul className="list-menu-bottom">
                <li className="col-3" onClick={() => setActive(1)}>
                  <div
                    className={active === 1 ? "fundo-branco" : "fundo-preto"}
                  >
                    <img
                      src={active === 1 ? "servicos_dark.png" : "servicos.png"}
                      className="img-fluid"
                      width="30%"
                      alt=""
                    />
                    <p
                      className={active === 1 ? "texto-preto" : "texto-branco"}
                    >
                      Serviços
                    </p>
                  </div>
                </li>
                <li className="col-3" onClick={() => setActive(2)}>
                  <div
                    className={active === 2 ? "fundo-branco" : "fundo-preto"}
                  >
                    <img
                      src={active === 2 ? "horarios_dark.png" : "horarios.png"}
                      className="img-fluid p-1"
                      width="30%"
                      alt=""
                    />
                    <p
                      className={active === 2 ? "texto-preto" : "texto-branco"}
                    >
                      Horários
                    </p>
                  </div>
                </li>
                <li className="col-3" onClick={() => setActive(3)}>
                  <div
                    className={active === 3 ? "fundo-branco" : "fundo-preto"}
                  >
                    <img
                      src={active === 3 ? "cliente_dark.png" : "cliente.png"}
                      className="img-fluid p-1"
                      width="30%"
                      alt=""
                    />
                    <p
                      className={active === 3 ? "texto-preto" : "texto-branco"}
                    >
                      Clientes
                    </p>
                  </div>
                </li>
                <li className="col-3" onClick={() => setActive(4)}>
                  <div
                    className={active === 4 ? "fundo-branco" : "fundo-preto"}
                  >
                    <img
                      src={
                        active === 4
                          ? "configuracao_dark.png"
                          : "configuracao.png"
                      }
                      className="img-fluid p-1"
                      width="30%"
                      alt=""
                    />
                    <p
                      className={active === 4 ? "texto-preto" : "texto-branco"}
                    >
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
}