import { FormCadastro } from "./FormCadastro";
import { FormLogin } from "./FormLogin";
import { useContext, useEffect, useState } from "react";
import "./index.css";
import { RecuperarSenha } from "./RecuperarSenha";
import { LoginContext } from "../../Context/LoginContext";
import { ConfirmaCodigo } from "./ConfirmaCodigo";
import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { useParams } from "react-router-dom";

export const Login = () => {
  const { active } = useContext(AbaBottomContext);
  // context login
  const {
    setControlaLoginECadastro,
    setBarbearia,
    setEsqueceuSenha,
    setConfirmarCodigo,
    formAtivo, 
    setFormAtivo,
  } = useContext(LoginContext);

  const { barbearia } = useParams();
  const { plano_id } = useParams();

  const [recuperaSenha, setRecuperaSenha] = useState(false);

  useEffect(() => {
    // gatilho pra chamar a função -> validarCodigoMudarSenha em <ConfirmaCodigo/>
    if (localStorage.getItem("email_recuperar") !== '{}') {
      setRecuperaSenha(true);
    } else {
      setRecuperaSenha(false);
    }
  }, [localStorage.getItem("email_recuperar")]);

  // barbearia é usado pra quando for editar um usuario ultiliza esse state em loginContext
  useEffect(() => {
    if (barbearia) setBarbearia(barbearia);
  }, [barbearia]);

  // direciona pra pagina de login com o formulario de cadastro aberto
  useEffect(() => {
    if (plano_id) {
      setControlaLoginECadastro(false);
      // setEsqueceuSenha(false);
      setConfirmarCodigo(false);
    }
  }, []);

  return (
    <>
      <div class="page-login">
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
            recuperaSenha={recuperaSenha}
            setRecuperaSenha={setRecuperaSenha}
            barbearia={barbearia}
            plano_id={plano_id}
            setFormAtivo={setFormAtivo}
          />
        }
      </div>
    </>
  );
};
