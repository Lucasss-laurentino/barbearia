import { useContext } from 'react';
import './index.css';
import { UserContext } from '../../../../Context/UserContext';
import { BtnIntervalo } from './BtnIntervalo';
import { BtnAgendar } from './BtnAgendar';
import { EditarExcluir } from './EditarExcluir';

export const ItemDaLista = ({horario, barbeiro}) => {

    const { user } = useContext(UserContext);

    return (
      <>
        <li className="d-flex justify-content-around align-items-center my-2">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <p className="m-0 p-0">{horario.HORA}</p>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-end align-items-center">
              {user?.ADM && <BtnIntervalo horario={horario} />}
              {!user?.ADM && <BtnAgendar horario={horario} />}
              {user?.ADM && <EditarExcluir horario={horario} barbeiro={barbeiro} />}
            </div>
          </div>
        </li>
      </>
    );
}