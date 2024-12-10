import * as yup from 'yup';

export const recuperarSenhaSchema = yup.object({
  EMAIL_RECUPERAR_SENHA: yup
    .string()
    .email("Formato de email inválido")
    .required("Campo obrigatório"),
});