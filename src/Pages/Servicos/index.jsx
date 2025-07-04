import { useContext, useEffect, useState } from "react";
import "./index.css";
import { ServicoContext } from "../../Context/ServicoContext";
import { ModalServico } from "./ModalServico";
import { EditarExcluir } from "./EditarExcluir";
import { ModalExcluir } from "../../Components/ModalExcluir";
import { SpanAdd } from "../../Components/SpanAdd";
import { UserContext } from "../../Context/UserContext";
import { BarbeariaContext } from "../../Context/BarbeariaContext";

export const Servicos = () => {
  const {
    servicos,
    servicoEscolhido,
    setServicoEscolhido,
    excluirServico,
  } = useContext(ServicoContext);
  const [showModalServico, setShowModalServico] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const { usuario } = useContext(UserContext);
  const { loadData } = useContext(BarbeariaContext);

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
            {/* Card serviço */}
            {!loadData &&
              servicos.map((servico) => (
                <li
                  key={servico.id}
                  className={
                    servicoEscolhido && servicoEscolhido.id === servico.id
                      ? "item-servico-ativo"
                      : "item-servico"
                  }
                >
                  <div className="encapsula-servico">
                    <img
                      src={`${process.env.REACT_APP_IMG_PATH_SERVER}/${servico.caminhoImagem}`}
                      alt={servico.nome}
                      className="imagem-servico"
                    />
                    <div className="info-servico">
                      {usuario?.adm && (
                        <EditarExcluir
                          servico={servico}
                          setShowModalServico={setShowModalServico}
                          setShowModalExcluir={setShowModalExcluir}
                        />
                      )}
                      <h4 className="nome-servico">{servico.nome}</h4>
                      <p className="prazo-servico">{servico.prazo}</p>
                      <p className="preco-servico">R${servico.preco},00</p>
                    </div>
                  </div>
                  <button
                    className={
                      servicoEscolhido && servicoEscolhido.id === servico.id
                        ? "botao-escolher-servico-ativado"
                        : "botao-escolher-servico"
                    }
                    onClick={() => {
                      if (servicoEscolhido?.id === servico.id) {
                        setServicoEscolhido(null);
                        return;
                      }
                      if (servicoEscolhido?.id !== servico.id) {
                        setServicoEscolhido(servico);
                      }
                      setServicoEscolhido(servico);
                    }}
                  >
                    {servicoEscolhido && servicoEscolhido.id === servico.id
                      ? "Escolhido"
                      : "Escolher"}
                  </button>
                </li>
              ))}
            {/* Icone load */}
            {loadData && (
              <li className="div-load-barbearia">
                <img src="/load.gif" alt="" />
              </li>
            )}
          </ul>
          {usuario?.adm && (
            <SpanAdd
              setShow={setShowModalServico}
              entity={servicos}
              text={"Cadastre um serviço aqui!"}
            />
          )}
        </div>
      </div>
    </>
  );
};
