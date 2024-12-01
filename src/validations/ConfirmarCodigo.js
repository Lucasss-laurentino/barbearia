import * as yup from "yup";

export const confirmarCodigoSchema = yup.object({
  CODIGO: yup
    .number()
    .integer("O código deve ter exatamente 6 dígitos numéricos")
    .required("O código é obrigatório"),
});
