import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Card,
  CardContent,
  CardHeading,
  CardText,
} from "../../components/EventCard";
import { getEvents } from "../../services/events";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events_ = await getEvents();
        setEvents(events_);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box  >
      <Container
        maxW={"7xl"}
        py={0}
        pb={0}
        as={Stack}
        spacing={12}
        alignItems={"center"}
      >
        <Stack spacing={0} align={"center"}>
          <Heading>Aventuras à Vista </Heading>
          <Text>Compartilhe Caronas e Faça Novas Conexões</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Card>
            <CardContent>
              <CardHeading>Viagens Convenientes</CardHeading>
              <CardText>
                Encontre caronas que se alinham com seus destinos e horários.
              </CardText>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeading>Conheça Novas Pessoas</CardHeading>
              <CardText>
                Explore a cidade com companheiros de viagem amigáveis e
                diversificados.
              </CardText>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeading>Ecológico e Econômico</CardHeading>
              <CardText>
                Ajude o meio ambiente e economize dinheiro ao compartilhar
                caronas.
              </CardText>
            </CardContent>
          </Card>
        </Stack>

        <Button
          as={"a"}
          href={"/create-event"}
          rightIcon={<ArrowForwardIcon />}
          bg={"#62D0C6"}
          color={"white"}
          _hover={{
            bg: "#62D0C6",
          }}
        >
          Criar novo evento
        </Button>
      </Container>

      <Container maxW={"9xl"} py={16} pt={8} as={Stack} spacing={12}>
        <Stack spacing={0} align={"left"}>
          <Heading size="lg">Eventos:</Heading>
        </Stack>

        {events.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {events.map((event) => (
              <Card as={"a"} href={"#"} key={event.id} >
                <CardContent
                  align={"left"}
                  _hover={{
                    border: "2px solid #81d9d1",
                  }}
                >
                  <CardHeading color={"#62D0C6"}>{event.title}</CardHeading>

                  <CardText textAlign={"left"}>
                    Data e Horario: {event.date} às {event.hour}{" "}
                  </CardText>

                  <CardText textAlign={"left"}>
                    Local: {event.location}
                  </CardText>
                </CardContent>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Box w="100%" textAlign={"center"}>
            <Text>
              Sem eventos futuros
              <Heading>😔</Heading>
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
}
