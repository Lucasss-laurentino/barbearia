import * as yup from "yup";

export const confirmarCodigoSchema = yup.object({
  Codigo: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .integer("O código deve ter exatamente 6 dígitos numéricos")
    .required("O código é obrigatório"),
});
