import AgendamentoIcon from '../Icones/agendamento/calendar-add-svgrepo-com.svg'
import AgendamentoIconDark from '../Icones/agendamento/agendamento-dark.svg';
import ServiceIcon from '../Icones/services/services.svg';
import ServiceIconDark from '../Icones/services/services-dark.svg';
import BarbeiroIcon from '../Icones/barbeiros/barbeiro.svg';
import BarbeiroIconWhite from '../Icones/barbeiros/barbeiroIconWhite.svg'
import FinanceiroIconDark from '../Icones/financeiro/financial-bars-stats-svgrepo-com.svg';
import FinanceiroIcon from '../Icones/financeiro/financial-white.svg';

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuFooterContext } from '../../../Context/MenuFooterContext';

export const ListAdm = () => {
  
  const { barbearia } = useParams();

  const { active, setActive, ativarPagina } = useContext(MenuFooterContext);

  const [itensMenuADM, setItemsMenuADM] = useState([
    {
      text: "Agendamentos",
      svg: AgendamentoIcon,
      svgDark: AgendamentoIconDark,
      url: `/${barbearia}/agendamentos`,
    },
    {
      text: "Serviços",
      svg: ServiceIcon,
      svgDark: ServiceIconDark,
      url: `/${barbearia}/servicos`,
    },
    {
      text: "Barbeiros",
      svg: BarbeiroIconWhite,
      svgDark: BarbeiroIcon,
      url: `/${barbearia}/barbeiros`,
    },
    {
      text: "Financeiro",
      svg: FinanceiroIcon,
      svgDark: FinanceiroIconDark,
      url: `/${barbearia}/financeiro`,
    },
  ]);

  return (
    <>
      <ul className="list-options-menu">
        {itensMenuADM.map((item, index) => (
          <li
            key={index}
            onClick={() => ativarPagina(index, item)}
            className={active === index ? "item-menu-footer bg-white text-dark" : "item-menu-footer"}
          >
            <div className="icone-item">
              <img src={active === index ? item.svgDark : item.svg} alt="" className="img-fluid" />
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