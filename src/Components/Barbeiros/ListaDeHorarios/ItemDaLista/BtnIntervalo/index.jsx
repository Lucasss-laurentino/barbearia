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
                    ${user?.ADM && horario.INTERVALO ? "btn-almoco-ativado" : ""} 
                    ${user?.ADM && !horario.INTERVALO ? "btn-almoco-desativado" : ""}`
                }
                onClick={() => marcarAlmoco(horario)}
            >
                Almoço
            </button>
        </>
    );
}