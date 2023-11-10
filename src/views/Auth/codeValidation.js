import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useState } from "react";
import { handleLogin, handleRegister } from "../../services/firebaseAuth";

export default function CodeValidation({ form, utils }) {
  const [code, setCode] = useState("");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign={"center"}
          >
            Verifique a sua caixa de mensagens
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Enviamos um código via SMS
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {form.phone}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput onChange={(value) => setCode(value)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={(e) => {
              if (utils.stepBefore === 0) handleLogin(code, utils.confirm);
              else if (utils.stepBefore === 1)
                handleRegister(form.name, form.phone, utils.confirm, code);
            }}
            bg={"#62D0C6"}
            color={"white"}
            _hover={{
              bg: "#81d9d1",
            }}
          >
            Avançar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
