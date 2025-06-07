import { useState } from "react";
import "./index.css";
import { FormLogin } from "./FormLogin";
import { FormEsqueciSenha } from "./FormEsqueciSenha";

export const Form = () => {
  const [formAtivo, setFormAtivo] = useState(1);

  return (
    <>
      {formAtivo === 1 && <FormLogin setFormAtivo={setFormAtivo} />}
      {formAtivo === 2 && <FormEsqueciSenha setFormAtivo={setFormAtivo} />}
    </>
  );
};
