import './index.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext, useEffect } from 'react';
import { AssinaturaContext } from '../../Context/AssinaturaContext';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MutatingDots } from "react-loader-spinner";

export const ModalDesativarAssinatura = ({show, handleClose}) => {

    const { desativarAssinatura, erroAssinatura, setErroAssinatura, assinaturaLoader } = useContext(AssinaturaContext);
    
    useEffect(() => {
        if(erroAssinatura !== null) {
            toast.error(erroAssinatura, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });

            setErroAssinatura(null);
        }
    }, [erroAssinatura])

    return (
        <>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
        transition={Bounce}
        />

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
            keyboard={false}
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <h2>Aviso Importante</h2>
                <p>
                    Prezado(a) usuário(a), caso opte por prosseguir com esta ação, informamos que sua assinatura será 
                    desativada temporariamente caso nao retorne até o dia do vencimento da fatura a sua assinatura será cancelada permanentemente.
                </p>
                {!assinaturaLoader ? (
                    <button className="btn btn-sm btn-danger" onClick={desativarAssinatura}>Entendido</button>
                ) : (
                    <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#6d6d6d"
                    secondaryColor="#6d6d6d"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center"
                  />    
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}