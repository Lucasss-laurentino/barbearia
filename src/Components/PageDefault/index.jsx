import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar';
import './index.css';
import { MenuFooter } from '../MenuFooter';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';

export const PageDefault = () => {

  const navigate = useNavigate();
  const { pegarUsuario, user } = useContext(UserContext);
  const { barbearia } = useParams();

  useEffect(() => {
    pegarUsuario();
  }, []);

  useEffect(() => {
    if(user !== null && !user?.ADM) {
      navigate(`/${barbearia}/servicos`);
    }

    if(user !== null && user?.ADM) {
      navigate(`/${barbearia}/teste`);
    }
  }, [user])

  return (
    <>
    
      <div className="background-foto">
        <div className="background-transparente">
          <Navbar />
          <Outlet />
          <MenuFooter user={user}/>
        </div>
      </div>      

    
    </>
  )
}