export const AtivarAssinatura = () => {
  return (
    <>
      <div className="fundo-imagem-assinatura-bloqueada">
        <div className="cortina-transparente-assinatura-bloqueada">
          <div className="alerta-assinatura-bloqueada">
            <h2>Sua assinatura está desativada!</h2>
            <p>
              O seu período de uso gratuito terminou. Para continuar usufruindo
              de nossos serviços, será cobrada uma taxa recorrente mensal
              diretamente no seu cartão de crédito. A cobrança será realizada
              automaticamente até que você decida cancelar sua assinatura.
            </p>

            <button className="botao-pagamento">Reativar</button>
          </div>
        </div>
      </div>
    </>
  );
};
