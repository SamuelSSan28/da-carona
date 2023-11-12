import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required('Campo "Nome" é obrigatório'),
  phone: Yup.string()
  .matches(
    /^(\(\d{2,3}\)\s?)?(\d{10}|\d{5}-\d{4})$/,
    'Formato inválido de telefone, o formato esperado é: (DD) DDDDD-DDDD'
  )
  .required('Campo "Telefone" é obrigatório'),
});

export const createEventSchema = Yup.object().shape({
  titulo: Yup.string().required('Campo "Título" é obrigatório'),
  data: Yup.string().required('Campo "Data" é obrigatório'),
  descricao: Yup.string().required('Campo "Descrição" é obrigatório'),
  horario: Yup.string().required('Campo "Horário" é obrigatório'),
  localizacao: Yup.string().required('Campo "Localização" é obrigatório'),
});
