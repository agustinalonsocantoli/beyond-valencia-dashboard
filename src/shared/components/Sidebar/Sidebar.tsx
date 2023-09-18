import { Box, Flex, Image, usePrefersReducedMotion, keyframes, Button, useToast } from "@chakra-ui/react";
// Image
import Logo from '../../../assets/logoB.png';
import { useLocation } from "react-router-dom";
import { LinkMenu } from "../LinkMenu/LinkMenu";
import { MdAirplaneTicket, MdGroups } from "react-icons/md"
import { BiTrip, BiSlideshow } from "react-icons/bi"
import { GiLockers, GiDutchBike } from "react-icons/gi"
import { LiaCreditCardSolid, LiaQrcodeSolid } from "react-icons/lia"
import { ImFilePicture } from "react-icons/im"
import { useAuthContex } from "../../context/auth.context";
import { UserActions } from "../User/UserActions";
import { validateRol } from "../../utils/rol";

interface ItemsMenuInt {
    path: string;
    icon: any;
    label: string;
    active: boolean;
    isRolAllowed: string[];
}

export const Sidebar = () => {
    const { user } = useAuthContex();
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
            active: activePath("/experiences"),
            isRolAllowed: ["admin", "partner"],
        },
        {
            path: "/daytrips",
            icon: BiTrip,
            label: "Daytrips",
            active: activePath("/daytrips"),
            isRolAllowed: ["admin", "partner"],
        },
        // {
        //     path: "/food",
        //     icon: IoFastFoodOutline,
        //     label: "Food & Daining",
        //     active: activePath("/food"),
        //     isRolAllowed: ["admin", "partner"],
        // },
        {
            path: "/events",
            icon: BiSlideshow,
            label: "Events",
            active: activePath("/events"),
            isRolAllowed: ["admin", "partner"],
        },
        {
            path: "/lockers",
            icon: GiLockers,
            label: "Lockers",
            active: activePath("/lockers"),
            isRolAllowed: ["admin"],
        },
        {
            path: "/bikes",
            icon: GiDutchBike,
            label: "Bikes",
            active: activePath("/bikes"),
            isRolAllowed: ["admin"],
        },
        {
            path: "/content",
            icon: LiaCreditCardSolid,
            label: "Cards",
            active: activePath("/content"),
            isRolAllowed: ["admin"],
        },
        {
            path: "/multimedia",
            icon: ImFilePicture,
            label: "Multimedia",
            active: activePath("/multimedia"),
            isRolAllowed: ["admin"],
        },
        {
            path: "/codes",
            icon: LiaQrcodeSolid,
            label: "Codes",
            active: activePath("/codes"),
            isRolAllowed: ["admin"],
        },
        {
            path: "/partners",
            icon: MdGroups,
            label: "Partners",
            active: activePath("/partners"),
            isRolAllowed: ["admin"],
        }
    ]

    return(
        <Flex 
            direction="column"
            animation={animation}
            h="100vh"
            borderRight="1px solid #E2E8F0"
            p="10px"
            minW="200px"
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
                    gap="10px"
                    mt="20px"
                >
                    {ItemsMenu?.map((link: ItemsMenuInt, index: number) => (
                        validateRol(link?.isRolAllowed, user?.rol) &&
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
            
                <UserActions />
        </Flex>
    );
};

const open = keyframes`
    from { 
        transform: translateX(-200px);
    }
    to { 
        transform: translateX(0);
    }
`