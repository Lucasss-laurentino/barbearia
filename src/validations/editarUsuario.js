import * as yup from 'yup';

export const editarUsuarioSchema = yup.object({
  EMAIL: yup.string().email("Formato de email inválido"),

  NOME_BARBEARIA: yup.string(),

  SENHA: yup
    .string()
}); 