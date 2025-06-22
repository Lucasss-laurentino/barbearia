import { createContext, useContext, useEffect, useState } from "react";
import { BarbeariaContext } from "./BarbeariaContext";
import { UserContext } from "./UserContext";
import AgendamentoIcon from "../Components/MenuFooter/Icones/agendamento/calendar-add-svgrepo-com.svg";
import AgendamentoIconDark from "../Components/MenuFooter/Icones/agendamento/agendamento-dark.svg";
import ServiceIcon from "../Components/MenuFooter/Icones/services/services.svg";
import ServiceIconDark from "../Components/MenuFooter/Icones/services/services-dark.svg";
import BarbeiroIcon from "../Components/MenuFooter/Icones/barbeiros/barbeiro.svg";
import BarbeiroIconWhite from "../Components/MenuFooter/Icones/barbeiros/barbeiroIconWhite.svg";
import FinanceiroIconDark from "../Components/MenuFooter/Icones/financeiro/financial-bars-stats-svgrepo-com.svg";
import FinanceiroIcon from "../Components/MenuFooter/Icones/financeiro/financial-white.svg";
import MeusHorariosIcon from "../Components/MenuFooter/Icones/meusHorarios/clock-three-svgrepo-com.svg";
import MeusHorariosIconDark from "../Components/MenuFooter/Icones/meusHorarios/meusHorarios-dark.svg";
import LoginIcon from "../Components/MenuFooter/Icones/login/login-3-svgrepo-com.svg";
import LoginIconDark from "../Components/MenuFooter/Icones/login/login-dark.svg";
import PerfilIcon from "../Components/MenuFooter/Icones/perfil/perfilBranco.svg";
import PerfilIconDark from "../Components/MenuFooter/Icones/perfil/perfilPreto.svg";

export const MenuFooterContext = createContext();

export const MenuFooterProvider = ({ children }) => {
  const { barbearia } = useContext(BarbeariaContext);
  const { usuario } = useContext(UserContext);
  const [itensMenu, setItemsMenu] = useState([]);

  useEffect(() => {
    constroyMenu();
  }, [barbearia, usuario]);

  const constroyMenu = () => {
    if (barbearia?.nome) {
      if (usuario && usuario?.adm) {
        setItemsMenu([
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
        return;
      }
      if (!usuario) {
        setItemsMenu([
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
            rota: "meusHorarios",
            text: "Meus Horários",
            svg: MeusHorariosIcon,
            svgDark: MeusHorariosIconDark,
            url: `/${barbearia?.nome}/meusHorarios`,
          },
          {
            rota: "login",
            text: "Login",
            svg: LoginIcon,
            svgDark: LoginIconDark,
            url: `/${barbearia?.nome}/login`,
          },
        ]);
        return;
      }
      if (usuario && !usuario.Adm) {
        setItemsMenu([
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
            rota: "meusHorarios",
            text: "Meus Horários",
            svg: MeusHorariosIcon,
            svgDark: MeusHorariosIconDark,
            url: `/${barbearia?.nome}/meusHorarios`,
          },
          {
            rota: "minhaConta",
            text: "Perfil",
            svg: PerfilIcon,
            svgDark: PerfilIconDark,
            url: `/${barbearia?.nome}/minhaConta`,
          },
        ]);
        return;
      }
    }
  };

  return (
    <MenuFooterContext.Provider value={{ itensMenu, setItemsMenu }}>
      {children}
    </MenuFooterContext.Provider>
  );
};
