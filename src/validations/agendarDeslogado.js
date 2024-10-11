import * as yup from 'yup';

export const agendarDeslogadoSchema = yup.object({
    NOME_CLIENTE: yup.string().required("Campo obrigatório")
});