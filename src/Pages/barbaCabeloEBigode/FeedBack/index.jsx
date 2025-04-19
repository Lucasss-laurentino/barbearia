export const FeedBack = () => {
    return (
      <>
        <section className="py-5 border-bottom">
          <div className="container px-5 my-5 px-5">
            <div className="text-center mb-5">
              <h2 className="fw-bolder">Depoimentos de clientes</h2>
              <p className="lead mb-0">
                Nossos clientes adoram trabalhar conosco
              </p>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-1">
                          Obrigado por montar um produto tão bom. Nós amamos
                          trabalhar com você e toda a equipe, e iremos
                          recomendá-lo a outros!
                        </p>
                        <div className="small text-muted">- Douglas R.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-1">
                          Toda a equipe foi uma grande ajuda para juntar as
                          coisas para nossa empresa e marca. Nós os
                          contrataremos novamente em um futuro próximo para
                          trabalho adicional!
                        </p>
                        <div className="small text-muted">
                          - Juliane F.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}