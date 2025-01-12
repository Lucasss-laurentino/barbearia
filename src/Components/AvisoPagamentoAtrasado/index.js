import { useContext, useEffect, useState } from "react";
import "./index.css";
import { FormPagamento } from "../FormPagamento";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

export const AvisoPagamentoAtrasado = () => {
  const [assinar, setAssinar] = useState(false);
  const { barbearia } = useParams();
  const { user, pegarUsuario } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    pegarUsuario();
  }, []);

  useEffect(() => {
    if (user.ADM) {
      const vencimento = new Date(user.VENCIMENTO);
      const agora = new Date();
      if (vencimento <= agora) {
        // antes de encaminhar pra pagina bloqueada
        // verificar se usuario possui assinatura
        // se nao possuir assinatura encaminhar direto pra pagina bloqueada
        // se possuir assinatura manter o usuario usando o sistema e inserir avisos de fatura atrasada
        navigate(`/${barbearia}/assinaturabloqueada`);
      } else {
        navigate(`/${barbearia}`);
      }
    }
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
        <FormPagamento />
      )}
    </>
  );
};
