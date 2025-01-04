import { useState } from "react";
import "./index.css";
import { FormPagamento } from "../FormPagamento";

export const AvisoPagamentoAtrasado = () => {
  const [assinar, setAssinar] = useState(false);

  return (
    <>
      {!assinar ? (
        <div className="fundo-imagem-assinatura-bloqueada">
          <div className="cortina-transparente-assinatura-bloqueada">
            <div className="alerta-assinatura-bloqueada">
              <h2>Seu plano gratuito expirou!</h2>
              <p>
                O seu período de uso gratuito terminou. Para continuar
                usufruindo de nossos serviços, será cobrada uma taxa recorrente
                mensal diretamente no seu cartão de crédito. A cobrança será
                realizada automaticamente até que você decida cancelar sua
                assinatura.
              </p>

              <button
                className="botao-pagamento"
                onClick={() => setAssinar(true)}
              >
                Assine agora
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
