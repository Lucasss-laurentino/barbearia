import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Navbar";
import "./index.css";
import { MenuFooter } from "../MenuFooter";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Menu } from "../Menu";
import { SocketContext } from "../../Context/SocketContext";
import { MenuFooterContext } from "../../Context/MenuFooterContext";

export const PageDefault = () => {
  const navigate = useNavigate();
  const { pegarUsuario, user, verificandoUsuarioLogado, setVerificandoUsuarioLogado } = useContext(UserContext);
  const { barbearia } = useParams();
  const {subRota, setSubRota} = useContext(MenuFooterContext);
  const { setBarbearia } = useContext(SocketContext);

  useEffect(() => {
    pegarUsuario();
  }, []);

  useEffect(() => {
    const caminho = window.location.pathname;
    setSubRota(caminho.split(`/${barbearia}/`)[1]);
  }, []);

  useEffect(()=> {
    // verificandoUsuarioLogado é setado no finally de pegarUsuario()
    if(verificandoUsuarioLogado) {
      if (user === null || !user?.ADM) {
        setVerificandoUsuarioLogado(false);
        navigate(`/${barbearia}/${subRota !== '' && subRota ? subRota : "servicos"}`);
      }
      if (user !== null && user?.ADM) {
        setVerificandoUsuarioLogado(false);
        navigate(`/${barbearia}/${subRota !== '' && subRota ? subRota : "agendamentos"}`);
      }  
    }
  }, [subRota, verificandoUsuarioLogado, user]);

  useEffect(() => {
    setBarbearia(barbearia); // inicia conexão socket que depende de 'barbearia'
  }, [barbearia]);

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <Navbar />
          <Menu />
          <Outlet />
          <MenuFooter user={user} />
        </div>
      </div>
    </>
  );
};
