import "./index.css";

export const NotFound = () => {
  return (
    <>
      <div className="container-fluid notFound">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center mt-5">
            <img
              src="/logo_preto.png"
              width={"40%"}
              className="img-fluid mt-5 pt-3"
              alt=""
            />
          </div>
          <div className="col-12 d-flex justify-content-center pt-5">
            <h2 className="m-0 text-secondary">Página não encontrada !</h2>
          </div>
        </div>
      </div>
    </>
  );
};
