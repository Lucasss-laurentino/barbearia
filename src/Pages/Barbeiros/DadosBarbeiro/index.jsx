import { useContext } from 'react';
import './index.css';
import { UserContext } from '../../../Context/UserContext';
import { AcoesADM } from './AcoesADM';
import { IconeRelogioMostraHorarios } from './IconeRelogioMostraHorarios';

export const DadosBarbeiro = ({ barbeiro }) => {

    const { user } = useContext(UserContext);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center col-8">
                    <div className="col-3 mx-2 div-redonda-barbeiro">
                        <img
                            className="img-fluid"
                            src={process.env.REACT_APP_API_URL + barbeiro.IMAGEM}
                            width="100%"
                            alt={barbeiro.NOME}
                        />
                    </div>
                    <div className="col-7 overflow-hidden">
                        <h6 className="m-0 nome-barbeiro">{barbeiro.NOME}</h6>
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center col-4 flex-column">
                    {user?.ADM && (
                        <AcoesADM barbeiro={barbeiro}/>
                    )}
                    <IconeRelogioMostraHorarios barbeiro={barbeiro}/>
                </div>
            </div>
        </>
    );
}