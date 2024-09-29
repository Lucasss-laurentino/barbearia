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

export const servicoEditarSchema = yup.object({
  NOME_SERVICO: yup.string().required("Campo obrigatório"),
  PRAZO: yup.string().required("Campo obrigatório"),
  PRECO: yup.string().required("Campo obrigatório"),
  IMAGEM_SERVICO: yup
    .mixed()
    .nullable() // Permite null
    .notRequired() // Torna o campo não obrigatório
    .test(
      "fileType",
      "Apenas arquivos de imagem ou URLs de imagem são permitidos",
      (value) => {
        // Verifica se o valor é nulo ou undefined
        if (!value) return true; // Aceita null ou undefined

        // Se for um arquivo
        if (value[0] instanceof File) {
          return (
            value[0].type === "image/jpeg" ||
            value[0].type === "image/png" ||
            value[0].type === "image/jpg"
          );
        }

        // Se for uma string, verifica se tem a extensão permitida
        if (typeof value === "string") {
          return (
            value.endsWith(".jpeg") ||
            value.endsWith(".jpg") ||
            value.endsWith(".png")
          );
        }

        return false; // Se não for um arquivo ou uma string válida, retorna false
      }
    ),
});
