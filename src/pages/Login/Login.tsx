import { Box, Button, Flex, FormLabel, Image, Input, useToast } from "@chakra-ui/react";
import { useAuthContex } from "../../shared/context/auth.context";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { getToken } from "../../shared/middlewares/token.middleware";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
// Image
import Logo from '../../assets/logoB.png';
import Fondo from '../../assets/img/fondo1.jpg';
import { useState } from "react";

export const Login = () => {
    const { login } = useAuthContex();
    const navigate = useNavigate();
    const toast = useToast();

    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const handleSubmit = (e:  React.FormEvent) => {
        e.preventDefault();

        getToken(username, password)
        .then((response: AxiosResponse) => {
            login(response?.data?.token, response?.data?.data, navigate)
        })
        .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Username o Password incorrecto"))
            
    };

    return (
        <Flex 
            justifyContent="center"
            alignItems="center"
            backgroundImage={`url(${Fondo})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            w="100%"
            h="100vh"
        >
            <Flex 
                p="25px 50px"
                direction="column"
                w="40%"
                bg="rgba(255, 255, 255, 0.4)"
                borderRadius="8px"
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                backdropFilter="blur(3px)"
                css={{
                    "WebkitBackdropFilter": "blur(3px)",
                }}
                border="1px solid rgba(255, 255, 255, 0.3)"
            >
                <Flex
                    w="300px"
                    mx="auto"
                >
                    <Image 
                        src={Logo}
                        alt="logo/beyondValencia"
                        objectFit="cover"
                    />
                </Flex>

                <form onSubmit={handleSubmit}>
                    <Box 
                        mt="4" 
                        w="70%"
                        mx="auto"
                    >
                        <FormLabel fontSize="13px" fontWeight="bold">Username</FormLabel>
                        <Input
                            type='text'
                            id="username"
                            name="username"
                            variant='filled'
                            placeholder='username'
                            size='md'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            value={username}
                        />
                    </Box>

                    <Box 
                        mt="4" 
                        w="70%"
                        mx="auto"
                    >
                        <FormLabel fontSize="13px" fontWeight="bold">Contraseña</FormLabel>
                        <Input
                            type='password'
                            id="password"
                            name="password"
                            variant='filled'
                            placeholder='Contraseña'
                            size='md'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Box>
                    
                    <Flex
                        justifyContent="end" 
                        mt="4" 
                        w="70%"
                        mx="auto"
                    >
                        <Button type='submit' colorScheme='blue' mt="5">Iniciar Sesion</Button>
                    </Flex>

                </form>
            </Flex>
        </Flex>
    );
};