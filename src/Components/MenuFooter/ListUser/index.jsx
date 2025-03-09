import ServiceIcon from "../Icones/services/services.svg";
import ServiceIconDark from "../Icones/services/services-dark.svg";
import AgendamentoIcon from "../Icones/agendamento/calendar-add-svgrepo-com.svg";
import AgendamentoIconDark from "../Icones/agendamento/agendamento-dark.svg";
import MeusHorariosIcon from "../Icones/meusHorarios/clock-three-svgrepo-com.svg";
import MeusHorariosIconDark from "../Icones/meusHorarios/meusHorarios-dark.svg";
import LoginIcon from "../Icones/login/login-3-svgrepo-com.svg";
import LoginIconDark from "../Icones/login/login-dark.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ListUser = () => {

  const { barbearia } = useParams();
  const navigate = useNavigate();

  const [itensMenu, setItemsMenu] = useState([
    {
      text: "Serviços",
      svg: ServiceIcon,
      svgDark: ServiceIconDark,
      url: `/${barbearia}/servicos`,
    },
    {
      text: "Agendamento",
      svg: AgendamentoIcon,
      svgDark: AgendamentoIconDark,
      url: `/${barbearia}/agendamento`,
    },
    {
      text: "Meus Horários",
      svg: MeusHorariosIcon,
      svgDark: MeusHorariosIconDark,
      url: `/${barbearia}/meusHorarios`,
    },
    {
      text: "Login",
      svg: LoginIcon,
      svgDark: LoginIconDark,
      url: `/${barbearia}/login`,
    },

  
  ]);

  const [active, setActive] = useState(0);

  const ativarPagina = (index, item) => {
    setActive(index);
    navigate(item.url)  
  }

  return (
    <>
      <ul className="list-options-menu">
        {itensMenu.map((item, index) => (
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
};
