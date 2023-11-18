import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { createEvent } from "../../services/events";
import eventImage from "../../assets/create-event.svg";
import { createEventSchema } from "../../services/formValidation";

export default function CreateEvent() {
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    hour: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onChange = (event) => {
    setEventForm({
      ...eventForm,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async () => {
    try {
      setIsLoading(true);
      await createEventSchema.validate(eventForm, { abortEarly: false });
      await createEvent(eventForm);
      toast({
        title: "Evento criado com sucesso!",
        //description: "We've created your account for you.",
        status: "success",
        duration: 900,
        isClosable: true,
      });
      setTimeout(() => (window.location.href = "/events"), 1000);
    } catch (error) {
      console.error("Erro no submitForm:", error);
      error.errors.forEach((message) => {
        toast({
          title: "Erro de validação",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
    }finally{
      setTimeout(() =>  setIsLoading(true), 100);
    }
  };

  return (
    <Container
      as={SimpleGrid}
      maxW={"7xl"}
      maxH={"92vh"}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 12 }}
      py={10}
    >
      <Stack spacing={{ base: 10, md: 20 }}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          color="#62D0C6"
        >
          Criar Evento
        </Heading>

        <Image
          alt={"Hero Image"}
          fit={"cover"}
          align={"center"}
          maxW={"100%"} // Adicionado para garantir que a largura não ultrapasse o contêiner
          maxH={"100%"} // Adicionado para garantir que a altura não ultrapasse o contêiner
          w={"80%"}
          h={"70%"}
          m={5}
          src={eventImage}
        />
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

            <InputMask
              mask="99/99/9999"
              name="date"
              onChange={onChange}
              maskChar={null}
            >
              {() => (
                <Input
                  name="date"
                  placeholder="Data"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              )}
            </InputMask>

            <InputMask
              mask="99:99"
              maskChar={null}
              name="hour"
              onChange={onChange}
            >
              {() => (
                <Input
                  name="hour"
                  placeholder="Horario"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              )}
            </InputMask>

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
            isLoading={isLoading}
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
