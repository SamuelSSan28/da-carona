import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const Card = (props) => {
  const { children } = props;

  return <Box {...props}>{children}</Box>;
};

const CardContent = (props) => {
  const { children } = props;

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      {...props}
    >
      {children}
    </Stack>
  );
};

const CardHeading = (props) => {
  const { children } = props;

  return (
    <Heading as={"h3"} fontSize={"xl"} {...props}>
      {children}
    </Heading>
  );
};

const CardText = (props) => {
  const { children } = props;

  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
      {...props}
    >
      {children}
    </Text>
  );
};

export { Card, CardHeading, CardText, CardContent };
