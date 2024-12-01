import { FormCadastro } from "./FormCadastro";
import { FormLogin } from "./FormLogin";
import { useContext, useEffect, useState } from "react";
import "./index.css";
import { RecuperarSenha } from "./RecuperarSenha";
import { LoginContext } from "../../Context/LoginContext";
import { ConfirmaCodigo } from "./ConfirmaCodigo";
import { AbaBottomContext } from "../../Context/AbaBottomContext";
import { MenuBottom } from "../MenuBottom";

export const Login = () => {
  // true = form login ativo | false = form cadastro ativo
  const [controlaLoginECadastro, setControlerLoginECadastro] = useState(true);
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const { active } = useContext(AbaBottomContext);
  // context login
  const { confirmarCodigo } = useContext(LoginContext);

  return (
    <>
      <div className="container-fluid page-login">
        <div className="row col-12 justify-content-center pt-5 scroll-login">
          {controlaLoginECadastro && !esqueceuSenha && (
            <FormLogin
              setControlerLoginECadastro={setControlerLoginECadastro}
              setEsqueceuSenha={setEsqueceuSenha}
            />
          )}
          {!controlaLoginECadastro && !esqueceuSenha && !confirmarCodigo && (
            <FormCadastro
              setControlerLoginECadastro={setControlerLoginECadastro}
            />
          )}

          {esqueceuSenha && controlaLoginECadastro && <RecuperarSenha setEsqueceuSenha={setEsqueceuSenha} />}

          {!esqueceuSenha && !controlaLoginECadastro && confirmarCodigo && <ConfirmaCodigo/>}
          
        </div>
      </div>
    </>
  );
};
