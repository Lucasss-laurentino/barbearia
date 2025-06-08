import { useContext, useState } from "react";
import "./index.css";
import { SpanAddServico } from "./SpanAddServico";
import { ServicoContext } from "../../Context/ServicoContext";
import { ModalServico } from "./ModalServico";
import { EditarExcluir } from "./EditarExcluir";
import { ModalExcluir } from "../../Components/ModalExcluir";

export const Servicos = () => {
  const { servicos, servicoEscolhido, excluirServico } = useContext(ServicoContext);
  const [showModalServico, setShowModalServico] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);

  return (
    <>
      <ModalServico
        show={showModalServico}
        setShow={setShowModalServico}
        servico={servicoEscolhido}
      />

      <ModalExcluir
        show={showModalExcluir}
        setShow={setShowModalExcluir}
        itemParaExclusao={servicoEscolhido}
        nomeItemExclusao={"Serviço"}
        funcExcluir={excluirServico}
      />

      <div className="pagina-servicos">
        <div className="servicos-container">
          <ul className="lista-servicos">
            {servicos.map((servico) => (
              <li key={servico.id} className="item-servico">
                <img
                  src={`${process.env.REACT_APP_IMG_PATH_SERVER}/${servico.caminhoImagem}`}
                  alt={servico.nome}
                  className="imagem-servico"
                />
                <div className="info-servico">
                  <EditarExcluir
                    servico={servico}
                    setShowModalServico={setShowModalServico}
                    setShowModalExcluir={setShowModalExcluir}
                  />
                  <h4 className="nome-servico">{servico.nome}</h4>
                  <p className="prazo-servico">{servico.prazo}</p>
                  <p className="preco-servico">R${servico.preco},00</p>
                </div>
              </li>
            ))}
          </ul>
          <SpanAddServico setShow={setShowModalServico} />
        </div>
      </div>
    </>
  );
};
