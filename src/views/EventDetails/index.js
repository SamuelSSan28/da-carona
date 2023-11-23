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
} from "@chakra-ui/react";
import { CiLocationOn, CiCalendarDate, CiAlarmOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import GiveRideForm from "./giveRideForm";
import { updateArrayFieldEvent } from "../../services/events";
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
  const event = state?.event || {};
  const { date, id, location, title, day, hour } = event;

  const toast = useToast();
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState({
    giveRide: [1, 2, 3, 4],
  });
  const { user } = useContext(UserContext);
  const {
    isOpen: isOpenGiveRide,
    onOpen: onOpenGiveRide,
    onClose: onCloseGiveRide,
  } = useDisclosure();
  const cancelRefGiveRide = useRef();

  console.log("adadas", isOpenGiveRide, onOpenGiveRide, onCloseGiveRide);

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

          <Button bg={"#62D0C6"} color="white" _hover={{ bg: "#81d9d1" }} m={4}>
            Pedir Carona
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}

// colocar em baixo todas as caronas disponiveis v
