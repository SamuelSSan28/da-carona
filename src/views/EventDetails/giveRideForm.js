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

export default function GiveRideForm({ form, onChange, submit, isLoading }) {
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

  return (
    <Box w={"100%"} bg={"white"} rounded={"lg"} boxShadow={"lg"} p={8}>
      <Stack spacing={8}>
        <FormControl id="vehicle" isRequired>
          <FormLabel>Veiculo</FormLabel>
          <Select
            required
            placeholder="Selecione uma opção"
            name="vehicle"
            onChange={onChange}
          >
            {vehicleOptions.map((e) => (
              <option value={e.value}>{e.label}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Vagas</FormLabel>
          {form?.vehicle && (
            <NumberInput  min={1} max={vehicleVacancies[form.vehicle]}>
              <NumberInputField placeholder={`Máximo de vagas para o veículo é ${vehicleVacancies[form.vehicle]}`} />
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

        <FormControl isRequired>
          <FormLabel>Contribuição pela carona</FormLabel>
          <Input type="text" onChange={onChange} name="ridePrice" />
        </FormControl>

        <Stack spacing={10} pt={2}>
          <Button
            onClick={submit}
            isLoading={isLoading}
            loadingText="...."
            size="lg"
            bg={"#62D0C6"}
            color={"white"}
            _hover={{
              bg: "#81d9d1",
            }}
          >
            Oferecer 
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
