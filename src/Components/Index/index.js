import { useContext, useState } from "react";
import { ListService } from "../ListServices";
import { Menu } from "../Menu"
import { MenuBottom } from "../MenuBottom";
import { Navbar } from "../Navbar"
import './index.css';
import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { Horarios } from "../Horarios";
import { ListBarbeiros } from "../ListBarbeiros";
import { UserContext } from "../../Context/UserContext";

export const Index = () => {

  const { active } = useContext(AbaBottomContext);
  const { user, setUser } = useContext(UserContext);

    return (
      <>
        <div className="body">
          <Navbar />
          <Menu />
          {active === 1 && !user.BARBEIRO && <ListBarbeiros />}
          {active === 1 && user.BARBEIRO && <ListService />}

          {active === 2 && user.BARBEIRO && <Horarios/>}
          {active === 2 && !user.BARBEIRO && <ListService />}
          <MenuBottom />
        </div>
      </>
    );
}