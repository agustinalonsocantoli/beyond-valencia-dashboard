import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import { ContentInt } from "../../../interfaces/ContentInt";
import { CardElement } from "./CardElement";
import { ContentModalForm } from "../../../pages/Content/components/ContentModalForm";
import { useState } from "react";

interface Props {
    data: ContentInt[] | undefined;
    setRefresh: (action: boolean) => void;
}

export const CardsView = ({ data, setRefresh }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editContent, setEditContent] = useState<ContentInt>();

    const onClick = (content: ContentInt) => {
        setEditContent(content)
        onOpen();
    }

    return (
        <>
            <Tabs isFitted>
                <TabList mb='1em'>
                    <Tab>Home</Tab>
                    <Tab>Experiences</Tab>
                    <Tab>Daytrips</Tab>
                    <Tab>Food</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Flex
                            gap="20px"
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                            h="calc(100vh - 200px)"
                        >
                            {data?.map((item: ContentInt, index: number) => (
                                item.landing === "home" &&
                                <CardElement
                                    key={index}
                                    item={item}
                                    handleClick={onClick}
                                />
                            ))}
                        </Flex>
                    </TabPanel>

                    <TabPanel>
                        <Flex
                            gap="20px"
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                            h="calc(100vh - 200px)"
                        >
                            {data?.map((item: ContentInt, index: number) => (
                                item.landing === "experiences" &&
                                <CardElement
                                    key={index}
                                    item={item}
                                    handleClick={onClick}
                                />
                            ))}
                        </Flex>
                    </TabPanel>

                    <TabPanel>
                        <Flex
                            gap="20px"
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                            h="calc(100vh - 200px)"
                        >
                            {data?.map((item: ContentInt, index: number) => (
                                item.landing === "daytrips" &&
                                <CardElement
                                    key={index}
                                    item={item}
                                    handleClick={onClick}
                                />
                            ))}
                        </Flex>
                    </TabPanel>

                    <TabPanel>
                        <Flex
                            gap="20px"
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                            h="calc(100vh - 200px)"
                        >
                            {data?.map((item: ContentInt, index: number) => (
                                item.landing === "food" &&
                                <CardElement
                                    key={index}
                                    item={item}
                                    handleClick={onClick}
                                />
                            ))}
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <ContentModalForm 
                isOpen={isOpen}
                onClose={onClose}
                content={editContent}
                setContent={setEditContent}
                setRefresh={setRefresh}
            />
        </>
    );
}