import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
} from "@chakra-ui/react";

export default function GiveRideForm({
  form,
  onChange,
  userData,
}) {
  const vehicleOptions = [
    {
      value: "car",
      label: "Carro",
    },
    {
      value: "motorcycle",
      label: "Moto",
    },
    {
      value: "van",
      label: "Van",
    },
    {
      value: "minibus",
      label: "Micro-onibus",
    },
    {
      value: "bus",
      label: "Ônibus",
    },
  ];

  const vehicleVacancies = {
    car: 4,
    motorcycle: 1,
    van: 20,
    minibus: 20,
    bus: 60,
  };

  const vehicleVacanciesOnChange = (value) => {
    onChange({
      target: {
        name: "vehicleVacancies",
        value,
      },
    });
  };

  return (
    <Box w={"100%"} bg={"white"} rounded={"lg"}   p={2}>
      <Stack spacing={8}>
        <FormControl id="vehicle" isRequired>
          <FormLabel>Veiculo</FormLabel>
          <Select
            required
            placeholder="Selecione uma opção"
            name="vehicle"
            onChange={onChange}
            value={form?.vehicle || ""}
          >
            {vehicleOptions.map((e) => (
              <option value={e.value}>{e.label}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Vagas</FormLabel>
          {(form?.vehicle) && (
            <NumberInput
              onChange={vehicleVacanciesOnChange}
              min={1}
              max={vehicleVacancies[form.vehicle]}
              value={form?.vehicleVacancies || ""}
            >
              <NumberInputField
                placeholder={`Máximo de vagas para o veículo é ${
                  vehicleVacancies[form.vehicle]
                }`}
              />
            </NumberInput>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Saindo as</FormLabel>
          <Input type="text" onChange={onChange} name="departureTime" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Saindo de</FormLabel>
          <Input type="text" onChange={onChange} name="boardingPlace" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Passando por</FormLabel>
          <Input type="text" onChange={onChange} name="passingBy" />
        </FormControl>

        <FormControl>
          <FormLabel>Contribuição pela carona</FormLabel>
          <Input type="text" onChange={onChange} name="ridePrice" />
        </FormControl>
      </Stack>
    </Box>
  );
}
