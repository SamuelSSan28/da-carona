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
import InputMask from "react-input-mask";
import { createUserSchema } from "../../services/formValidation";
import { useState } from "react";

export default function SignUp({
  setStep,
  form,
  onChange,
  handleValidatioStep,
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);
      await createUserSchema.validate(form, { abortEarly: false });
      await handleValidatioStep();
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
    }finally{
      setIsLoading(false)
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
            <FormControl id="name" isRequired>
              <FormLabel>Nome completo</FormLabel>
              <Input type="text" onChange={onChange} name="name" />
            </FormControl>

            <FormControl id="phone" isRequired>
              <FormLabel>Telefone</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+55" />
                <InputMask
                  mask="(99) 99999-9999"
                  name="phone"
                  onChange={onChange}
                  maskChar={null}
                >
                  {() => (
                    <Input
                      name="phone"
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      onChange={onChange}
                    />
                  )}
                </InputMask>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading}
                onClick={submit}
                loadingText="Carregando"
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
