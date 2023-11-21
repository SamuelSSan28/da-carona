import * as Yup from "yup";
import { parse, isValid } from "date-fns";

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required('Campo "Nome" é obrigatório'),
  phone: Yup.string()
    .matches(
      /^(\(\d{2,3}\)\s?)?(\d{10}|\d{5}-\d{4})$/,
      "Formato inválido de telefone, o formato esperado é: (DD) DDDDD-DDDD"
    )
    .required('Campo "Telefone" é obrigatório'),
});

export const createEventSchema = Yup.object().shape({
  title: Yup.string()
    .required('Campo "Título" é obrigatório')
    .max(35, 'O campo "Título" não pode ter mais de 35 caracteres'),
  date: Yup.string()
    .required('Campo "Data" é obrigatório')
    .test("date-validation", "Data inválida", async function (value) {
      const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateFormat.test(value)) {
        throw new Yup.ValidationError(
          "Formato de data inválido",
          value,
          "date-format"
        );
      }

      const parsedDate = parse(value, "dd/MM/yyyy", new Date());
      if (!isValid(parsedDate)) {
        throw new Yup.ValidationError("Data inválida", value, "date-valid");
      }

      return true;
    }),

  hour: Yup.string()
    .required('Campo "Horário" é obrigatório')
    .test("time-validation", "Horário inválido", async function (value) {
      const timeFormat = /^\d{2}:\d{2}$/;
      if (!timeFormat.test(value)) {
        throw new Yup.ValidationError(
          "Formato de hora inválido",
          value,
          "time-format"
        );
      }

      const [hour, minute] = value.split(":").map(Number);
      if (!(hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59)) {
        throw new Yup.ValidationError("Horário inválido", value, "time-valid");
      }

      return true;
    }),
  location: Yup.string()
    .required('Campo "Localização" é obrigatório')
    .max(45, 'O campo "Localização" não pode ter mais de 45 caracteres'),
});

export const giveRideSchema = Yup.object().shape({
  vehicle: Yup.string().required('Campo "Veiculo" é obrigatório'),
  vehicleVacancies: Yup.string().required('Campo "Vagas" é obrigatório'),
  departureTime: Yup.string().required('Campo "Saindo as" é obrigatório'),
  boardingPlace: Yup.string().required('Campo "Saindo de" é obrigatório'),
  passingBy: Yup.string().required('Campo "Passando por" é obrigatório'),
  ridePrice: Yup.string().required('Campo "Contribuição pela carona" é obrigatório'),
});