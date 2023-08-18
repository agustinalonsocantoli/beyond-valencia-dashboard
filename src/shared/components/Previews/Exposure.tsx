import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { MultimediaInt } from "../../../interfaces/MultimediaInt";

interface Props {
    multimedia: MultimediaInt[] | undefined;
    title: string;
    width?: string;
    height?: {
        single: string;
        double: string;
    };
    isEdit?: boolean;
    handleClick?: (item: MultimediaInt) => void;
}

export const Exporuse = ({
    multimedia,
    title = "img",
    width = "300px",
    height = { single: "253px", double: "125px" },
    isEdit = false,
    handleClick = () => { }
}: Props) => {

    const gridOne = {
        gridColumn: "1 / 2",
        gridRow: "1 / 3"
    }

    const gridTwo = {
        gridColumn: "2 / 3",
        gridRow: "1 / 2"
    }

    const gridThree = {
        gridColumn: "3 / 4",
        gridRow: "1 / 2"
    }

    const gridFour = {
        gridColumn: "2 / 4",
        gridRow: "2 / 3"
    }

    return (
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap="3px" w={width}>
            {multimedia?.map((item: any, index: number) => (
                <Box
                    position="relative"
                    h={index === 0 ? height?.single : height?.double}
                    w={"100%"}
                    key={index}
                    gridColumn={
                        index === 0 ? gridOne.gridColumn
                            : index === 1 ? gridTwo.gridColumn
                                : index === 2 ? gridThree.gridColumn
                                    : gridFour.gridColumn
                    }
                    gridRow={
                        index === 0 ? gridOne.gridRow
                            : index === 1 ? gridTwo.gridRow
                                : index === 2 ? gridThree.gridRow
                                    : gridFour.gridRow
                    }
                    cursor={isEdit ? "pointer" : "default"}
                    onClick={() => handleClick(item)}
                >
                    {item?.type === "video" &&
                        <video
                            autoPlay
                            muted
                            loop
                            style={{
                                objectFit: "cover",
                                height: "100%",
                                width: "100%",
                                borderRadius: isEdit ? "20px" : "0"
                            }}
                        >
                            <source src={item?.src} />
                        </video>
                    }

                    {item?.type === "image" &&
                        <Image
                            src={item?.src} alt={title + index}
                            objectFit="cover"
                            h="100%"
                            w="100%"
                            borderRadius={isEdit ? "20px" : "0"}
                        />
                    }

                    {isEdit &&
                        <Box
                            className={`content-${index + 1}`}
                            p={item?.h3 || item?.p ? "5px 0 5px 20px" : "0"}
                            position="absolute"
                            color="#FFF"
                            bottom="0"
                            left="0"
                            borderRadius="0 0 20px 20px"
                            textAlign="left"
                            width="100%"
                            background="rgba(0, 0, 0, .7)"
                        >
                            <Heading>{item?.h3}</Heading>
                            <Text>
                                <Text as="strong" mr="5px">{item?.span}:</Text>
                                {item?.p}
                            </Text>
                        </Box>
                    }
                </Box>
            ))}
        </Grid>
    );
}