import { useNavigate } from "react-router-dom";
import "./index.css";

export const NavbarLandingPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="col-4 col-md-3 d-flex justify-content-center align-items-center">
            <img src="logo-fotor.png" alt="" className="img-fluid" />
          </div>
          <div className="col-4 d-flex justify-content-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#!">
                  Ínicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Contato
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login" >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
