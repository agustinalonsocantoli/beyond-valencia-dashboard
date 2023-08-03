import { Box, Flex, Image, usePrefersReducedMotion, keyframes, Button, useToast } from "@chakra-ui/react";
// Image
import Logo from '../../../assets/logoB.png';
import { useLocation, useNavigate } from "react-router-dom";
import { LinkMenu } from "../LinkMenu/LinkMenu";
import { MdAirplaneTicket } from "react-icons/md"
import { BiTrip } from "react-icons/bi"
import { IoFastFoodOutline } from "react-icons/io5"
import { GiLockers, GiDutchBike } from "react-icons/gi"
import { LiaCreditCardSolid, LiaQrcodeSolid } from "react-icons/lia"
import { ImFilePicture } from "react-icons/im"
import { useAuthContex } from "../../context/auth.context";

interface ItemsMenuInt {
    path: string;
    icon: any;
    label: string;
    active: boolean;
}

export const Sidebar = () => {
    const { logout } = useAuthContex();
    const navigate = useNavigate()
    const toast = useToast();
    const location = useLocation();
    const motion = usePrefersReducedMotion()

    const animation = motion
    ? undefined
    : `${open} forwards 500ms ease`

    const activePath = (path: string): boolean => {
        if(path === '/'){
            return true
        } else {
            if (location.pathname.includes(path)) 
                return true
            return false
        }
    };

    const ItemsMenu: ItemsMenuInt[] = [
        {
            path: "/experiences",
            icon: MdAirplaneTicket,
            label: "Experiences",
            active: activePath("/experiences")
        },
        {
            path: "/daytrips",
            icon: BiTrip,
            label: "Daytrips",
            active: activePath("/daytrips")
        },
        {
            path: "/food",
            icon: IoFastFoodOutline,
            label: "Food & Daining",
            active: activePath("/food")
        },
        {
            path: "/lockers",
            icon: GiLockers,
            label: "Lockers",
            active: activePath("/lockers")
        },
        {
            path: "/bikes",
            icon: GiDutchBike,
            label: "Bikes",
            active: activePath("/bikes")
        },
        {
            path: "/content",
            icon: LiaCreditCardSolid,
            label: "Cards",
            active: activePath("/content")
        },
        {
            path: "/multimedia",
            icon: ImFilePicture,
            label: "Multimedia",
            active: activePath("/multimedia")
        },
        {
            path: "/codes",
            icon: LiaQrcodeSolid,
            label: "Codes",
            active: activePath("/codes")
        }
    ]

    return(
        <Flex 
            direction="column"
            animation={animation}
            h="100vh"
            borderRight="1px solid #E2E8F0"
            p="10px"
            justifyContent="space-between"
        >
            <Flex 
                direction="column"
            >
                <Box
                    w="150px"
                >
                    <Image 
                        src={Logo}
                        alt="Logo/Sidebar"
                    />
                </Box>

                <Flex 
                    direction="column"
                    gap="20px"
                    mt="20px"
                >
                    {ItemsMenu?.map((link: ItemsMenuInt, index: number) => (
                        <LinkMenu 
                            key={index}
                            path={link?.path}
                            label={link?.label}
                            icon={link?.icon}
                            active={link?.active}
                        />
                    ))}
                </Flex>
            </Flex>

                <Button 
                    colorScheme="blue"
                    fontSize="13px"
                    fontWeight="normal"
                    w="70%"
                    mx="auto"
                    mb="30px"
                    onClick={() => logout(navigate, toast)}
                >
                    Cerrar Sesión
                </Button>
        </Flex>
    );
};

const open = keyframes`
    from { 
        transform: translateX(-175px);
    }
    to { 
        transform: translateX(0);
    }
`