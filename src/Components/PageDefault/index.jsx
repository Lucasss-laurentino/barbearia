import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar';
import './index.css';
import { MenuFooter } from '../MenuFooter';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Menu } from '../Menu';

export const PageDefault = () => {

  const navigate = useNavigate();
  const { pegarUsuario, user } = useContext(UserContext);
  const { barbearia } = useParams();

  useEffect(() => {
    pegarUsuario();
  }, []);

  useEffect(() => {
    // Dependendo se o usuario for adm ou cliente e direcionado pra rotas diferente
    if(user !== null && !user?.ADM) {
      navigate(`/${barbearia}/servicos`);
    }

    if(user !== null && user?.ADM) {
      navigate(`/${barbearia}/agendamentos`);
    }
  }, [user])

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <Navbar />
          <Menu />
          <Outlet />
          <MenuFooter user={user}/>
        </div>
      </div>      
    </>
  )
}