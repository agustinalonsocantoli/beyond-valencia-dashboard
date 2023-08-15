import { Box, Grid, Image } from "@chakra-ui/react";

interface Props {
    multimedia: {
        type: "image" | "video";
        src: string;
    }[];
    title: string;
    width?: string;
}
export const Exporuse = ({ multimedia, title = "img", width = "300px" }: Props) => {
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
                    h={ index === 0 ? "253px" : "125px" }
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
                >
                    {item?.type === "video" &&
                        <video autoPlay muted loop>
                            <source src={item?.src} />
                        </video>
                    }

                    {item?.type === "image" &&
                        <Image src={item?.src} alt={title + index} objectFit="cover" h="100%" w="100%"/>
                    }
                </Box>
            ))}
        </Grid>
    );
}