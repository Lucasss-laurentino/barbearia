import { useState } from "react";
import "./index.css";
import { FormLogin } from './FormLogin';
import { FormEsqueciSenha } from './FormEsqueciSenha';

export const Form = () => {

  const [formAtivo, setFormAtivo] = useState(1);

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <div className="container-fluid">
            <div className="row tela-toda">
              <div className="col-12">
                {formAtivo === 1 && <FormLogin setFormAtivo={setFormAtivo} />}

                {formAtivo === 2 && (
                  <FormEsqueciSenha setFormAtivo={setFormAtivo} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
