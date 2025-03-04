import * as yup from "yup";

export const createUserSchemaADM = yup.object({
  EMAIL: yup
    .string()
    .email("Formato de email inválido")
    .required("Campo obrigatório"),

  NOME_BARBEARIA: yup.string().required("Campo obrigatório"),

  NOME: yup.string().required("Campo obrigatório"),

  CELULAR: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de celular precisa estar no formato correto"
    ),

  SENHA: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),
});

export const createUserSchema = yup.object({
  EMAIL: yup
    .string()
    .email("Formato de email inválido")
    .required("Campo obrigatório"),
  NOME: yup.string().required("Campo obrigatório"),
  SENHA: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),
});
