import { useContext, useEffect } from 'react';
import './index.css';
import { BarbeiroContext } from '../../Context/BarbeiroContext';
import { useParams } from 'react-router-dom';
import { DadosBarbeiro } from './DadosBarbeiro';
import { HorariosDesseBarbeiro } from './HorariosDesseBarbeiro';
import { ListaDeHorarios } from './ListaDeHorarios';

export const Barbeiros = () => {

    const { barbearia } = useParams();

    const {
        pegarBarbeiros,
        barbeiros,
    } = useContext(BarbeiroContext);

    useEffect(() => {
        pegarBarbeiros(barbearia);
    }, []);

    return (
        <>  
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 d-flex justify-content-center align-items-center p-0">
                        <ul className="col-12 list-style heiht-scroll">
                            {barbeiros.map((barbeiro) => {
                                return (
                                    <li className="py-1 border-list-services text-claro">
                                        <DadosBarbeiro barbeiro={barbeiro} />
                                        <HorariosDesseBarbeiro barbeiro={barbeiro}/>
                                        <ListaDeHorarios barbeiro={barbeiro} />                                      
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}