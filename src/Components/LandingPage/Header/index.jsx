import "./index.css";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

export const Header = () => {
  return (
    <>
      <header className="bg-dark py-4">
        <div className="col-12 d-md-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center col-12 col-md-6 col-lg-6 anima-esquerda-pra-direita">
            <div className="text-center my-5 col-8 col-md-12">
              <h1 className="display-5 fw-bolder text-white mb-2">
                A Melhor Gestão Pra sua Barbearia
              </h1>
              <p className="lead text-white-50 mb-4">
                Já imaginou seus clientes agendando horários sozinhos sem
                precisar te chamar no WhatsApp? Agora é possível!
              </p>
              <div className="d-grid gap-3 justify-content-center d-flex align-items-center">
                <a
                  href="/login"
                  className="btn btn-primary btn-lg px-4 me-sm-3 text-btn-responsive"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi bi-rocket-takeoff-fill mx-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.6 3.6 0 0 0-.108-.563 2 2 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2 2 0 0 0-.16-.045 4 4 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.55 2.55 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361s.437 1.732-.36 2.531Z" />
                    <path d="M5.205 10.787a7.6 7.6 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925" />
                  </svg>
                  Teste Grátis por 15 dias
                </a>
              </div>
            </div>
          </div>
          <div className="height-celular col-md-5">
            <DeviceFrameset
              className="marvel-device iphone8 black"
              device="iPhone X"
              color="black"
              zoom={"0.6"}
              width={"300px"}
              height={"560px"}
            >
              <div className="bg-dark">
                <img
                  src="agendamento.gif"
                  alt="Agendamento"
                  width="100%"
                  height="100%"
                />
              </div>
            </DeviceFrameset>
          </div>
        </div>
      </header>
    </>
  );
};
