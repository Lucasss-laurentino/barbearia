import { useContext, useEffect } from "react";
import { AssinaturaContext } from "../../Context/AssinaturaContext";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

export const AtivarAssinatura = () => {
  
  const { ativarAssinatura, assinaturaLoader, assinatura, getAssinatura } = useContext(AssinaturaContext);
  
  const { barbearia } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAssinatura();
  }, []);

  useEffect(() => {
    if(assinatura?.PLANO_ATIVO) navigate(`/${barbearia}`);
  }, [assinatura]);

  return (
    <>
      <div className="fundo-imagem-assinatura-bloqueada">
        <div className="cortina-transparente-assinatura-bloqueada">
          <div className="alerta-assinatura-bloqueada">
            <h2>Sua assinatura está desativada!</h2>
            <p>
              Para continuar usufruindo
              de nossos serviços, será cobrada uma taxa recorrente mensal
              diretamente no seu cartão de crédito. A cobrança será realizada
              automaticamente até que você decida cancelar sua assinatura.
            </p>

            {!assinaturaLoader ? (
              <button className="botao-pagamento" onClick={() => ativarAssinatura(barbearia)}>Reativar</button>
            ) : (
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#6d6d6d"
                secondaryColor="#6d6d6d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass="justify-content-center my-2"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
