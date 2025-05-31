import * as yup from 'yup';

export const recuperarSenhaSchema = yup.object({
  EmailEsqueciSenha: yup
    .string()
    .email("Formato de email inválido")
    .required("Campo obrigatório"),
});