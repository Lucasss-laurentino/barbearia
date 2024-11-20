import "./index.css";

export const CardFinanceiro = ({ preco, periodo }) => {
  return (
    <>
      <div className="card-financeiro">
        <div className="preco mx-2 my-1 text-white">
          <h5 className="preco-finalizados">
            <strong>R$ {preco}</strong>
          </h5>
        </div>
        <div className="periodo mx-2">
          <p className="text-periodo-mensal">Saldo {periodo}</p>
        </div>
      </div>
    </>
  );
};
