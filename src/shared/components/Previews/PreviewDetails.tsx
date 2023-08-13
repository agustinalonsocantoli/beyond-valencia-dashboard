import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Heading,
    Icon,
    List,
    ListItem,
    Text
} from "@chakra-ui/react";
// Icons
import { RxCheck, RxCross1 } from "react-icons/rx"
import { Exporuse } from "./Exposure";

interface Props {
    data: any;
}

export const PreviewDetails = ({ data }: Props) => {
    return (

        <Flex direction="column" gap="30px">
            <Box>
                <Exporuse 
                    multimedia={data?.multimedia}
                    title={data?.title}
                    width="100%"
                />
            </Box>

            <Box>
                <Heading fontSize="25px">{data?.title}</Heading>
                <Text><strong>{data?.subtitle?.label && `${data?.subtitle?.label}: `}</strong>{data?.subtitle?.text}</Text>
            </Box>

            <Text>
                {data?.headline}
            </Text>

            <Box>
                <Heading mb="5px" fontSize="18px">Overview</Heading>
                <Text>
                    {data?.description}
                </Text>
            </Box>

            <Box>
                <Heading mb="5px" fontSize="18px">Highlights</Heading>
                <List listStyleType="initial" ml="20px">
                    {data?.highlights?.map((item: string, index: number) => (
                        <ListItem key={index}>{item}</ListItem>
                    ))}
                </List>
            </Box>

            {(data?.included) &&
                <Box>
                    <Heading mb="5px" fontSize="18px">Included</Heading>
                    <Flex>
                        <List flex="1">
                            {data?.included?.map((item: any, index: number) => (
                                item?.state &&
                                <ListItem listStyleType='none' key={index}>
                                    <Icon as={RxCheck} color='green' mr="5" />
                                    {item?.text}
                                </ListItem>
                            ))}
                        </List>

                        <List flex="1">
                            {data?.included?.map((item: any, index: number) => (
                                !item?.state &&
                                <ListItem listStyleType='none' key={index}>
                                    <Icon as={RxCross1} color='red' mr="5" />
                                    {item?.text}
                                </ListItem>
                            ))}
                        </List>
                    </Flex>
                </Box>
            }

            <Box>
                <Heading mb="5px" fontSize="18px">Details</Heading>
                <Flex>
                    <Flex direction="column" gap="10px" flex="1">
                        <Text><Text as="span" fontWeight="bold">Age:</Text> {data?.details?.age}</Text>
                        <Text><Text as="span" fontWeight="bold">How long?:</Text> {data?.details?.duration}</Text>
                        <Text><Text as="span" fontWeight="bold">Ticketing:</Text> {data?.details?.ticket}</Text>
                        <Text><Text as="span" fontWeight="bold">Availability:</Text> {data?.details?.availably}</Text>
                        <Text><Text as="span" fontWeight="bold">Lenguage:</Text> {data?.details?.language}</Text>
                    </Flex>

                    <Flex direction="column" gap="10px" flex="1">
                        <Text><Text as="span" fontWeight="bold">Meeting Point:</Text> {data?.details?.meetengPoint?.label}</Text>
                        <Text><Text as="span" fontWeight="bold">Accessibility:</Text> {data?.details?.accessibility}</Text>
                        <Text><Text as="span" fontWeight="bold">Mobility:</Text> {data?.details?.mobility}</Text>
                    </Flex>
                </Flex>
            </Box>

            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            More about data
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel>
                        <p>{data?.information}</p>
                    </AccordionPanel>
                </AccordionItem>

                {data?.policies &&
                    <AccordionItem>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Cancelation polices
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>

                        <AccordionPanel>
                            <p>{data?.policies}</p>
                        </AccordionPanel>
                    </AccordionItem>
                }

                <AccordionItem>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Terms and conditions
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel>
                        <p>{data?.conditions}</p>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
}