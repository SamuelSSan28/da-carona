import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { createEvent } from "../../services/events";

export default function CreateEvent() {
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    hour: "",
    location: "",
  });

  const onChange = (event) => {
    setEventForm({
      ...eventForm,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async () => {
    try {
      await createEvent(eventForm);
      setTimeout(() => (window.location.href = "/events"), 500);
    } catch (error) {}
  };

  return (
    <Container
      as={SimpleGrid}
      maxW={"7xl"}
      maxH={"92vh"}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 32 }}
      py={10}
    >
      <Stack spacing={{ base: 10, md: 20 }}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
        >
          Explorando Novos Horizontes{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-r, #62D0C6, #62D0C6)"
            bgClip="text"
          >
            &
          </Text>{" "}
          Viagens Inesquecíveis
        </Heading>
      </Stack>
      <Stack
        bg={"gray.50"}
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "lg" }}
      >
        <Stack spacing={4}>
          <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            Sua Próxima Aventura Começa Aqui!
            <Text
              as={"span"}
              bgGradient="linear(to-r, #62D0C6,#62D0C6)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
            Compartilhe caronas, histórias e risadas enquanto explora novos
            destinos. Seja parte de uma comunidade que valoriza a aventura e a
            amizade. Todos são bem-vindos a embarcar nesta viagem única!
          </Text>
        </Stack>
        <Box as={"form"} mt={4}>
          <Stack spacing={4}>
            <Input
              name="title"
              placeholder="Ttulo"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
              onChange={onChange}
            />
            <Input
              name="date"
              placeholder="Data"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
              onChange={onChange}
            />
            <Input
              name="hour"
              placeholder="Horario"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
              onChange={onChange}
            />

            <Input
              name="location"
              placeholder="Localizacao"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
              onChange={onChange}
            />
          </Stack>
          <Button
            onClick={submitForm}
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, #62D0C6,#62D0C6)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, #62D0C6,#62D0C6)",
              boxShadow: "xl",
            }}
          >
            Criar Evento
          </Button>
        </Box>
        form
      </Stack>
    </Container>
  );
}
