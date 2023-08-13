// Chakra UI
import { Button, Flex, Heading, Icon, Toast } from "@chakra-ui/react";
// Icons
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { useLocation } from "react-router-dom";
import { useSidebarView } from "../../context/sidebar.context";

interface Props {
    title: string;
    buttons?: {
        onClick: (e: any) => void;
        label: string;
        icon?: any
    }[];
}

export const Topbar = ({
    title,
    buttons
}: Props) => {
    const { sidebarView, setSidebarView } = useSidebarView();

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            h="75px"
            w="100%"
            px="20px"
            borderBottom="1px solid #e2e8f0"
        >
            <Flex
                alignItems="center"
                gap="20px"
            >
                <Icon
                    boxSize="30px"
                    as={
                        sidebarView
                            ? AiOutlineMenuFold
                            : AiOutlineMenuUnfold
                    }
                    cursor="pointer"
                    onClick={() => setSidebarView((prev: boolean) => !prev)}
                />

                <Heading fontSize="30px">
                    {title}
                </Heading>
            </Flex>

            {buttons &&
                buttons.map(((item: any, index: number) => (
                    <Button 
                        onClick={item.onClick} 
                        key={index} 
                        gap="5px" 
                        alignItems="center"
                        bg={"rgba(50, 212, 164, .50)"}
                        _hover={{ bg: "rgba(50, 212, 164, .25)"}}
                    >
                        {item?.label}
                        {item?.icon && <Icon as={item?.icon} boxSize="20px"/>}
                    </Button>
                )))
            }
        </Flex>
    );
};