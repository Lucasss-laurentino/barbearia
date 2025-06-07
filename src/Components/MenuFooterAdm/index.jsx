import { useContext, useEffect, useState } from "react";
import "./index.css";

import AgendamentoIcon from "./Icones/agendamento/calendar-add-svgrepo-com.svg";
import AgendamentoIconDark from "./Icones/agendamento/agendamento-dark.svg";
import ServiceIcon from "./Icones/services/services.svg";
import ServiceIconDark from "./Icones/services/services-dark.svg";
import BarbeiroIcon from "./Icones/barbeiros/barbeiro.svg";
import BarbeiroIconWhite from "./Icones/barbeiros/barbeiroIconWhite.svg";
import FinanceiroIconDark from "./Icones/financeiro/financial-bars-stats-svgrepo-com.svg";
import FinanceiroIcon from "./Icones/financeiro/financial-white.svg";
import { BarbeariaContext } from "../../Context/BarbeariaContext";
import { useLocation, useNavigate } from "react-router-dom";

export const MenuFooterAdm = () => {
  const { barbearia } = useContext(BarbeariaContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [endpoint, setEndPoint] = useState();

  const [itensMenuADM, setItemsMenuADM] = useState([]);

  useEffect(() => {
    if (barbearia?.nome) {
      setItemsMenuADM([
        {
          rota: "agendamentos",
          text: "Agendamentos",
          svg: AgendamentoIcon,
          svgDark: AgendamentoIconDark,
          url: `/${barbearia?.nome}/agendamentos`,
        },
        {
          rota: "servicos",
          text: "Serviços",
          svg: ServiceIcon,
          svgDark: ServiceIconDark,
          url: `/${barbearia?.nome}/servicos`,
        },
        {
          rota: "barbeiros",
          text: "Barbeiros",
          svg: BarbeiroIconWhite,
          svgDark: BarbeiroIcon,
          url: `/${barbearia?.nome}/barbeiros`,
        },
        {
          rota: "financeiro",
          text: "Financeiro",
          svg: FinanceiroIcon,
          svgDark: FinanceiroIconDark,
          url: `/${barbearia?.nome}/financeiro`,
        },
      ]);
    }
  }, [barbearia]);

  useEffect(() => {
    setEndPoint(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <>
      <div className="menu-footer">
        <ul className="list-options-menu">
          {itensMenuADM.map((item, index) => (
            <li
              key={index}
              className={
                endpoint === item.rota
                  ? "item-menu-footer bg-white"
                  : "item-menu-footer"
              }
              onClick={() => navigate(item.url)}
            >
              <div className="icone-item">
                <img
                  src={endpoint === item.rota ? item.svgDark : item.svg}
                  alt={item.text}
                  className="img-fluid"
                />
              </div>
              <div className="nome-item">
                <p
                  className={
                    endpoint === item.rota ? "text-dark" : "text-white"
                  }
                >
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
