import { FormCadastro } from "./FormCadastro";
import { FormLogin } from "./FormLogin";
import { useContext, useEffect, useState } from "react";
import "./index.css";
import { RecuperarSenha } from "./RecuperarSenha";
import { LoginContext } from "../../Context/LoginContext";
import { ConfirmaCodigo } from "./ConfirmaCodigo";
import { useParams } from "react-router-dom";

export const Login = () => {

  // context login
  const {
    setBarbearia,
    formAtivo, 
    setFormAtivo,
  } = useContext(LoginContext);

  const { barbearia } = useParams();
  const { plano_id } = useParams();

  // barbearia é usado pra quando for editar um usuario ultiliza esse state em loginContext
  useEffect(() => {
    if (barbearia) setBarbearia(barbearia);
  }, [barbearia]);

  return (
    <>
      <div className="page-login">
        {formAtivo === 1 && 
          <FormLogin 
            barbearia={barbearia} 
            setFormAtivo={setFormAtivo} 
          />
        }
        {formAtivo === 2 && 
          <FormCadastro 
            barbearia={barbearia} 
            plano_id={plano_id} 
            setFormAtivo={setFormAtivo}
          />
        }
        {formAtivo === 3 &&
          <RecuperarSenha 
            barbearia={barbearia}
            setFormAtivo={setFormAtivo}
          />
        }
        {formAtivo === 4 &&
          <ConfirmaCodigo
            barbearia={barbearia}
            plano_id={plano_id}
            setFormAtivo={setFormAtivo}
          />
        }
      </div>
    </>
  );
};
