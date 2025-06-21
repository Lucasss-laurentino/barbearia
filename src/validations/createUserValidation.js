import * as yup from "yup";

export const createUserSchemaADM = yup.object({
  Email: yup
    .string()
    .email("Formato de email inválido")
    .required("Campo obrigatório"),

  NomeBarbearia: yup.string().required("Campo obrigatório"),

  Nome: yup.string().required("Campo obrigatório"),

  Celular: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de celular precisa estar no formato correto"
    ),

  Senha: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),
});

export const createUserSchema = yup.object({
  Email: yup
    .string()
    .email("Formato de email inválido")
    .required("Campo obrigatório"),
  Celular: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de celular precisa estar no formato correto"
    ),

  Nome: yup.string().required("Campo obrigatório"),
  Senha: yup
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Campo obrigatório"),
});
