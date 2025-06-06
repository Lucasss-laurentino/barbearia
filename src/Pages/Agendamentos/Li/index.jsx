import "./index.css";

export const Li = ({ agendamento }) => {
  return (
    <li className="py-1 border-list-services text-claro">
      <div className="col-12 d-flex justify-content-between align-items-center flex-column">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="col-8">
            <div className="encapsula-icon d-flex justify-content-start align-items-center background-claro col-12">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-clock mx-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                </svg>
              </div>
              <div className="hr">
                <p className="m-0"></p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="encapsula-icon-wpp">
              <div className="icon pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#127617"
                  className="bi bi-whatsapp my-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex">
          <div className="col-8 d-flex justify-content-center">
            <div className="container p-0">
              <h6 className="mx-2 my-1 texto-responsivo">Cliente: Nome</h6>
              <p className="mx-2 texto-responsivo">Serviço: Nome</p>
            </div>
          </div>
          <div className="col-4">
            <div className="container d-flex justify-content-center align-items-end flex-column">
              <h6 className="my-2 texto-responsivo">Preço</h6>
              <p className="m-0 texto-responsivo">Prazo</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-1" />
      <div className="col-12 d-flex justify-content-around align-items-center personalizar-div-foto">
        <div className="col-2 d-flex justify-content-center align-items-center">
        </div>
        <div className="col-8 d-flex justify-content-end align-items-center">
        </div>
      </div>
      <div className="col-12 d-flex justify-content-between align-items-center flex-column">
      </div>
    </li>
  );
};
