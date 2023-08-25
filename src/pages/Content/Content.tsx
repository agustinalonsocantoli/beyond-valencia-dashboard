import { Box, Flex } from "@chakra-ui/react";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { useEffect, useState } from "react";
import { getAllContent } from "../../shared/middlewares/content.middleware";
import { AxiosResponse } from "axios";
import { ContentInt } from "../../interfaces/ContentInt";
import { CardsView } from "../../shared/components/Card/CardsView";

export const Content = () => {
    const [content, setContent] = useState<ContentInt[]>()
    const [refresh, setRefresh] = useState<boolean>(true)

    useEffect(() => {
        refresh &&
            getAllContent()
            .then((response: AxiosResponse) => {
                setContent(response?.data?.data)
                setRefresh(false)
            })

    }, [refresh])

    return (
        <Flex
            direction="column"
            w="100%"
        >
            <Topbar
                title="Cards"
            />

            <Box px="20px">
                <CardsView 
                    data={content}
                    setRefresh={setRefresh}
                />
            </Box>
        </Flex>
    );
};