import { Outlet, useParams } from "react-router-dom";
import "./index.css";
import { MenuFooter } from "../../Components/MenuFooter";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { SocketContext } from "../../Context/SocketContext";
import { Navbar } from "../../Components/Navbar";
import { Menu } from "../../Components/Menu";
import { BarbeariaContext } from "../../Context/BarbeariaContext";

export const PaginaPadrao = () => {
  const { pegarUsuario, user } = useContext(UserContext);
  const { barbearia } = useParams();
  // const { setBarbearia } = useContext(SocketContext);
  const { setBarbearia } = useContext(BarbeariaContext);

  useEffect(() => {
    pegarUsuario();
  }, []);

  useEffect(() => {
    const barbeariaDeUseParams = barbearia;
    setBarbearia(barbeariaDeUseParams); // inicia conexão socket que depende de 'barbearia'
  }, [barbearia]);

  return (
      <>
        <div className="background-foto">
          <div className="background-transparente">
            <Navbar />
            <Menu />
            <Outlet />
            <MenuFooter user={user} />
          </div>
        </div>
      </>
  );
};