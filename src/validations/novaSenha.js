import * as yup from "yup";

export const novaSenhaSchema = yup.object({
  NovaSenha: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),
  
  ConfirmarNovaSenha: yup
    .string()
    .oneOf([yup.ref('NovaSenha'), null], "As senhas não coincidem") // Verifica se CONFIRMAR_SENHA é igual a SENHA
    .required("Campo obrigatório")
});