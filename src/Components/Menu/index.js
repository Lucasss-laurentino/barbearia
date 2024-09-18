import { useContext } from "react";
import "./index.css";
import { MenuContext } from "../../Context/MenuContext";

export const Menu = () => {
  const { classMenu } = useContext(MenuContext);

  return (
    <>
      <div className="container-fluid">
        <div className="row position-relative justify-content-end">
          <div className={!classMenu ? "menu-escondido col-8" : "show-menu col-8"}>
            <div className="row justify-content-end">
              <div className="p-0">
                <ul className="list-menu">
                  <li className="col-12">Meus horários</li>
                  <li className="col-12">Item 2</li>
                  <li className="col-12">Item 3</li>
                  <li className="col-12">Item 4</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
