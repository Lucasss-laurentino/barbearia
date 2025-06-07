import { useState } from "react";
import { Navbar } from "../Navbar";
import { Menu } from "../Menu";
import { MenuFooterCLiente } from "../MenuFooterCliente";

export const LayoutPadraoUsuarioCliente = () => {

  const [classMenu, setClassMenu] = useState(false);

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-0">
                <Navbar setClassMenu={setClassMenu} classMenu={classMenu}/>
                <Menu setClassMenu={setClassMenu} classMenu={classMenu}/>
                <MenuFooterCLiente/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
