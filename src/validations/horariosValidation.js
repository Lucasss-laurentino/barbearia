import * as yup from 'yup';

export const horariosSchema = yup.object({ 
  HORA: yup.string().required("Campo obrigatório"),
})