import { useContext, useEffect, useState } from "react";
import { ListService } from "../ListServices";
import { Menu } from "../Menu";
import { MenuBottom } from "../MenuBottom";
import { Navbar } from "../Navbar";
import "./index.css";
import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { Horarios } from "../Horarios";
import { ListBarbeiros } from "../ListBarbeiros";
import { UserContext } from "../../Context/UserContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { useParams } from "react-router-dom";

export const Index = () => {
  const { active } = useContext(AbaBottomContext);
  const { user, pegarUsuario } = useContext(UserContext);
  const { pegarServicos } = useContext(ServicoContext);
  const { barbearia } = useParams();

  useEffect(() => {
    pegarUsuario();
    pegarServicos();
  }, []);

  return (
    <>
      {
        user.ID &&
        <div className="body">
          <Navbar />
          <Menu />
          {active === 1 && !user.BARBEIRO && <ListBarbeiros />}
          {active === 1 && user.BARBEIRO && <ListService />}

          {active === 2 && user.BARBEIRO && <Horarios />}
          {active === 2 && !user.BARBEIRO && <ListService />}

          {active === 3 && user.BARBEIRO && <ListBarbeiros/>}
          <MenuBottom />
        </div>
      }
    </>
  );
};
