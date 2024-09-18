import * as yup from "yup";

export const createUserSchema = yup.object({
  EMAIL: yup
    .string()
    .email("Formato de email inválido")
    .required("Campo obrigatório"),

  SENHA: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),

});
