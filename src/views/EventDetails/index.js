import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import GiveRideForm from "./giveRideForm";
import { updateArrayFieldEvent } from "../../services/events";
import { updateVehicle } from "../../services/user";
import { giveRideSchema } from "../../services/formValidation";
import { UserContext } from "../../context/user";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={10}
        h={10}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function EventDetails() {
  const { state } = useLocation();
  const event = state?.event || {};
  const { date, id, location, title } = event;

  const toast = useToast();
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

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
          duration: 5000,
          isClosable: true,
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW={"5xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Categoria
          </Text>
          <Heading>{title}</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={CiLocationOn} color={"#62D0C6"} w={6} h={6} />}
              iconBg={"gray.100"}
              text={location}
            />
            <Feature
              icon={<Icon as={CiCalendarDate} color={"#62D0C6"} w={6} h={6} />}
              iconBg={"gray.100"}
              text={date}
            />
          </Stack>
        </Stack>
        <Flex justify="space-between">
          <Tabs w="100%" variant="enclosed" colorScheme="green">
            <TabList mb="1em">
              <Tab
                flex="1"
                textAlign="center"
                _selected={{ color: "white", bg: "#62D0C6" }}
                border="0.1rem solid #62D0C6"
              >
                Dar Carona
              </Tab>
              <Tab
                flex="1"
                textAlign="center"
                _selected={{ color: "white", bg: "#62D0C6" }}
                border="0.1rem solid #62D0C6"
              >
                Pedir Carona
              </Tab>
            </TabList>
            <TabPanels w="100%" p={0}>
              <TabPanel w="100%" p={0} style={{ padding: 0 }}>
                <GiveRideForm
                  form={form}
                  onChange={onChange}
                  submit={submitGiveRideForm}
                  isLoading={isLoading}
                  userData={user}
                />
              </TabPanel>
              <TabPanel p={0} style={{ padding: 0 }}></TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </SimpleGrid>
    </Container>
  );
}

// colocar em baixo todas as caronas disponiveis v
