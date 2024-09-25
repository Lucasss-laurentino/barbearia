import * as yup from "yup";

export const servicoSchema = yup.object({
  NOME_SERVICO: yup.string().required("Campo obrigatório"),
  PRAZO: yup.string().required("Campo obrigatório"),
  PRECO: yup.string().required("Campo obrigatório"),
  IMAGEM_SERVICO: yup
    .mixed()
    .required("Campo obrigatório")
    .test("fileType", "Apenas arquivos de imagem são permitidos", (value) => {
      return (
        value &&
        (value[0]?.type === "image/jpeg" ||
          value[0]?.type === "image/png" ||
          value[0]?.type === "image/jpg")
      );
    }),
});
