// Chakra UI
import { Flex, Heading, Icon, Toast } from "@chakra-ui/react";
// Icons
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { useLocation } from "react-router-dom";
import { useSidebarView } from "../../context/sidebar.context";

interface Props {
    title: string;
    onClick?: (e: Event) => void
}

export const Topbar = ({ 
    title,
    onClick
}: Props) => {
    const { sidebarView, setSidebarView } = useSidebarView();
    const location = useLocation();

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            h="75px"
            w="100%"
            pl="20px"
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
        </Flex>
    );
};