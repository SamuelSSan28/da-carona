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
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  VStack,
} from "@chakra-ui/react";
import { CiLocationOn, CiCalendarDate, CiAlarmOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import GiveRideForm from "./giveRideForm";
import { getEvent, updateArrayFieldEvent } from "../../services/events";
import { updateVehicle } from "../../services/user";
import { giveRideSchema } from "../../services/formValidation";
import { UserContext } from "../../context/user";
import {
  Card,
  CardContent,
  CardHeading,
  CardText,
} from "../../components/EventCard";
import { useRef } from "react";
import { useEffect } from "react";
import vehicleIcons from "./icons";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      rounded={"xl"}
    >
      <Flex justifyContent={"start"} align={"center"}>
        {icon}
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontSize={"1xl"} fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>

          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
      </Flex>
    </Stat>
  );
}

export default function EventDetails() {
  const { state } = useLocation();
  const toast = useToast();
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(false);
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

  const event = state?.event || {};
  const { user } = useContext(UserContext);
  const { date, id, location, title, day, hour } = event;

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
      await updateArrayFieldEvent(id, { ...form, user }, "giveRideRequests");
      //pegar user id do contexto
      await updateVehicle(user.id, form.vehicle, form.vehicleVacancies);

      toast({
        title: "Carona cadastrado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setForm({});
    } catch (error) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = await getEvent(id);

        console.log("eeevent", event);
        setRequests({
          ...requests,
          giveRide: event.giveRideRequests || [],
        });
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Container maxW="100%">
      <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
          color={"#62D0C6"}
        >
          {title}
        </chakra.h1>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Localização"}
            stat={location}
            icon={<CiLocationOn size={"2em"} />}
          />
          <StatsCard
            title={"Data"}
            stat={day}
            icon={<CiCalendarDate size={"2em"} />}
          />
          <StatsCard
            title={"Horario"}
            stat={hour}
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
                    >
                      Continuar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>

          {/* <Button bg={"#62D0C6"} color="white" _hover={{ bg: "#81d9d1" }} m={4}>
            Pedir Carona
  </Button>*/}
        </Flex>
      </Box>

      <Container maxW={"full"} py={12} pt={0} as={Stack} spacing={12}>
        <Tabs w="100%" variant="enclosed" colorScheme="green">
          <TabList mb="1em">
            <Tab
              flex="1"
              textAlign="center"
              _selected={{ color: "white", bg: "#62D0C6" }}
              border="0.1rem solid #62D0C6"
            >
              Pedir Carona
            </Tab>
            <Tab
              flex="1"
              textAlign="center"
              _selected={{ color: "white", bg: "#62D0C6" }}
              border="0.1rem solid #62D0C6"
            >
              Dar Carona
            </Tab>
          </TabList>
          <TabPanels w="100%" p={0}>
            <TabPanel w="100%" p={0} style={{ padding: 2 }}>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                spacing={{ base: 0, md: 0, lg: 6 }}
              >
                {requests.giveRide.length > 0 &&
                  requests.giveRide.map((request) => (
                    <Card
                      key={request.id}
                      h={{ base: 160, lg: 200 }}
                      onClick={(e) => {
                        onOpenCard();
                        setSelected(request);
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
                            {vehicleIcons[request.vehicle].icon}
                          </Box>

                          {/* Textos à direita */}
                          <VStack align="start" spacing={2}>
                            <CardText>
                              Vagas: {request.vehicleVacancies}
                            </CardText>
                            <CardText>
                              Saindo as: {request.departureTime}
                            </CardText>
                            {request.ridePrice && (
                              <CardText>
                                Contribuição pela carona: {request.ridePrice}
                              </CardText>
                            )}
                          </VStack>
                        </Flex>
                      </CardContent>
                    </Card>
                  ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel p={0} style={{ padding: 0 }}></TabPanel>
          </TabPanels>

          <AlertDialog
            isOpen={isOpenCard}
            leastDestructiveRef={cancelRefCard}
            onClose={onCloseCard}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Oferecer Carona
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Flex align="center">
                    {/* Ícone centralizado e grande */}
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
                      <CardText>Veiculo: { vehicleIcons[selected.vehicle].label}</CardText>
                      <CardText>Vagas: {selected.vehicleVacancies}</CardText>
                      <CardText>Saindo as: {selected.departureTime}</CardText>
                      <CardText>Saindo de: {selected.boardingPlace}</CardText>
                      <CardText>Passando por: {selected.passingBy}</CardText>
                      {selected.ridePrice && (
                        <CardText>
                          Contribuição pela carona: {selected.ridePrice}
                        </CardText>
                      )}
                    </VStack>
                  </Flex>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRefCard} onClick={onCloseCard}>
                    Fechar
                  </Button>
                  {/* <Button
                    isLoading={isLoading}
                    bg="#62D0C6"
                    color={"white"}
                    ml={3}
                  >
                    Continuar
                            </Button>*/}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Tabs>
      </Container>
    </Container>
  );
}

// colocar em baixo todas as caronas disponiveis v
