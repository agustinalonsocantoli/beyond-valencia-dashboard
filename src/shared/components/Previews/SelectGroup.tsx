// Interfaces
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { OrdersGroupsInt } from "../../../interfaces/ExperiencesInt";

interface Props {
    groups: OrdersGroupsInt[]
}

export const SelectGroup = (props: Props) => {
    const { groups } = props

    return (
        <Flex
            direction="column"
            gap="10px"
        >
            {groups?.map((order: OrdersGroupsInt, i: number) => (
                <Flex
                    key={i}
                    justifyContent="space-between"
                    alignItems="center"
                    border="1px solid rgba(0, 0, 0, 1)"
                    borderRadius="8px"
                    padding="10px"
                    mx="auto"
                    w="70%"
                >
                    <Flex
                        alignItems="center"
                        w="100%"
                        justifyContent="space-around"
                    >
                        <Heading fontSize="18px">{order.title}</Heading>

                        <Box>
                            <Text fontSize="18px" fontWeight="semibold" textDecoration="underline">Price</Text>
                            {order?.prices?.adults && <Text fontSize="15px">Adults €{order?.prices?.adults}</Text>}
                            {order?.prices?.children && <Text fontSize="15px">Children €{order?.prices?.children}</Text>}
                        </Box>

                        <Box>
                            {order?.deapertureTime && 
                                order?.deapertureTime?.map((time: string, index: number) => (
                                    <Text fontSize="15px" key={index}>{time}</Text>
                                ))
                            }
                        </Box>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
};