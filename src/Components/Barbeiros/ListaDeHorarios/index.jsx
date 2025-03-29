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
    const { horarios } = useContext(HorarioContext);
    const { data } = useContext(DataContext);
    const { horariosMarcado } = useContext(HorarioMarcadoContext);

    const aplicarFiltragensPraExibirHorarios = () => {
        const hora = new Date().getHours();
        const horariosAcimaDaHoraAtual = horariosDessaData.filter((horario) => {
          if (horario.HORA.split(":")[0] > hora) {
            return horario;
          }
        });
        const horariosFiltrado = horariosAcimaDaHoraAtual.filter((horarioDisponivel) => {
            if (data) {
              const horariosNaoAgendado = horariosMarcado.some((horarioMarcado) => {
                if (horarioMarcado.HORARIO_ID === horarioDisponivel.ID) {
                  if (horarioMarcado.DATA === data) {
                    return horarioMarcado;
                  }
                }
              });
              if (!horariosNaoAgendado) {
                return horarioDisponivel;
              }
            }
        });
        setHorariosDessaData([...horariosFiltrado]);
    }

    useEffect(() => {     
        const horariosDesseBarbeiro = horarios.filter((horario) => (horario.BARBEIRO_ID === barbeiro.ID));
        if(user?.ADM) setHorariosDessaData([...horariosDesseBarbeiro]);
        aplicarFiltragensPraExibirHorarios();
    },[horarios]);

    return (
        <>
            <div className="d-flex z-ind justify-content-center align-items-center flex-column">
                <ul className="horarios-fechado" id={barbeiro.ID}>
                    { user?.ADM && <AdicionarHorario barbeiro={barbeiro} /> }
                    <Data />
                    {horariosDessaData.map((horarioFiltrado) => (
                        <ItemDaLista horario={horarioFiltrado}/>
                    ))}
                </ul>
            </div>
        </>
    );
}