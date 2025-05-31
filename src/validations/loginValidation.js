import * as yup from "yup";

export const loginSchema = yup.object({
  EmailLogin: yup
  .string()
  .email("Formato de email inválido")
  .required("Campo obrigatório"),
  SenhaLogin: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),

})