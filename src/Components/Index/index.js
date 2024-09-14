import { useContext, useState } from "react";
import { ListService } from "../ListServices";
import { Menu } from "../Menu"
import { MenuBottom } from "../MenuBottom";
import { Navbar } from "../Navbar"
import './index.css';
import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { Horarios } from "../Horarios";

export const Index = () => {

  const { active } = useContext(AbaBottomContext);

    return (
      <>
        <div className="body">
          <Navbar />
          <Menu />
          {active === 1 && <ListService />}
          {active === 2 && <Horarios/>}
          <MenuBottom />
        </div>
      </>
    );
}