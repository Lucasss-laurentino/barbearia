import { useContext, useEffect, useState } from 'react';
import { AdicionarHorario } from './AdicionarHorario';
import './index.css';
import { UserContext } from '../../../Context/UserContext';
import { Data } from './Data';
import { HorarioContext } from '../../../Context/HorarioContext';
import { DataContext } from '../../../Context/DataContext';
import { HorarioMarcadoContext } from '../../../Context/HorarioMarcadoContext';
import { ItemDaLista } from './ItemDaLista';

export const ListaDeHorarios = ({barbeiro}) => {

    const { user } = useContext(UserContext);
    const [horariosDessaData, setHorariosDessaData] = useState([]);
    const [horariosDesseBarbeiro, setHorariosDesseBarbeiro] = useState([]);
    const { horarios, aplicarFiltragensPraExibirHorarios } = useContext(HorarioContext);
    const { data } = useContext(DataContext);
    const { horariosMarcado } = useContext(HorarioMarcadoContext);

    useEffect(() => {
        setHorariosDesseBarbeiro(() => {
          return horarios.filter((horario) => (horario.BARBEIRO_ID === barbeiro.ID))
        });
    },[horarios]);

    useEffect(() => {
      if(user?.ADM) setHorariosDessaData([...horariosDesseBarbeiro]);
      if(!user?.ADM) aplicarFiltragensPraExibirHorarios(horariosDesseBarbeiro, setHorariosDessaData, data, horariosMarcado);
    }, [horariosDesseBarbeiro])

    return (
        <>
            <div className="d-flex z-ind justify-content-center align-items-center flex-column">
                <ul className="horarios-fechado" id={barbeiro.ID}>
                    { user?.ADM && <AdicionarHorario barbeiro={barbeiro} /> }
                    <Data />
                    {horariosDessaData.map((horarioFiltrado) => (
                      <ItemDaLista horario={horarioFiltrado} key={horarioFiltrado.ID} barbeiro={barbeiro} />
                    ))}
                </ul>
            </div>
        </>
    );
}