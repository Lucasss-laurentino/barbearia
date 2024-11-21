import * as yup from 'yup';

export const editarUsuarioSchema = yup.object({
  EMAIL: yup.string().email("Formato de email inválido"),

  NOME_BARBEARIA: yup.string(),

  SENHA: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa"),
}); 