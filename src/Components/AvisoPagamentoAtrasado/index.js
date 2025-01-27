import { useContext, useEffect, useState } from "react";
import "./index.css";
import { FormPagamento } from "../FormPagamento";
import { useNavigate, useParams } from "react-router-dom";
import { AssinaturaContext } from "../../Context/AssinaturaContext";

export const AvisoPagamentoAtrasado = () => {
  const [assinar, setAssinar] = useState(false);
  const [planoDesativado, setPlanoDesativado] = useState();
  const { assinatura, getAssinatura, ativarAssinatura } = useContext(AssinaturaContext);
  const navigate = useNavigate();
  const { barbearia } = useParams();
  
  useEffect(() => {
    getAssinatura();
  }, [])

  useEffect(() => {
    if(assinatura && assinatura?.PLANO_ATIVO) navigate(`/${barbearia}`);
    if(assinatura && !assinatura?.PLANO_ATIVO) {
      setPlanoDesativado(true);
    }
  }, [assinatura]);

  return (
    <>
      {!assinar ? (
        <div className="fundo-imagem-assinatura-bloqueada">
          <div className="cortina-transparente-assinatura-bloqueada">
            <div className="alerta-assinatura-bloqueada">
              <h2>{planoDesativado ? "Sua assinatura está desativada!" : "Seu plano gratuito expirou!"}</h2>
              <p>
                O seu período de uso gratuito terminou. Para continuar
                usufruindo de nossos serviços, será cobrada uma taxa recorrente
                mensal diretamente no seu cartão de crédito. A cobrança será
                realizada automaticamente até que você decida cancelar sua
                assinatura.
              </p>

              <button
                className="botao-pagamento"
                onClick={() => {
                  if(planoDesativado) {
                    ativarAssinatura(barbearia);
                  } else {
                    setAssinar(true)
                  }
                }}
              >
              {planoDesativado ? "Reativar" : "Assine agora"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <FormPagamento />
      )}
    </>
  );
};
