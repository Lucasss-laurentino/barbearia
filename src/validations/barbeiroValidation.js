import * as yup from "yup";

export const barbeiroSchema = yup.object({
  NOME: yup.string().required("Campo obrigatório"),
  IMAGEM: yup
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

export const barbeiroEditarSchema = yup.object({
  NOME: yup.string().required("Campo obrigatório"),
  IMAGEM: yup
    .mixed()
    .nullable() 
    .notRequired()
    .test(
      "fileType",
      "Apenas arquivos de imagem ou URLs de imagem são permitidos",
      (value) => {
        if (!value) return true;
        if (value[0] instanceof File) {
          return (
            value[0].type === "image/jpeg" ||
            value[0].type === "image/png" ||
            value[0].type === "image/jpg"
          );
        }  
        if (typeof value === "string") {
          return (
            value.endsWith(".jpeg") ||
            value.endsWith(".jpg") ||
            value.endsWith(".png")
          );
        }
        return false;
      }
    ),
});
