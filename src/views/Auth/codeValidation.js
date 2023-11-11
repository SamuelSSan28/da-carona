import { useContext, useState } from "react";
import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { handleLogin, handleRegister } from "../../services/auth";
import { UserContext } from "../../context/user";

export default function CodeValidation({ form, utils }) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateToken } = useContext(UserContext);

  const validation = async () => {
    setIsLoading(true);
    if (utils.stepBefore === 0) {
      const resp = await handleLogin(code, utils.confirm);
      updateToken(resp?.user?.accessToken);
    } else if (utils.stepBefore === 1) {
      const token = await handleRegister(
        form.name,
        form.phone,
        utils.confirm,
        code
      );
      updateToken(token);
    }
    setIsLoading(false);
    //setTimeout(() => (window.location.href = "/"), 500);
  };

  return (
    <Flex maxW={"100%"} minH={"92vh"} align={"center"} justify={"center"} p={4}>
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
            isLoading={isLoading}
            onClick={validation}
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
