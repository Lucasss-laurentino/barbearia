import { useContext, useEffect, useState } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuFooterContext } from "../../Context/MenuFooterContext";

export const MenuFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { itensMenu } = useContext(MenuFooterContext);

  const [endpoint, setEndPoint] = useState();

  useEffect(() => {
    setEndPoint(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <>
      <div className="menu-footer">
        <ul className="list-options-menu">
          {itensMenu.map((item, index) => (
            <li
              key={index}
              className={
                endpoint === item.rota
                  ? "item-menu-footer bg-white"
                  : "item-menu-footer"
              }
              onClick={() => navigate(item.url)}
            >
              <div className="icone-item">
                <img
                  src={endpoint === item.rota ? item.svgDark : item.svg}
                  alt={item.text}
                  className="img-fluid"
                />
              </div>
              <div className="nome-item">
                <p
                  className={
                    endpoint === item.rota ? "text-dark" : "text-white"
                  }
                >
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
