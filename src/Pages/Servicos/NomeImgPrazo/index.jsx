import './index.css';

export const NomeImgPrazo = ({ servico }) => {
  return (
    <>
      <div className="d-flex justify-content-start align-items-center col-8">
        <div className="col-3 mx-3">
          <div className="div-redonda-servico">
            <img
              className="img-fluid"
              src={process.env.REACT_APP_API_URL + servico.IMAGEM_SERVICO}
            />
          </div>
        </div>
        <div className="col-9">
          <h6 className="m-0 nome-servico">{servico.NOME_SERVICO}</h6>
          <p className="m-0 nome-servico">{servico.PRAZO}</p>
        </div>
      </div>
    </>
  );
};
