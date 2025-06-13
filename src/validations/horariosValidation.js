import * as yup from "yup";

export const horariosSchema = yup.object({
  Hora: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Horário inválido (use o formato HH:mm)"
    ),
});
