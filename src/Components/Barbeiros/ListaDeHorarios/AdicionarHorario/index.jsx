import { useContext } from 'react';
import './index.css';
import { BarbeiroContext } from '../../../../Context/BarbeiroContext';

export const AdicionarHorario = ({barbeiro}) => {

    const { setBarbeiro } = useContext(BarbeiroContext);

    return (
        <>
         <li
            className="d-flex justify-content-center align-items-center my-3 text-white"
            onClick={() => {
              setBarbeiro(barbeiro);
             // setShowHorarios(true);
            }}
          >
            <p className="m-0 cursor">adicionar horário +</p>
          </li>
        </>
    );
}