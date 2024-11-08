import "./index.css";

export const NavbarLandingPage = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <div className="col-4 col-md-3 d-flex justify-content-center align-items-center">
            <img src="logo-fotor.png" alt="" className="img-fluid" />
          </div>
          <div className="col-4 d-flex justify-content-center">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#!">
                  Ínicio
                </a>
              </li>
              <li class="nav-item" onClick={() => window.scrollTo({top: 666, behavior: 'smooth'})}>
                <a class="nav-link" href="#">
                  Planos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#!">
                  Contact
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">
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
