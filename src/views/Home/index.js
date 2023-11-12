import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
} from "@chakra-ui/react";

import homeImage from "../../assets/home2.svg";

export default function Home() {
  return (
    <Container maxW={"7xl"} overflow={"hidden"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 20 }}
        direction={{ base: "column", md: "row" }}
        maxH={"100vh"}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "#62D0C6",
                zIndex: -1,
              }}
            >
              Uma carona,
            </Text>
            <br />
            <Text as={"span"} color={"#58bbb2"}>
              muitos destinos!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Muitas pessoas dependem de carona para ir para o trabalho, faculdade
            ou eventos, e este webapp vem para simplificar o processo de
            oferecer/pedir carona.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              as="a"
              href={"/events"}
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"#62D0C6"}
              _hover={{ bg: "#81d9d1" }}
            >
              Começar
            </Button>
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Saiba mais
            </Button>
          </Stack>
        </Stack>

        <Stack
          flex={1}
          justify={"center"}
          align={"center"}
          position={{ base: "static", md: "relative" }}
          w={"100%"}
        >
          <Box
            position={"relative"}
            height={"lg"}
            rounded={"2xl"}
            width={"100%"}
            align={"center"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              maxW={"100%"}  // Adicionado para garantir que a largura não ultrapasse o contêiner
              maxH={"100%"}  // Adicionado para garantir que a altura não ultrapasse o contêiner
              w={"80%"}
              h={"70%"}
              src={homeImage}
            />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}