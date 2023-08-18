import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { ContentInt } from "../../../interfaces/ContentInt";

interface Props {
    item: ContentInt;
    handleClick: (item: ContentInt) => void;
}

export const CardElement = ({ item, handleClick }: Props) => {
    return (
        <>
            <Flex
                flex="1"
                maxW="375px"
                minH="550px"
                position="relative"
                borderRadius="20px"
                _after={{
                    content: "''",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    borderRadius: "20px",
                }}
                cursor="pointer"
                onClick={() => handleClick(item)}
            >
                <picture>
                    <source srcSet={item?.imgW} type="image/webp" style={{ objectFit: "cover", height: "100%", width: "100%", borderRadius: "20px" }} />
                    <Image src={item?.img} alt={`img/${item?.h3}`} objectFit="cover" h="100%" w="100%" borderRadius="20px" />
                </picture>

                <Box
                    position="absolute"
                    bottom="30px"
                    color="#FFF"
                    zIndex="99"
                    w="70%"
                    left="0"
                    right="0"
                    margin="auto"
                >
                    <Heading fontSize="30px">{item?.h3}</Heading>
                    <Text fontSize="20px" w="93%">{item?.p}</Text>
                </Box>
            </Flex>
        </>
    );
}