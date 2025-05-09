import * as yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

export const pagamentoSchema = yup.object({
  NOME: yup.string().required("Campo obrigatório"),
  NUMERO_CARTAO: yup
  .string()
  .required("Campo obrigatório")
  .test("validar-numero-cartao", "Número de cartão inválido", (value) => {
    // Remove espaços e verifica se o comprimento é 15 ou 16
    const numeroLimpo = value.replace(/\s/g, '');
    return numeroLimpo.length === 15 || numeroLimpo.length === 16;
  }),  CVC: yup.string().required("Campo obrigatório"),
  EXPIRA: yup.string().required("Campo obrigatório"),
  CPF: yup
    .string()
    .required("Campo obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .test("validar-cpf", "CPF inválido", (value) => cpf.isValid(value)),
  CELULAR: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de celular precisa estar no formato correto"
    ),

});