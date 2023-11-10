'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    InputLeftAddon,
} from '@chakra-ui/react'

export default function SignIn({
    setStep,
    handleValidatioStep,
    onChange
}) {

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Curta todas as viagens com estilo 😎✌️
                    </Text>
                </Stack>

                <Box
                    minW={'500px'}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={8}>

                        <FormControl id="email" isRequired>
                            <FormLabel>Telefone</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children='+55' />
                                <Input name='phone' type='tel' pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={onChange} />
                            </InputGroup>
                        </FormControl>


                        <Stack spacing={10} pt={2}>
                            <Button
                                id="sign-in-button"
                                onClick={handleValidatioStep}
                                loadingText="Submitting"
                                size="lg"
                                bg={'#62D0C6'}
                                color={'white'}
                                _hover={{
                                    bg: '#81d9d1',
                                }}>
                                Entrar
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'} onClick={( e => setStep(1))}>
                                Não é cadastrado? <Link color={'#62D0C6'}>Cadastre-se</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}