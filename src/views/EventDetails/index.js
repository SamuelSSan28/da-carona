import {
  Container,
  SimpleGrid,
  Flex,
  useColorModeValue,
  chakra,
  useToast,
  StatLabel,
  StatNumber,
  Box,
  Stat,
  Button,
  AlertDialog,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Stack,
  VStack,
  Heading,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { CiLocationOn, CiCalendarDate, CiAlarmOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import GiveRideForm from "./giveRideForm";
import {
  aceptOneRideRequest,
  getEvent,
  requestOneRide,
  updateArrayFieldEvent,
} from "../../services/events";
import { updateVehicle } from "../../services/user";
import { giveRideSchema } from "../../services/formValidation";
import { UserContext } from "../../context/user";
import { Card, CardContent, CardText } from "../../components/EventCard";
import { useRef } from "react";
import { useEffect } from "react";
import vehicleIcons from "./icons";
import { PhoneIcon } from "@chakra-ui/icons";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={{ base: 3, md: 5 }} // Padding responsivo
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      rounded={"xl"}
    >
      <Flex justifyContent={"start"} align={"center"}>
        {icon}
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontSize={{ base: "sm", md: "1xl" }}
            fontWeight={"medium"}
            isTruncated
          >
            {title}
          </StatLabel>

          <StatNumber
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight={"medium"}
          >
            {stat}
          </StatNumber>
        </Box>
      </Flex>
    </Stat>
  );
}

export default function EventDetails() {
  const { state } = useLocation();

  const { user } = useContext(UserContext);
  const event = state?.event || {};

  const toast = useToast();
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [eventData, setEventData] = useState(event);
  const [selected, setSelected] = useState(null);
  const [requests, setRequests] = useState({
    giveRide: [],
  });
  const {
    isOpen: isOpenGiveRide,
    onOpen: onOpenGiveRide,
    onClose: onCloseGiveRide,
  } = useDisclosure();

  const {
    isOpen: isOpenCard,
    onOpen: onOpenCard,
    onClose: onCloseCard,
  } = useDisclosure();

  const cancelRefGiveRide = useRef();
  const cancelRefCard = useRef();

  const isUserInRequests = useMemo(() => {
    if (selected && selected.requests)
      return selected.requests.some((request) => request.user.id === user.id);

    return false;
  }, [selected, user]);

  const isUserRequestsAcepted = useMemo(() => {
    if (selected && selected.requests)
      return selected.requests.some(
        (request) => request.user.id === user.id && request.status === "acepted"
      );

    return false;
  }, [selected]);

  const quantRequestsAcepted = (request) => {
    if (request)
      return request.filter((request) => request.status === "approved").length;

    return 0;
  };

  const currentContactLink = (phone, type) => {
    if (type == 0)
      return `https://api.whatsapp.com/send?phone=+55${phone
        .replace("(", "")
        .replace(")", "")}&text=Obrigado%20pela%20carona!`;

    return `tel:${phone.replace("(", "").replace(")", "")}`;
  };

  const contactLinkDriver = useMemo(() => {
    if (eventData && eventData.user) {
      const phone = eventData.user.phone || "";
      return {
        zap: `https://api.whatsapp.com/send?phone=+55${phone
          .replace("(", "")
          .replace(")", "")}&text=Obrigado%20pela%20carona!`,
        tell: `tel:${phone.replace("(", "").replace(")", "")}`,
      };
    }
    return {
      zap: "/",
    };
  }, [eventData]);

  const onChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submitGiveRideForm = async () => {
    try {
      setIsLoading(true);
      await giveRideSchema.validate(form, { abortEarly: false });
      await updateArrayFieldEvent(
        eventData.id,
        { ...form, user, vehicleVacanciesRequested: 0, requests: [] },
        "giveRideRequests"
      );
      //pegar user id do contexto
      await updateVehicle(user.id, form.vehicle, form.vehicleVacancies);
      setIsRefresh(!isRefresh);
      toast({
        title: "Carona cadastrado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setForm({
        vehicle: form.vehicle,
        vehicleVacancies: form.vehicleVacancies,
      });
      onCloseGiveRide();
    } catch (error) {
      console.log(error);
      error?.errors?.forEach((message) => {
        toast({
          title: "Erro de validação",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestRide = async (index) => {
    try {
      setIsLoading(true);

      await requestOneRide(eventData.id, index, {
        user: user,
        status: "requested",
      });

      setIsRefresh(!isRefresh);
      toast({
        title: "Carona solicitada com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });

      onCloseCard();
    } catch (error) {
      console.log(error);
      error?.errors?.forEach((message) => {
        toast({
          title: "Erro na solicitação",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  const aceptRequestRide = async (index, rIndex) => {
    try {
      setIsLoading(true);

      if (
        selected.vehicleVacancies - quantRequestsAcepted(selected.requests) ==
        0
      ) {
        return toast({
          title: "VEICULO NÃO POSSUI MAIS VAGAS!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      const giveRideRequests = eventData.giveRideRequests;
      giveRideRequests[index].requests[rIndex].status = "approved";

      setEventData({
        ...eventData,
        giveRideRequests,
      });

      setSelected(giveRideRequests[index]);

      await aceptOneRideRequest(
        eventData.id,
        index,
        {
          user: user,
          status: "approved",
        },
        rIndex
      );

      setIsRefresh(!isRefresh);
      toast({
        title: "Carona aceita com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.log(error);

      error?.errors?.forEach((message) => {
        toast({
          title: "Erro na solicitação",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event_ = await getEvent(eventData.id);

        setRequests(event_.giveRideRequests);

        if (!event) {
          setEventData(event_);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    if (user && !isRefresh) {
      setForm({
        vehicle: user.vehicle,
        vehicleVacancies: user.vehicleVacancies,
      });
    }
  }, [isRefresh, user]);

  return (
    <Container maxW="100%">
      <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={{ base: "2xl", md: "4xl" }} // Tamanho responsivo
          py={{ base: 6, md: 10 }} // Padding responsivo
          fontWeight={"bold"}
          color={"#62D0C6"}
        >
          {eventData.title}
        </chakra.h1>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Localização"}
            stat={eventData.location}
            icon={<CiLocationOn size={"2em"} />}
          />
          <StatsCard
            title={"Data"}
            stat={eventData.day}
            icon={<CiCalendarDate size={"2em"} />}
          />
          <StatsCard
            title={"Horario"}
            stat={eventData.hour}
            icon={<CiAlarmOn size={"2em"} />}
          />
        </SimpleGrid>
        <Flex justifyContent={"center"} padding={8}>
          <>
            <Button
              onClick={onOpenGiveRide}
              bg={"#62D0C6"}
              color="white"
              _hover={{ bg: "#81d9d1" }}
              m={4}
            >
              Oferecer Carona
            </Button>

            <AlertDialog
              isOpen={isOpenGiveRide}
              leastDestructiveRef={cancelRefGiveRide}
              onClose={onCloseGiveRide}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Oferecer Carona
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    <GiveRideForm
                      form={form}
                      onChange={onChange}
                      userData={user}
                    />
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRefGiveRide} onClick={onCloseGiveRide}>
                      Cancelar
                    </Button>
                    <Button
                      isLoading={isLoading}
                      bg="#62D0C6"
                      color={"white"}
                      onClick={submitGiveRideForm}
                      ml={3}
                      _hover={{
                        bg: "#81d9d1",
                      }}
                    >
                      Continuar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        </Flex>
      </Box>

      <Container maxW={"full"} py={12} pt={0} as={Stack} spacing={12}>
        <Stack spacing={0} align={"left"}>
          <Heading size="lg">Caronas:</Heading>
        </Stack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={{ base: 2, md: 0, lg: 6 }}
        >
          {requests.length > 0 &&
            requests.map((request, index) => (
              <Card
                key={request.id}
                h={"150px"}
                onClick={(e) => {
                  onOpenCard();
                  setSelected({ ...request, index });
                }}
              >
                <CardContent
                  align={"left"}
                  _hover={{
                    border: "2px solid #81d9d1",
                  }}
                >
                  <Flex align="center">
                    {/* Ícone centralizado e grande */}
                    <Box
                      fontSize="3xl"
                      textAlign="center"
                      color="#62D0C6"
                      mr={4}
                    >
                      {request.vehicle
                        ? vehicleIcons[request.vehicle].icon
                        : null}
                    </Box>

                    {/* Textos à direita */}
                    <VStack align="start" spacing={2}>
                      <CardText>
                        Vagas:{" "}
                        {request.vehicleVacancies -
                          quantRequestsAcepted(request.requests)}
                      </CardText>
                      <CardText>Saindo as: {request.departureTime}</CardText>
                      <CardText>
                        {request.ridePrice
                          ? `Contribuição: ${request.ridePrice} `
                          : ""}
                        &nbsp;
                      </CardText>
                    </VStack>
                  </Flex>
                </CardContent>
              </Card>
            ))}
        </SimpleGrid>

        {selected && (
          <AlertDialog
            isOpen={isOpenCard}
            leastDestructiveRef={cancelRefCard}
            onClose={onCloseCard}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent minWidth={{ lg: 650, md: "50%" }}>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Oferecida por: {selected.user.name}
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Flex align="center">
                    <Box
                      fontSize="3xl"
                      textAlign="center"
                      color="#62D0C6"
                      mr={4}
                    >
                      {selected.vehicle
                        ? vehicleIcons[selected.vehicle].icon
                        : null}
                    </Box>

                    {/* Textos à direita */}
                    <VStack align="start" spacing={2}>
                      <CardText>
                        Veiculo:{" "}
                        {selected.vehicle &&
                          vehicleIcons[selected.vehicle].label}
                      </CardText>
                      <CardText>
                        Vagas:{" "}
                        {selected.vehicleVacancies -
                          quantRequestsAcepted(selected.requests)}
                      </CardText>
                      <CardText>Saindo as: {selected.departureTime}</CardText>
                      <CardText>Saindo de: {selected.boardingPlace}</CardText>
                      <CardText>Passando por: {selected.passingBy}</CardText>
                      {selected.ridePrice && (
                        <CardText>Contribuição: {selected.ridePrice}</CardText>
                      )}
                    </VStack>
                  </Flex>

                  {selected.user.id === user.id && selected.requests && (
                    <TableContainer m={2}>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Solicitante</Th>
                            <Th>Ação</Th>
                            <Th>Contato</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {selected.requests.map((r, index) => (
                            <Tr>
                              <Td> {r.user.name}</Td>
                              <Td>
                                {r.status == "requested" ? (
                                  <Button
                                    isLoading={isLoading}
                                    onClick={(e) =>
                                      aceptRequestRide(selected.index, index)
                                    }
                                  >
                                    Aceitar
                                  </Button>
                                ) : (
                                  <Flex>
                                    Confirmada{" "}
                                    <FaCheckCircle
                                      color="green"
                                      style={{ marginLeft: 4, marginTop: 2 }}
                                    />
                                  </Flex>
                                )}
                              </Td>

                              <Td>
                                <Button
                                  marginRight={5}
                                  as="a"
                                  target="_blank"
                                  href={currentContactLink(r.user.phone, 1)}
                                >
                                  <PhoneIcon color="black" />
                                </Button>
                                <Button
                                  as="a"
                                  target="_blank"
                                  href={currentContactLink(r.user.phone, 0)}
                                >
                                  <FaWhatsapp color="green" />
                                </Button>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRefCard} onClick={onCloseCard}>
                    Fechar
                  </Button>

                  {selected.user.id != user.id && !isUserInRequests && (
                    <Button
                      isLoading={isLoading}
                      bg="#62D0C6"
                      color={"white"}
                      ml={3}
                      _hover={{
                        bg: "#81d9d1",
                      }}
                      onClick={(e) => requestRide(selected.index)}
                    >
                      Solicitar Carona
                    </Button>
                  )}

                  {selected.user.id != user.id && isUserInRequests && (
                    <Button
                      bg="#62D0C6"
                      color={"white"}
                      ml={3}
                      _hover={{
                        bg: "#81d9d1",
                      }}
                      as={isUserRequestsAcepted ? "a" : null}
                      href={contactLinkDriver.zap}
                      target="_blank"
                      isLoading={!isUserRequestsAcepted}
                      loadingText="Aguardando aceite .."
                      spinner={null}
                    >
                      Falar com caroneiro
                    </Button>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Container>
    </Container>
  );
}

// colocar em baixo todas as caronas disponiveis v
