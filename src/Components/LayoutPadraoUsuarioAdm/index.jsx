import { useContext, useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { Menu } from "../Menu";
import { MenuFooterAdm } from "../MenuFooterAdm";
import { Outlet, useLocation } from "react-router-dom";
import { BarbeariaContext } from "../../Context/BarbeariaContext";

export const LayoutPadraoUsuarioAdm = () => {

  const [classMenu, setClassMenu] = useState(false);
  const url = useLocation();

  const { getBarbearia, barbearia } = useContext(BarbeariaContext);

  useEffect(() => {
    const pathParts = url.pathname.split("/");
    const barbeariaNome = pathParts[1];
    if(barbeariaNome && !barbearia) getBarbearia(barbeariaNome);
  }, []);

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-0">
                <Navbar setClassMenu={setClassMenu} classMenu={classMenu}/>
                <Menu setClassMenu={setClassMenu} classMenu={classMenu}/>
                <Outlet/>
                <MenuFooterAdm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
