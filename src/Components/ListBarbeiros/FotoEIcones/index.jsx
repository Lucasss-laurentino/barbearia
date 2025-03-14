import { useContext } from 'react';
import './index.css';
import { BarbeiroContext } from '../../../Context/BarbeiroContext';

export const FotoEIcones = ({barbeiro, user, setId, abrirListaHorarios, horariosAberto, setHorariosAberto }) => {
  
  const { 
    setBarbeiroSelecionado,
    setExcluirHorario,
    setShowModalBarbeiro,
  } = useContext(BarbeiroContext);
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        {/* FOTO E NOME DO BARBEIRO */}
        <div className="d-flex justify-content-start align-items-center col-8">
          <div className="col-3 mx-3 div-redonda-barbeiro">
            <img
              className="img-fluid"
              src={process.env.REACT_APP_API_URL + barbeiro.IMAGEM}
              width="100%"
              alt={barbeiro.NOME}
            />
          </div>
          <div className="col-9">
            <h6 className="m-0 nome-barbeiro">{barbeiro.NOME}</h6>
          </div>
        </div>
        {/* ICONE RELOGIO E ICONES ADMINISTRATIVOS */}
        <div className="d-flex justify-content-end align-items-center col-4 flex-column">
          {user?.ADM && (
            <div className="container-fluid d-flex justify-content-center align-items-center mt-1 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-trash3-fill mx-1 cursor"
                viewBox="0 0 16 16"
                onClick={() => {
                  setExcluirHorario(true);
                  setBarbeiroSelecionado(barbeiro);
                  setId(3);
                }}
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
                onClick={() => {
                  setBarbeiroSelecionado(barbeiro);
                  setShowModalBarbeiro(true);
                }}
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </div>
          )}
          <div
            className="icon-relogio-responsivo px-1"
            onClick={() =>
              abrirListaHorarios(barbeiro.ID, horariosAberto, setHorariosAberto)
            }
          >
            <div
              className="icon-time d-flex justify-content-center"
              id={`icon-time-${barbeiro.ID}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-clock-fill mx-3 cursor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              </svg>
            </div>
            <div
              className="icon-more d-flex justify-content-center"
              id={`icon-mais-${barbeiro.ID}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-down-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
