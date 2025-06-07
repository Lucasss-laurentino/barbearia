import "./index.css";
import { useContext } from "react";
import { BarbeariaContext } from "../../Context/BarbeariaContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

import ServiceIcon from "./Icones/services/services.svg";
import ServiceIconDark from "./Icones/services/services-dark.svg";
import AgendamentoIcon from "./Icones/agendamento/calendar-add-svgrepo-com.svg";
import AgendamentoIconDark from "./Icones/agendamento/agendamento-dark.svg";
import MeusHorariosIcon from "./Icones/meusHorarios/clock-three-svgrepo-com.svg";
import MeusHorariosIconDark from "./Icones/meusHorarios/meusHorarios-dark.svg";
import LoginIcon from "./Icones/login/login-3-svgrepo-com.svg";
import PerfilIcon from "./Icones/perfil/perfilPreto.svg";
import PerfilIconBranco from "./Icones/perfil/perfilBranco.svg";

export const MenuFooterCLiente = () => {
  const { barbearia } = useContext(BarbeariaContext);
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  const itensMenu = [
    {
      id: 1,
      text: "Serviços",
      svg: ServiceIcon,
      svgDark: ServiceIconDark,
      url: `/${barbearia?.nome}/servicos`,
    },
    {
      id: 2,
      text: "Agendamento",
      svg: AgendamentoIcon,
      svgDark: AgendamentoIconDark,
      url: `/${barbearia?.nome}/barbeiros`,
    },
    {
      id: 3,
      text: "Meus Horários",
      svg: MeusHorariosIcon,
      svgDark: MeusHorariosIconDark,
      url: `/${barbearia?.nome}/meusHorarios`,
    },
    {
      id: 4,
      text: usuario?.ID ? "Perfil" : "Login",
      svg: usuario?.ID ? PerfilIconBranco : LoginIcon,
      svgDark: PerfilIcon,
      url: usuario?.ID
        ? `/${barbearia?.nome}/editarconta`
        : `/${barbearia?.nome}/login`,
    },
  ];

  return (
    <div className="menu-footer">
      <ul className="list-options-menu">
        {itensMenu.map((item) => (
          <li
            key={item.id}
            className="item-menu-footer"
            onClick={() => navigate(item.url)}
          >
            <div className="icone-item">
              <img src={item.svg} alt={item.text} className="img-fluid" />
            </div>
            <div className="nome-item">
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
