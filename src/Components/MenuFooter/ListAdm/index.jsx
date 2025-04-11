import AgendamentoIcon from '../Icones/agendamento/calendar-add-svgrepo-com.svg'
import AgendamentoIconDark from '../Icones/agendamento/agendamento-dark.svg';
import ServiceIcon from '../Icones/services/services.svg';
import ServiceIconDark from '../Icones/services/services-dark.svg';
import BarbeiroIcon from '../Icones/barbeiros/barbeiro.svg';
import BarbeiroIconWhite from '../Icones/barbeiros/barbeiroIconWhite.svg'
import FinanceiroIconDark from '../Icones/financeiro/financial-bars-stats-svgrepo-com.svg';
import FinanceiroIcon from '../Icones/financeiro/financial-white.svg';

import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MenuFooterContext } from '../../../Context/MenuFooterContext';

export const ListAdm = ({user}) => {
  
  const { barbearia } = useParams();

  const { ativarPagina, subRota, setSubRota } = useContext(MenuFooterContext);
 const location = useLocation();
  
  const [itensMenuADM, setItemsMenuADM] = useState([]);

  useEffect(() => {
    const caminho = location.pathname;
    setSubRota(caminho.split(`/${barbearia}/`)[1]);
    setItemsMenuADM([
      {
        rota: "agendamentos",
        text: "Agendamentos",
        svg: AgendamentoIcon,
        svgDark: AgendamentoIconDark,
        url: `/${barbearia}/agendamentos`,
      },
      {
        rota: "servicos",
        text: "Serviços",
        svg: ServiceIcon,
        svgDark: ServiceIconDark,
        url: `/${barbearia}/servicos`,
      },
      {
        rota: "barbeiros",
        text: "Barbeiros",
        svg: BarbeiroIconWhite,
        svgDark: BarbeiroIcon,
        url: `/${barbearia}/barbeiros`,
      },
      {
        rota: "financeiro",
        text: "Financeiro",
        svg: FinanceiroIcon,
        svgDark: FinanceiroIconDark,
        url: `/${barbearia}/financeiro`,
      },
    ]);
  }, [user, location]);

  return (
    <>
      <ul className="list-options-menu">
        {itensMenuADM.map((item, index) => (
          <li
            key={index}
            onClick={() => ativarPagina(item)}
            className={subRota === item.rota ? "item-menu-footer bg-white text-dark" : "item-menu-footer"}
          >
            <div className="icone-item">
              <img src={subRota === item.rota ? item.svgDark : item.svg} alt="" className="img-fluid" />
            </div>
            <div className="nome-item my-1">
              <p className="m-0">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}