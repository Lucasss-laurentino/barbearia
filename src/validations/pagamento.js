import * as yup from 'yup';

export const pagamentoSchema = yup.object({
  NOME: yup.string().required("Campo obrigatório"),
  NUMERO_CARTAO: yup.string().required("Campo obrigatório").length(19, "Número de cartão inválido"),
  CVC: yup.string().required("Campo obrigatório"),
  EXPIRA: yup.string().required("Campo obrigatório") 
});