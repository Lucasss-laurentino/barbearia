import { useContext } from "react";
import { MenuContext } from "../../Context/MenuContext";
import { UserContext } from "../../Context/UserContext";

export const Navbar = () => {
  const { setClassMenu, classMenu } = useContext(MenuContext);
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 py-2 bg-dark d-flex justify-content-between align-items-center">
            <div className="img-logo col-10 col-sm-7 col-md-5 pt-2">
              <img src="/logo-fotor.png" width="30%" alt="" />
            </div>
            {user?.ID && (
              <div className="icon-menu col-2 d-flex">
                <p className="m-0 text-white">Sair</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#fff"
                  className="bi bi-door-closed-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
