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
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { HorarioContext } from "../../Context/HorarioContext";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";

export const Index = () => {
  const { active } = useContext(AbaBottomContext);
  const { user, pegarUsuario, buscarBarbearia } = useContext(UserContext);
  const { pegarServicos } = useContext(ServicoContext);
  const { pegarBarbeiros } = useContext(BarbeiroContext);
  const { pegarHorarios } = useContext(HorarioContext);
  const { buscarMeuHorarioMarcado } = useContext(HorarioMarcadoContext);
  const { barbearia } = useParams();

  useEffect(() => {
    const carregarDadosNecessario = async () => {
      await Promise.all([
        buscarBarbearia(barbearia),
        pegarUsuario(),
        pegarServicos(barbearia),
        pegarBarbeiros(barbearia),
        pegarHorarios(barbearia),
        buscarMeuHorarioMarcado(),    
      ]);
    }
    carregarDadosNecessario();
  }, []);

  return (
    <>
      {user?.ID ? (
        <div className="body">
          <Navbar />
          <Menu />
          {active === 1 && !user.BARBEIRO && <ListBarbeiros />}
          {active === 1 && user.BARBEIRO && <ListService />}

          {active === 2 && user.BARBEIRO && <Horarios />}
          {active === 2 && !user.BARBEIRO && <ListService />}

          {active === 3 && user.BARBEIRO && <ListBarbeiros />}
          <MenuBottom />
        </div>
      ) : (
        <div className="body">
          <Navbar />
          <Menu />
          {active === 2 && <ListService />}
          {active === 1 && <ListBarbeiros />}
          <MenuBottom />
        </div>
      )}
    </>
  );
};
