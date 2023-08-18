import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { MultimediaInt } from "../../../interfaces/MultimediaInt";
import { MultimediaModalForm } from "./MultimediaModalForm";
import { Exporuse } from "../../../shared/components/Previews/Exposure";

interface Props {
    experiences: MultimediaInt[] | undefined;
    daytrips: MultimediaInt[] | undefined;
    food: MultimediaInt[] | undefined;
    setRefresh: (action: boolean) => void;
}

export const LandingTabs = ({ experiences, daytrips, food, setRefresh }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editMultimedia, setEditMultimedia] = useState<MultimediaInt>();

    const onClick = (multimedia: MultimediaInt) => {
        setEditMultimedia(multimedia)
        onOpen();
    }

    return (
        <>
            <Tabs isFitted>
                <TabList mb='1em'>
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
                            <Exporuse
                                multimedia={experiences}
                                title="experiences"
                                width="100%"
                                height={{
                                    single: "503px",
                                    double: "250px"
                                }}
                                isEdit={true}
                                handleClick={onClick}
                            />
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
                            <Exporuse
                                multimedia={daytrips}
                                title="daytrips"
                                width="100%"
                                height={{
                                    single: "503px",
                                    double: "250px"
                                }}
                                isEdit={true}
                                handleClick={onClick}
                            />
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
                            <Exporuse
                                multimedia={food}
                                title="food"
                                width="100%"
                                height={{
                                    single: "503px",
                                    double: "250px"
                                }}
                                isEdit={true}
                                handleClick={onClick}
                            />
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <MultimediaModalForm
                isOpen={isOpen}
                onClose={onClose}
                multimedia={editMultimedia}
                setMultimedia={setEditMultimedia}
                setRefresh={setRefresh}
            />
        </>
    );
}