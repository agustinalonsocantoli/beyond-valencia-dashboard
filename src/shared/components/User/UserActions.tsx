// Chakra UI
import { Avatar, Button, Flex, Icon, Text, useColorModeValue, useToast } from "@chakra-ui/react";
// Icons
import { BiUserCircle } from "react-icons/bi"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { AiOutlinePoweroff } from "react-icons/ai"
// Hooks
import { useAuthContex } from "../../context/auth.context";
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Modal {
    open: boolean;
    rotate: number;
}

export const UserActions = () => {
    const { user, logout } = useAuthContex();
    const navigate = useNavigate();
    const toast = useToast();
    const [modal, setModal] = useState<Modal>({ open: false, rotate: 0 })

    const handleClick = () => {
        modal.open
            ?
            setModal({ open: false, rotate: 0 })
            :
            setModal({ open: true, rotate: 180 });
    };

    return (
        <Flex>
            <Flex bg={"transparent"} pr="10px" gap="5px" h="30px" alignItems="center" borderRadius="90px" pos="relative">
                <Avatar name={`${user?.firstName}`} src={""} size="sm" />

                <Button
                    onClick={handleClick}
                    bg="transparent"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "transparent" }}
                >
                    <Flex alignItems="center" gap="12px">
                        <Text fontSize="15px" fontWeight="semibold">{user?.firstName}</Text>

                        <Icon
                            color="#a5a8b3"
                            w="20px"
                            h="20px"
                            transition="all 0.2s ease 0s"
                            transform={`rotate(${modal.rotate}deg)`}
                            as={MdOutlineKeyboardArrowDown}
                        >
                        </Icon>
                    </Flex>
                </Button>

                <Flex
                    pos="absolute"
                    bg={"#FFFFFF"}
                    border={"1px solid #f0f0f3"}
                    bottom="35px"
                    right="0"
                    borderRadius="14px"
                    boxShadow="rgba(0, 0, 0, 0.25) 0px 4px 29px 0px"
                    opacity={modal.open ? "1" : "0"}
                    visibility={modal.open ? "visible" : "hidden"}
                    transform={modal.open ? "none" : "scale(0.8) translateZ(0px)"}
                    flexDirection="column"
                >
                    <Flex flexDirection="column" p="22px 18px" gap="15px">

                        {/* <Flex alignItems="center" gap="10px" cursor="pointer" onClick={() => navigate("/perfil")}>
                            <Icon as={BiUserCircle} color="#8c909c" w="16px" h="16px" />
                            <Text fontWeight="normal" fontSize="16px">Perfil</Text>
                        </Flex> */}

                        <Flex alignItems="center" gap="10px" cursor="pointer" onClick={() => logout(navigate, toast)}>
                            <Icon as={AiOutlinePoweroff} color="#8c909c" w="16px" h="16px" />
                            <Text fontWeight="normal" fontSize="16px">Cerrar sesión</Text>
                        </Flex>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};