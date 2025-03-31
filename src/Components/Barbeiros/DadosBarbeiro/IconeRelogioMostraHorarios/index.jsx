import { useContext } from 'react';
import { AnimacaoContext } from '../../../../Context/AnimacaoHorarios';
import './index.css';
import { HorarioContext } from '../../../../Context/HorarioContext';

export const IconeRelogioMostraHorarios = ({ barbeiro }) => {

    const { abrirListaHorarios } = useContext(AnimacaoContext);
    const { horariosAberto, setHorariosAberto } = useContext(HorarioContext);

    return (
        <>
            <div className="icon-relogio-responsivo px-1">
                <div className="icon-time d-flex justify-content-center" id={`icon-time-${barbeiro.ID}`}
                  onClick={() =>
                    abrirListaHorarios(barbeiro.ID, horariosAberto, setHorariosAberto)
                  }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-clock-fill mx-1 cursor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    </svg>
                </div>
                <div className="icon-more d-flex justify-content-center" id={`icon-mais-${barbeiro.ID}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-down-short"
                        viewBox="0 0 16 16"
                    >
                        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
                    </svg>
                </div>
            </div>
        </>
    )
}