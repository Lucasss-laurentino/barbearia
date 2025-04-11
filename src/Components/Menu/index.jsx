import { useContext, useState } from "react";
import "./index.css";
import { MenuContext } from "../../Context/MenuContext";
import { UserContext } from "../../Context/UserContext";
import { LoginContext } from "../../Context/LoginContext";
import { ModalHabilitarCobranca } from "../ModalHabilitarCobranca";
import { useNavigate, useParams } from "react-router-dom";
import { MenuFooterContext } from "../../Context/MenuFooterContext";

export const Menu = () => {
  const { classMenu, setClassMenu } = useContext(MenuContext);
  const { logout } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const { setActive } = useContext(MenuFooterContext);


  const { barbearia } = useParams();

  const navigate = useNavigate();

  const [showModalHabilitarCobranca, setShowModalHabilitarCobranca] = useState(false);

  const handleClose = () => {
    setShowModalHabilitarCobranca(false);
  }

  return (
    <>
    <ModalHabilitarCobranca
      show={showModalHabilitarCobranca}
      handleClose={handleClose}
    
    />
      <div className="container-fluid">
        <div className="row position-relative justify-content-end">
          <div
            className={!classMenu ? "menu-escondido col-8" : "show-menu col-8"}
          >
            <div className="row justify-content-end">
              <div className="p-0">
                <ul className="list-menu">
                  {user?.ADM && (
                    <li
                      className="col-12 px-4 d-flex justify-content-between align-items-center cursor"
                      onClick={() => {
                        setClassMenu(false);
                        setActive(-1)
                        navigate(`/${barbearia}/editarconta`);
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
                  )}
                  {/* ASSINATURA */}
                  {user?.ID_PAGSEGURO && user?.ID_PAGSEGURO !== null &&
                    <li
                      className="col-12 px-4 d-flex justify-content-between align-items-center cursor"
                      onClick={() => {
                       // setActive(6);
                        setClassMenu(false);
                      }}
                    >
                      <p className="m-0">Minha Assinatura</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#fff"
                        className="bi bi-file-text"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                      </svg>
                    </li>
                  }
                  {/*user?.ADM &&
                  <li className="col-12 px-4 d-flex justify-content-between align-items-center cursor"
                    onClick={() => { 
                      
                      if(user?.CHAVE_PIX !== null && user?.CHAVE_PIX !== '') {
                        // habilita
                      } else {
                        // cadastra chave primeiro
                        setShowModalHabilitarCobranca(true)
                      }

                    }}
                  >
                    <p className="m-0">Habilitar cobrança</p>
                    {
                      user?.CHAVE_PIX === null || user.CHAVE_PIX === '' ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#d60606" className="bi bi-patch-check" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                        <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#008000" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                      </svg>
                    }
                  </li>
                  */}
                  <li
                    className="col-12 px-4 d-flex justify-content-between align-items-center cursor"
                  >
                    <a className="text-white text-decoration-none" href="https://wa.me/5522999730597">Suporte</a>
                  <img src="/whatsapp.png" className="col-1" alt="" />
                  </li>
                  {/* SAIR */}
                  <li
                    className="col-12 px-4 d-flex justify-content-between align-items-center cursor"
                    onClick={() => {
                      logout(barbearia);
                      setClassMenu(false);
                    //  setActive(2);
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
