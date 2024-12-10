import { useContext } from "react";
import "./index.css";
import { MenuContext } from "../../Context/MenuContext";
import { UserContext } from "../../Context/UserContext";
import { AbaBottomContext } from "../../Context/AbaBottomContext";

export const Menu = () => {
  const { classMenu, setClassMenu } = useContext(MenuContext);
  const { logout } = useContext(UserContext);
  const { setActive } = useContext(AbaBottomContext);

  return (
    <>
      <div className="container-fluid">
        <div className="row position-relative justify-content-end">
          <div
            className={!classMenu ? "menu-escondido col-8" : "show-menu col-8"}
          >
            <div className="row justify-content-end">
              <div className="p-0">
                <ul className="list-menu">
                  <li
                    className="col-12 px-4 d-flex justify-content-between align-items-center cursor"
                    onClick={() => {
                      setActive(5)
                      setClassMenu(false);
                    }}
                  >
                    <p className="m-0">Minha Conta</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#fff"
                      className="bi bi-person-fill-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                    </svg>
                  </li>
                  <li
                    className="col-12 px-4 d-flex justify-content-between align-items-center cursor"
                    onClick={() => {
                      logout();
                      setClassMenu(false);
                      setActive(2)
                    }}
                  >
                    <p className="m-0">Sair</p>
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
