import { useContext } from 'react';
import './index.css';
import { UserContext } from '../../../../../Context/UserContext';
import { HorarioContext } from '../../../../../Context/HorarioContext';

export const BtnIntervalo = ({horario}) => {
    
    const { user } = useContext(UserContext);
    const { marcarAlmoco } = useContext(HorarioContext);
    
    return (
        <>
            <button
                className={`
                    ${user?.ADM && horario.INTERVALO ? "btn btn-sm mx-2 border border-success text-success" : ""} 
                    ${user?.ADM && !horario.INTERVALO ? "btn btn-sm bg-transparent mx-2 text-white border border-white" : ""}`
                }
                onClick={() => marcarAlmoco(horario)}
            >
                Almoço
            </button>
        </>
    );
}