import * as yup from "yup";

export const loginSchema = yup.object({
  EMAIL_LOGIN: yup
  .string()
  .email("Formato de email inválido")
  .required("Campo obrigatório"),
  SENHA_LOGIN: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),

})