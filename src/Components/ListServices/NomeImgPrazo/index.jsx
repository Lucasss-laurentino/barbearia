import './index.css';

export const NomeImgPrazo = ({ servico }) => {
  return (
    <>
      <div className="d-flex justify-content-start align-items-center col-8">
        <div className="col-3 mx-3">
          <div className="div-redonda-servico">
            <img
              className="img-fluid img-corte"
              src={process.env.REACT_APP_API_URL + servico.IMAGEM_SERVICO}
              width="100%"
            />
          </div>
        </div>
        <div className="col-9">
          <h6 className="m-0">{servico.NOME_SERVICO}</h6>
          <p className="m-0">{servico.PRAZO}</p>
        </div>
      </div>
    </>
  );
};
