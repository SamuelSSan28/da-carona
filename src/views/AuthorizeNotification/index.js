"use client";

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function AuthorizeNotification({
  setNotificationPermission
}) {

  const handleRequestNotificationPermission = async () => {
    try {

      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // Agora você pode enviar notificações
            setNotificationPermission("granted");
            new Notification("Permissão concedida!");
          }
        });
      }
     else{
      setNotificationPermission("granted");
     }

      console.log(permission)
    } catch (error) {
      console.error("Erro ao solicitar permissão de notificação:", error);
    }
  };

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
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Você autoriza o app a lhe enviar notificações ?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Só é permitidi acessar o app se a permissão for autorizada!!!!
        </Text>

        <Stack spacing={6}>
          <Button
            onClick={handleRequestNotificationPermission}
            bg={"#62D0C6"}
            color={"white"}
            _hover={{
              bg: "#81d9d1",
            }}
          >
            Autorizar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
