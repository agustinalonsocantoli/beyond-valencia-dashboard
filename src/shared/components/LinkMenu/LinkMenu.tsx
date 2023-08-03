// React
import { Link as LinkRouter } from 'react-router-dom'
// Chakra UI
import { Box, Link, Icon, Text, Flex } from "@chakra-ui/react";

interface Props {
    path: string;
    icon: any;
    label: string;
    active?: boolean;
}

export const LinkMenu = (props: Props) => {
    const { path, icon, label, active = false } = props;

    return(
        <Link as={LinkRouter} to={path} display="flex" _hover={{ textTransform: "none" }}>
            <Flex 
                alignItems="center" 
                ml="15px" 
                bg={active ? "rgba(50, 212, 164, .15)" : "inherit"} 
                p="10px 15px" 
                borderRadius="8px"
                gap="5px"
            >
                <Icon as={icon} color={active ? "#32d4a4" : "#000000"} fontSize={25}/>

                <Text 
                color={active ? "#32d4a4" : "#000000"} 
                fontSize={14}  
                >
                    {label}
                </Text>
            </Flex>
        </Link>
    );
};