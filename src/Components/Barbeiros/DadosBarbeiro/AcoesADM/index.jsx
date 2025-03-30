import { useContext, useEffect, useState } from 'react';
import { ModalExcluir } from '../../../ModalExcluir';
import './index.css';
import { BarbeiroContext } from '../../../../Context/BarbeiroContext';
import { ModalBarbeiroEditar } from '../../../ModalBarbeiroEditar';

export const AcoesADM = ({ barbeiro }) => {

    const {
        excluirBarbeiro,
        barbeiroSelecionado
    } = useContext(BarbeiroContext);

    const [showModalEditar, setShowModalEditar] = useState(false);
    const handleCloseModalEditar = () => setShowModalEditar(false);

    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const handleCloseModalExcluir = () => setShowModalExcluir(false);

    useEffect(() => {
        if(barbeiroSelecionado === null) setShowModalExcluir(false);
    }, [barbeiroSelecionado])

    return (
        <>
            <ModalExcluir
                show={showModalExcluir}
                handleClose={handleCloseModalExcluir}
                itemParaExclusao={barbeiro}
                nomeItemExclusao={"Barbeiro"}
                funcExcluir={excluirBarbeiro}
            />

            <ModalBarbeiroEditar
                show={showModalEditar}
                setShow={setShowModalEditar}
                handleClose={handleCloseModalEditar}
                barbeiro={barbeiro}
            />

            <div className="container-fluid d-flex justify-content-center align-items-center mt-1 mb-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-trash3-fill mx-1 cursor"
                    viewBox="0 0 16 16"
                    onClick={() => setShowModalExcluir(true)}
                >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-pencil-square mx-3 cursor"
                    viewBox="0 0 16 16"
                    onClick={() => setShowModalEditar(true)}
                >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                </svg>
            </div>
        </>
    )
}