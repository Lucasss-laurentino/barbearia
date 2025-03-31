import { useContext } from 'react';
import './index.css';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServicoContext } from '../../../../../Context/ServicoContext';
import { UserContext } from '../../../../../Context/UserContext';
import { BarbeiroContext } from '../../../../../Context/BarbeiroContext';
import { SocketContext } from '../../../../../Context/SocketContext';
import { DataContext } from '../../../../../Context/DataContext';
import { HorarioContext } from '../../../../../Context/HorarioContext';

export const BtnAgendar = ({horario}) => {

    const { servicoEscolhido } = useContext(ServicoContext);
    const { user } = useContext(UserContext);
    const { setHorarioSelecionado } = useContext(HorarioContext);
    const { agendarViaSocket } = useContext(SocketContext);
    const { data } = useContext(DataContext);

    const verificaAntesDeAgendar = () => {
        if(!servicoEscolhido) {
            toast.error("Escolha um serviço antes de agendar um horário !",
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                }
            );
        }

        if (servicoEscolhido && !user?.ID) {
            setHorarioSelecionado(horario);
            // setShowModalMarcarHorarioDeslogado(true);            
        } else if(servicoEscolhido && user?.ID) {
            setHorarioSelecionado(horario);
            agendarViaSocket(
                { NOME_CLIENTE: user.NOME },
                horario,
                servicoEscolhido,
                data,
                user
            );
        }
    }

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
            <button
                className="btn btn-sm bg-transparent mx-2 text-white"
                onClick={() => verificaAntesDeAgendar()}
            >
                Marcar
            </button>
        </>
    );
}