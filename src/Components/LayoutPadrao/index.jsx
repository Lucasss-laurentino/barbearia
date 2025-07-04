import { useContext, useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { Menu } from "../Menu";
import { MenuFooter } from "../MenuFooter";
import { Outlet, useLocation } from "react-router-dom";
import { BarbeariaContext } from "../../Context/BarbeariaContext";
import { buildConnection } from "../../SignalR/connection";
import { SignalRContext } from "../../Context/SignalRContext";

export const LayoutPadrao = () => {
  const [classMenu, setClassMenu] = useState(false);
  const url = useLocation();

  const { getBarbearia, barbearia } = useContext(BarbeariaContext);
  const { setConnection } = useContext(SignalRContext);

  useEffect(() => {
    const pathParts = url.pathname.split("/");
    const barbeariaNome = pathParts[1];
    const pegarBarbearia = async () => {
      if (barbeariaNome && !barbearia) await getBarbearia(barbeariaNome);
    };
    pegarBarbearia();
  }, []);

  // conexao socket via signalR
  useEffect(() => {
    if (barbearia) {
      const conectar = async () => {
        const connection = await buildConnection(barbearia.id);
        await connection.start();
        setConnection(connection);
      };
      conectar();
    }
  }, [barbearia]);

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-0">
                <Navbar setClassMenu={setClassMenu} classMenu={classMenu} />
                <Menu setClassMenu={setClassMenu} classMenu={classMenu} />
                <Outlet />
                <MenuFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
