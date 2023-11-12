"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { createUserSchema } from "../../services/formValidation";

export default function SignUp({
  setStep,
  form,
  onChange,
  handleValidatioStep,
}) {
  const toast = useToast();

  const submit = async () => {
    try {
      await createUserSchema.validate(form, { abortEarly: false });
      handleValidatioStep();
    } catch (error) {
      error.errors.forEach((message) => {
        toast({
          title: "Erro de validação",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    }
  };

  return (
    <Flex maxW={"100%"} minH={"92vh"} align={"center"} justify={"center"}>
      <Stack
        align={"center"}
        justify={"center"}
        spacing={8}
        mx={"auto"}
        minW={"100%"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Cadastro
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Curta todas as viagens com estilo 😎✌️
          </Text>
        </Stack>

        <Box
          w={{ base: "100%", md: "35rem" }}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={8}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Nome completo</FormLabel>
              <Input type="text" onChange={onChange} name="name" />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Telefone</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+55" />
                <Input type="tel" name="phone" onChange={onChange} />
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                onClick={submit}
                loadingText="Submitting"
                size="lg"
                bg={"#62D0C6"}
                color={"white"}
                _hover={{
                  bg: "#81d9d1",
                }}
              >
                Avançar
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"} onClick={(e) => setStep(0)}>
                Já é usuário? <Link color={"#62D0C6"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
