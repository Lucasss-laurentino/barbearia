import { useContext, useState } from "react";
import "./index.css";
import { ServicoContext } from "../../Context/ServicoContext";
import { ModalServico } from "./ModalServico";
import { EditarExcluir } from "./EditarExcluir";
import { ModalExcluir } from "../../Components/ModalExcluir";
import { SpanAdd } from "../../Components/SpanAdd";
import { UserContext } from "../../Context/UserContext";
import { BarbeariaContext } from "../../Context/BarbeariaContext";

export const Servicos = () => {
  const { servicos, servicoEscolhido, setServicoEscolhido, excluirServico, escolhido, setEscolhido } =
    useContext(ServicoContext);
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

      <div className="li-servicos-pagina">
        <div className="li-servicos-container">
          <ul className="li-servicos-lista">
            {!loadData &&
              servicos.map((servico) => (
                <li
                  key={servico.id}
                  className={
                    escolhido && servicoEscolhido && servicoEscolhido.id === servico.id
                      ? "li-servico-item-ativo"
                      : "li-servico-item"
                  }
                >
                  <div className="li-servico-encapsula">
                    <img
                      src={`${process.env.REACT_APP_IMG_PATH_SERVER}/${servico.caminhoImagem}`}
                      alt={servico.nome}
                      className="li-servico-imagem"
                    />
                    <div className="li-servico-info">
                      {usuario?.adm && (
                        <EditarExcluir
                          servico={servico}
                          setShowModalServico={setShowModalServico}
                          setShowModalExcluir={setShowModalExcluir}
                        />
                      )}
                      <h4 className="li-servico-nome">{servico.nome}</h4>
                      <p className="li-servico-prazo">{servico.prazo}</p>
                      <p className="li-servico-preco">R${servico.preco},00</p>
                    </div>
                  </div>
                  <button
                    className={
                      escolhido && servicoEscolhido && servicoEscolhido.id === servico.id
                        ? "li-servico-btn-escolher-ativo"
                        : "li-servico-btn-escolher"
                    }
                    onClick={() => {
                      if (servicoEscolhido?.id === servico.id) {
                        setServicoEscolhido(null);
                        setEscolhido(false);
                        return;
                      }
                      setServicoEscolhido(servico);
                      setEscolhido(true);
                    }}
                  >
                    {escolhido && servicoEscolhido && servicoEscolhido.id === servico.id
                      ? "Escolhido"
                      : "Escolher"}
                  </button>
                </li>
              ))}
            {loadData && (
              <li className="li-servico-load">
                <img src="/load.gif" alt="Carregando..." />
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
