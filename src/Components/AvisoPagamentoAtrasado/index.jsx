import { useContext, useEffect, useState } from "react";
import "./index.css";
import { FormPagamentoAssinatura } from "../FormPagamentoAssinatura";
import { AssinaturaContext } from "../../Context/AssinaturaContext";
import { UserContext } from "../../Context/UserContext";
import { PlanoContext } from "../../Context/PlanoContext";

export const AvisoPagamentoAtrasado = () => {
  const [assinar, setAssinar] = useState(false);

  const { getAssinatura } = useContext(AssinaturaContext);
  const { getMeuPlano } = useContext(PlanoContext);

  const { user } = useContext(UserContext);

  useEffect(() => {
   getAssinatura();
   getMeuPlano();
  }, [user]);

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
        <FormPagamentoAssinatura />
      )}
    </>
  );
};
