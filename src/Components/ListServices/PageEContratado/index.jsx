import './index.css';
import { EditarExcluir } from "../EditarExcluir";
import { useContext } from 'react';
import { ServicoContext } from '../../../Context/ServicoContext';

export const PageEContratado = ({
  user,
  servico,
  setEditarServico,
  setShowModalServico,
  setServicoASerExcluido,
  setShowModalExcluirServico,
}) => {

  const { 
    servicoAgendado,
    servicoEscolhido,
  } = useContext(ServicoContext);

  return (
    <>
      <div className="d-flex justify-content-end align-items-center col-3">
        <div className="col-9">
          <h6 className="m-0 nome-servico">{servico?.PRECO}</h6>
          {(servicoEscolhido?.contratado &&
            servicoEscolhido?.id === servico?.ID) ||
          servicoAgendado?.ID === servico.ID ? (
            <div className="container imagem-height">
              <img
                src="/icones_menu_bottom/verificado.gif"
                className="img-fluid mx-3 cursor"
                alt=""
              />
            </div>
          ) : (
            <a
              href="#"
              className="d-block m-0 mt-2 text-success text-decoration-none nome-servico"
            >
              Escolher
            </a>
          )}
          {user?.ADM && (
            <EditarExcluir
              servico={servico}
              setEditarServico={setEditarServico}
              setShowModalServico={setShowModalServico}
              setServicoASerExcluido={setServicoASerExcluido}
              setShowModalExcluirServico={setShowModalExcluirServico}
            />
          )}
        </div>
      </div>
    </>
  );
};
