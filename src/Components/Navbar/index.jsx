import { useContext } from "react";
import { MenuContext } from "../../Context/MenuContext";
import { UserContext } from "../../Context/UserContext";

export const Navbar = () => {
  const { setClassMenu, classMenu } = useContext(MenuContext);
  const { user, logout } = useContext(UserContext);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 py-2 bg-dark d-flex justify-content-between align-items-center">
            <div className="img-logo col-10 col-sm-7 col-md-5 pt-2">
              <img src="/logo-fotor.png" width="30%" alt="" />
            </div>
            {user?.ID && (
              <div
                className="icon-menu col-2 d-flex justify-content-center"
                onClick={() => setClassMenu(!classMenu)}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
