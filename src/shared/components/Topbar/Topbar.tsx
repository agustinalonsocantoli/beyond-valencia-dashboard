// Chakra UI
import { Button, Flex, Heading, Icon, Text, Toast } from "@chakra-ui/react";
// Icons
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { useSidebarView } from "../../context/sidebar.context";

interface Props {
    title: string;
    buttons?: {
        onClick: (e: any) => void;
        label: string;
        icon?: any;
        isDisabled?: boolean;
        requiredText?: string;
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
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <Button 
                            onClick={item.onClick} 
                            key={index} 
                            gap="5px" 
                            alignItems="center"
                            bg={"rgba(50, 212, 164, .50)"}
                            _hover={{ bg: "rgba(50, 212, 164, .25)"}}
                            isDisabled={item?.isDisabled}
                        >
                            {item?.label}
                            {item?.icon && <Icon as={item?.icon} boxSize="20px"/>}
                        </Button>
                        {(item?.requiredText && item?.isDisabled) &&
                            <Text color="red" fontSize="13px">
                                {item?.requiredText}
                            </Text>
                        }
                    </Flex>
                )))
            }
        </Flex>
    );
};