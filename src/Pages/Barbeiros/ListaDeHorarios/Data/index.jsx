import { useContext, useEffect, useState } from 'react';
import './index.css';
import { DataContext } from '../../../../Context/DataContext';

export const Data = () => {

    const { data, pegarDataDeHoje } = useContext(DataContext);
    const [classeCalendario, setClasseCalendario] = useState("encapsula-calendario-hidden");
    const [calendarioAberto, setCalendarioAberto] = useState(false);

    useEffect(() => {
        pegarDataDeHoje();
    }, []);

    return (
        <>
            <li
                className="d-flex justify-content-center align-items-center my-3 text-white"
                onClick={() => {
                    setClasseCalendario("encapsula-calendario");
                    setCalendarioAberto(true);
                }}
            >
                <p className="m-0 cursor">{data}</p>
            </li>
        </>
    );
}