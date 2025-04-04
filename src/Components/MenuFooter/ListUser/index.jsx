import ServiceIcon from "../Icones/services/services.svg";
import ServiceIconDark from "../Icones/services/services-dark.svg";
import AgendamentoIcon from "../Icones/agendamento/calendar-add-svgrepo-com.svg";
import AgendamentoIconDark from "../Icones/agendamento/agendamento-dark.svg";
import MeusHorariosIcon from "../Icones/meusHorarios/clock-three-svgrepo-com.svg";
import MeusHorariosIconDark from "../Icones/meusHorarios/meusHorarios-dark.svg";
import LoginIcon from "../Icones/login/login-3-svgrepo-com.svg";
import LoginIconDark from "../Icones/login/login-dark.svg";
import PerfilIcon from '../Icones/perfil/perfilPreto.svg';
import PerfilIconBranco from '../Icones/perfil/perfilBranco.svg';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ListUser = ({user}) => {

  const { barbearia } = useParams();
  const navigate = useNavigate();

  const [itensMenu, setItemsMenu] = useState([]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    setItemsMenu([
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
          url: `/${barbearia}/barbeiros`,
        },
        {
          text: "Meus Horários",
          svg: MeusHorariosIcon,
          svgDark: MeusHorariosIconDark,
          url: `/${barbearia}/meusHorarios`,
        },
        {
          text: user?.ID ? "Perfil" : "Login",
          svg: user?.ID ? PerfilIconBranco : LoginIcon,
          svgDark: PerfilIcon,
          url: user?.ID ? `/${barbearia}/editarconta` : `/${barbearia}/login`,
        },
      ]);

  }, [user]);

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
