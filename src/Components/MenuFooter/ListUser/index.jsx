import ServiceIcon from "../Icones/services/services.svg";
import ServiceIconDark from "../Icones/services/services-dark.svg";
import AgendamentoIcon from "../Icones/agendamento/calendar-add-svgrepo-com.svg";
import AgendamentoIconDark from "../Icones/agendamento/agendamento-dark.svg";
import MeusHorariosIcon from "../Icones/meusHorarios/clock-three-svgrepo-com.svg";
import MeusHorariosIconDark from "../Icones/meusHorarios/meusHorarios-dark.svg";
import LoginIcon from "../Icones/login/login-3-svgrepo-com.svg";
import PerfilIcon from '../Icones/perfil/perfilPreto.svg';
import PerfilIconBranco from '../Icones/perfil/perfilBranco.svg';

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HorarioMarcadoContext } from "../../../Context/HorarioMarcadoContext";

export const ListUser = ({user}) => {

  const { barbearia } = useParams();
  const navigate = useNavigate();

  const { gatilhoPraDirecionarPraMeusHorarios } = useContext(HorarioMarcadoContext);

  const [itensMenu, setItemsMenu] = useState([]);
  const [subRota, setSubRota] = useState("");

  useEffect(() => {

    const caminho = window.location.pathname;
    setSubRota(caminho.split(`/${barbearia}/`)[1]);

    setItemsMenu([
      {
        id: 1,
        rota: "servicos",
        text: "Serviços",
        svg: ServiceIcon,
        svgDark: ServiceIconDark,
        url: `/${barbearia}/servicos`,
      },
      {
        id: 2,
        rota: "barbeiros",
        text: "Agendamento",
        svg: AgendamentoIcon,
        svgDark: AgendamentoIconDark,
        url: `/${barbearia}/barbeiros`,
      },
      {
        id: 3,
        rota: "meusHorarios",
        text: "Meus Horários",
        svg: MeusHorariosIcon,
        svgDark: MeusHorariosIconDark,
        url: `/${barbearia}/meusHorarios`,
      },
      {
        id: 4,
        rota: user?.ID ? "editarconta" : "login",
        text: user?.ID ? "Perfil" : "Login",
        svg: user?.ID ? PerfilIconBranco : LoginIcon,
        svgDark: PerfilIcon,
        url: user?.ID ? `/${barbearia}/editarconta` : `/${barbearia}/login`,
      },
    ]);

  }, [user, subRota]);

  const ativarPagina = (item) => {
    //setActive(index);
    setSubRota(item.rota);
    navigate(item.url)  
  }

  useEffect(() => {
    if (gatilhoPraDirecionarPraMeusHorarios) ativarPagina(2, { url: `/${barbearia}/meusHorarios` })
  }, [gatilhoPraDirecionarPraMeusHorarios]);

  return (
    <>
      <ul className="list-options-menu">
        {itensMenu.map((item) => (
          <li 
            key={item.id} 
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
};
