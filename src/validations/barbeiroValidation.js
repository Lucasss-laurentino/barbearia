import * as yup from 'yup';

export const barbeiroSchema = yup.object({
  NOME: yup.string().required("Campo obrigatório"),
  IMAGEM: yup
  .mixed()
  .required("Campo obrigatório")
  .test("fileType", "Apenas arquivos de imagem são permitidos", (value) => {
    return value && (value[0]?.type === 'image/jpeg' || value[0]?.type === 'image/png' || value[0]?.type === 'image/jpg');
  }),
});