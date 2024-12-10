import * as yup from "yup";

export const novaSenhaSchema = yup.object({
  SENHA: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),
  
  CONFIRMAR_SENHA: yup
    .string()
    .oneOf([yup.ref('SENHA'), null], "As senhas não coincidem") // Verifica se CONFIRMAR_SENHA é igual a SENHA
    .required("Campo obrigatório")
});