import * as yup from 'yup';

export const editarUsuarioSchema = yup.object({
  NOME: yup.string(),
  EMAIL: yup.string().email("Formato de email inválido"),
  NOME_BARBEARIA: yup.string(),
  SENHA: yup
    .string()
}); 