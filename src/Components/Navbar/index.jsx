import "./index.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BarbeariaContext } from "../../Context/BarbeariaContext";

export const Navbar = ({setClassMenu, classMenu}) => {

  const { barbearia } = useContext(BarbeariaContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid p-0 per-nav-bar">
        <div className="row">
          <div className="col-12 py-2 d-flex justify-content-between align-items-center">
            <div className="img-logo">
              <img
                src="/logo-fotor.png"
                width="100%"
                alt=""
                className="btn-home"
                onClick={() => navigate(`/${barbearia.nome}`)}
              />
            </div>
           
              <div
                className="icon-menu col-2 d-flex justify-content-center"
                onClick={() => (setClassMenu(!classMenu))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </div>
            
          </div>
        </div>
      </div>
    </>
  );
};
