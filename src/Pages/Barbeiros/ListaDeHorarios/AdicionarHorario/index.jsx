import { useContext, useState } from 'react';
import './index.css';
import { BarbeiroContext } from '../../../../Context/BarbeiroContext';
import { ModalCriarHorarioBarbeiro } from '../../ModalCriarHorarioBarbeiro';

export const AdicionarHorario = ({ barbeiro }) => {

  const { setBarbeiro } = useContext(BarbeiroContext);

  const [showHorariosBarbeiro, setShowHorariosBarbeiro] = useState(false);

  const handleCloseHorarioBarbeiro = () => setShowHorariosBarbeiro(false);

  return (
    <>
     <ModalCriarHorarioBarbeiro
      show={showHorariosBarbeiro}
      setShow={setShowHorariosBarbeiro}
      handleClose={handleCloseHorarioBarbeiro}
      barbeiro={barbeiro}
     />
      <li
        className="d-flex justify-content-center align-items-center my-3 text-white"
        onClick={() => {
          setBarbeiro(barbeiro);
          setShowHorariosBarbeiro(true);
        }}
      >
        <p className="m-0 cursor">adicionar horário +</p>
      </li>
    </>
  );
}