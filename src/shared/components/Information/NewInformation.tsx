import { Box, Button, Flex, FormLabel, Icon, Input, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { InformationSelect } from "../Elements/InformationSelect";
import { BiEdit, BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";
import { toastNotify } from "../../utils/toastNotify";
import { StatusEnumTypes } from "../../Types/StatusEnumTypes";
import { useEffect, useState } from "react";
import { OrdersGroupsInt } from "../../../interfaces/ExperiencesInt";
import { EditGroupModal } from "../Modals/EditGroupModal";
import { validateNewExperience } from "../../utils/validateData";
import { InputFile } from "../Inputs/InputFile";

interface Props {
    newValue: any;
    setNewValue: (action: any) => void;
    setIsDisabled: (action: boolean) => void;
    fromCalled: "experiences" | "daytrips" | "events"
}

export const NewInformation = ({ newValue, setNewValue, setIsDisabled, fromCalled }: Props) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupEdit, setGroupsEdit] = useState<{
        selectGroup: OrdersGroupsInt;
        index: number;
    }>();

    useEffect(() => {
        setNewValue((prev: any) => ({
            ...prev,
            highlights: [],
            included: [],
            groups: [],
            multimedia: [
                { src: '', type: 'image' },
                { src: '', type: 'image' },
                { src: '', type: 'image' },
                { src: '', type: 'image' },
            ]
        }));
    }, [])

    useEffect(() => {
        if (validateNewExperience(newValue))
            setIsDisabled(false)

    }, [newValue])

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (
            name === "label" ||
            name === 'text'
        ) {
            setNewValue((prev: any) => ({
                ...prev,
                subtitle: {
                    ...prev?.subtitle,
                    [name]: value
                }
            }));
        } else if (
            name === "age" ||
            name === "ticket" ||
            name === "language" ||
            name === "duration" ||
            name === "accessibility" ||
            name === "mobility" ||
            name === "availably"
        ) {
            setNewValue((prev: any) => ({
                ...prev,
                details: {
                    ...prev?.details,
                    [name]: value
                }
            }));
        } else if (
            name === "pointLink"
        ) {
            setNewValue((prev: any) => ({
                ...prev,
                details: {
                    ...prev?.details,
                    meetengPoint: {
                        ...prev.details.meetengPoint,
                        link: value
                    }
                }
            }));
        } else if (
            name === "pointLabel"
        ) {
            setNewValue((prev: any) => ({
                ...prev,
                details: {
                    ...prev?.details,
                    meetengPoint: {
                        ...prev.details.meetengPoint,
                        label: value
                    }
                }
            }));
        }
        else {
            setNewValue((prev: any) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const changeHighlights = (e: any, i: number) => {
        const { name, value } = e.target;

        const newHighlights = [
            ...newValue?.highlights.slice(0, i),
            value,
            ...newValue?.highlights.slice(i + 1)
        ]

        setNewValue((prev: any) => ({
            ...prev,
            [name]: newHighlights
        }));

    }

    const changeIncluded = (e: any, i: number, isSelect = false) => {
        if (!isSelect) {
            const { name, value } = e.target;

            const newIncluded = [
                ...newValue?.included.slice(0, i),
                {
                    ...newValue?.included[i],
                    text: value
                },
                ...newValue?.included.slice(i + 1)
            ]

            setNewValue((prev: any) => ({
                ...prev,
                [name]: newIncluded
            }));
        } else {
            const { value } = e;

            const newIncluded = [
                ...newValue?.included.slice(0, i),
                {
                    ...newValue?.included[i],
                    state: value
                },
                ...newValue?.included.slice(i + 1)
            ]

            setNewValue((prev: any) => ({
                ...prev,
                included: newIncluded
            }));
        }
    }

    const selectedPublished = (e: any) => {

        setNewValue((prev: any) => ({
            ...prev,
            published: e.value
        }));
    }

    const addHighlights = () => {
        const newHighlights = [...newValue?.highlights, '']

        setNewValue((prev: any) => ({
            ...prev,
            highlights: newHighlights
        }));
    }

    const deleteHighlights = () => {
        newValue?.highlights.pop()

        setNewValue((prev: any) => ({
            ...prev,
            highlights: newValue?.highlights
        }));
    }

    const addIncluded = () => {
        const newIncluded = [
            ...newValue?.included,
            {
                text: "",
                state: true
            }
        ]

        setNewValue((prev: any) => ({
            ...prev,
            included: newIncluded
        }));
    }

    const deleteIncluded = () => {
        newValue?.included.pop()

        setNewValue((prev: any) => ({
            ...prev,
            included: newValue?.included
        }));
    }

    const imageSelect = (e: any, i: number) => {
        const { value } = e;

        const newMultimedia = [
            ...newValue?.multimedia?.slice(0, i),
            {
                ...newValue?.multimedia[i],
                type: value
            },
            ...newValue?.multimedia?.slice(i + 1)
        ]

        setNewValue((prev: any) => ({
            ...prev,
            multimedia: newMultimedia
        }));
    }

    const selectedGroup = (e: any, i: number) => {
        const { value, label } = e;

        const newGroup = [
            ...newValue?.groups.slice(0, i),
            {
                ...newValue?.groups[i],
                title: label,
                type: value
            },
            ...newValue?.groups.slice(i + 1)
        ]

        setNewValue((prev: any) => ({
            ...prev,
            groups: newGroup
        }));

        if (newValue?.groups[i - 1]?.title === label || newValue?.groups[i - 1]?.type === value)
            toastNotify(toast, StatusEnumTypes.INFO, `El grupo seleccionado ya existe`)
    }

    const addGroup = () => {
        if (newValue?.groups?.length < 2) {
            const newGroup = [
                ...newValue?.groups,
                {
                    title: "",
                    type: "",
                    prices: {
                        adults: null,
                        children: null
                    },
                    deapertureTime: []
                }
            ]

            setNewValue((prev: any) => ({
                ...prev,
                groups: newGroup
            }));
        } else {
            toastNotify(toast, StatusEnumTypes.WARNING, "Llego al limite de grupos")
        }
    }

    const deleteGroup = () => {
        newValue?.groups.pop()

        setNewValue((prev: any) => ({
            ...prev,
            groups: newValue?.groups
        }));
    }

    return (
        <Flex direction="column" pb="20px" gap="20px">
            <Box>
                <FormLabel>Publicado</FormLabel>
                <InformationSelect
                    name="published"
                    options={[
                        { value: true, label: "Si" },
                        { value: false, label: "No" }
                    ]}
                    onChange={selectedPublished}
                />
            </Box>

            {fromCalled === "events" &&
                <Box>
                    <FormLabel>Events Date</FormLabel>
                    <Input
                        name="eventDate"
                        type="date"
                        onChange={handleChange}
                    />
                </Box>
            }

            <Box>
                <FormLabel>Multimedia</FormLabel>

                <Flex direction="column" gap="10px">
                    {newValue?.multimedia?.map((item: any, index: number) => (
                        <Flex alignItems="center" gap="20px" key={index}>
                            <InputFile
                                name="multimedia"
                                value={newValue}
                                setValue={setNewValue}
                                index={index}
                                setIsDisabled={setIsDisabled}
                            />

                            <Box flex="1">
                                <InformationSelect
                                    name="multimediaType"
                                    options={[
                                        { value: "image", label: "Imagen" },
                                        { value: "video", label: "Video" }
                                    ]}
                                    onChange={(e: any) => imageSelect(e, index)}
                                />
                            </Box>
                        </Flex>
                    ))}
                </Flex>
            </Box>

            <Box>
                <FormLabel>Title</FormLabel>
                <Input
                    name="title"
                    onChange={handleChange}

                />
            </Box>

            <Flex gap="10px">
                <Box flex="1">
                    <FormLabel>Subtitle Label</FormLabel>
                    <Input
                        name="label"
                        onChange={handleChange}

                    />
                </Box>

                <Box flex="1">
                    <FormLabel>Subtitle Text</FormLabel>
                    <Input
                        name="text"
                        onChange={handleChange}

                    />
                </Box>
            </Flex>

            <Box>
                <FormLabel>Headline</FormLabel>
                <Textarea
                    name="headline"
                    resize="none"
                    minH="70px"
                    onChange={handleChange}

                />
            </Box>

            <Box>
                <FormLabel>Overview</FormLabel>
                <Textarea
                    name="description"
                    resize="none"
                    minH="100px"
                    onChange={handleChange}

                />
            </Box>

            <Box>
                <FormLabel>Highlights</FormLabel>

                <Flex direction="column" gap="5px">
                    {newValue?.highlights?.map((item: string, index: number) => (
                        <Input
                            key={index}
                            name="highlights"
                            onChange={(e: any) => changeHighlights(e, index)}

                        />
                    ))}
                </Flex>
                <Flex alignItems="center" gap="5px" mt="10px">
                    <Icon as={BiSolidPlusCircle}
                        boxSize="22px"
                        color="green"
                        cursor="pointer"
                        onClick={addHighlights}
                    />

                    <Icon
                        as={BiSolidMinusCircle}
                        boxSize="22px"
                        color="red"
                        cursor="pointer"
                        onClick={deleteHighlights}
                    />
                </Flex>
            </Box>

            <Box>
                <FormLabel>Included</FormLabel>

                <Flex direction="column" gap="5px">
                    {newValue?.included?.map((item: any, index: number) => (
                        <Flex alignItems="center" gap="10px" key={index}>
                            <Input
                                flex="1"
                                name="included"
                                onChange={(e: any) => changeIncluded(e, index)}

                            />

                            <Box flex="1">
                                <InformationSelect
                                    name="includedState"
                                    options={[
                                        { value: true, label: "Si" },
                                        { value: false, label: "No" }
                                    ]}
                                    onChange={(e: any) => changeIncluded(e, index, true)}
                                />
                            </Box>
                        </Flex>
                    ))}
                </Flex>

                <Flex alignItems="center" gap="5px" mt="10px">
                    <Icon as={BiSolidPlusCircle}
                        boxSize="22px"
                        color="green"
                        cursor="pointer"
                        onClick={addIncluded}
                    />

                    <Icon
                        as={BiSolidMinusCircle}
                        boxSize="22px"
                        color="red"
                        cursor="pointer"
                        onClick={deleteIncluded}
                    />
                </Flex>
            </Box>

            <Flex gap="10px">
                <Flex flex="1" direction="column" gap="10px">
                    <FormLabel>Details Age</FormLabel>
                    <Input
                        name="age"
                        onChange={handleChange}

                    />

                    <FormLabel>Details Meeting Point Link</FormLabel>
                    <Input
                        name="pointLink"
                        onChange={handleChange}

                    />

                    <FormLabel>Details Meeting Point Label</FormLabel>
                    <Input
                        name="pointLabel"
                        onChange={handleChange}

                    />
                </Flex>

                <Flex flex="1" direction="column" gap="10px">
                    <FormLabel>Details Ticketing</FormLabel>
                    <Input
                        name="ticket"
                        onChange={handleChange}

                    />

                    <FormLabel>Details Lenguage</FormLabel>
                    <Input
                        name="language"
                        onChange={handleChange}

                    />

                    <FormLabel>Details How long</FormLabel>
                    <Input
                        name="duration"
                        onChange={handleChange}

                    />
                </Flex>
            </Flex>

            <Flex gap="5px">
                <Box flex="1">
                    <FormLabel>Details Accessibility</FormLabel>
                    <Input
                        name="accessibility"
                        onChange={handleChange}

                    />
                </Box>

                <Box flex="1">
                    <FormLabel>Details Mobility</FormLabel>
                    <Input
                        name="mobility"
                        onChange={handleChange}

                    />
                </Box>

                <Box flex="1">
                    <FormLabel>Details Availability</FormLabel>
                    <Input
                        name="availably"
                        onChange={handleChange}

                    />
                </Box>
            </Flex>

            <Box>
                <FormLabel>Groups</FormLabel>

                <Flex direction="column" gap="5px">
                    {newValue?.groups?.map((item: any, index: number) => (
                        <Flex alignItems="center" gap="20px" key={index}>
                            <Box w="50%">
                                <InformationSelect
                                    name="groups"
                                    options={[
                                        { value: 'group', label: "Shared Group" },
                                        { value: 'private', label: "Private Group" }
                                    ]}
                                    onChange={(e: any) => selectedGroup(e, index)}
                                />
                            </Box>

                            <Button
                                w="30%"
                                onClick={() => {
                                    setGroupsEdit({
                                        selectGroup: item,
                                        index: index
                                    });
                                    onOpen();
                                }}
                                display="flex"
                                key={index}
                                gap="5px"
                                alignItems="center"
                                bg={"rgba(50, 212, 164, .50)"}
                                _hover={{ bg: "rgba(50, 212, 164, .25)" }}
                            >
                                Edit group
                                <Icon as={BiEdit} boxSize="20px" />
                            </Button>
                        </Flex>
                    ))}
                </Flex>

                <Flex alignItems="center" gap="5px" mt="10px">
                    <Icon as={BiSolidPlusCircle}
                        boxSize="22px"
                        color="green"
                        cursor="pointer"
                        onClick={addGroup}
                    />

                    <Icon
                        as={BiSolidMinusCircle}
                        boxSize="22px"
                        color="red"
                        cursor="pointer"
                        onClick={deleteGroup}
                    />
                </Flex>
            </Box>

            <Box>
                <FormLabel>More about data</FormLabel>
                <Textarea
                    name="information"
                    resize="none"
                    minH="200px"
                    onChange={handleChange}

                />
            </Box>

            <Box>
                <FormLabel>Cancelation polices</FormLabel>
                <Textarea
                    name="policies"
                    resize="none"
                    minH="50px"
                    onChange={handleChange}

                />
            </Box>

            <Box>
                <FormLabel>Terms and conditions</FormLabel>
                <Textarea
                    name="conditions"
                    resize="none"
                    minH="100px"
                    onChange={handleChange}

                />
            </Box>

            <EditGroupModal
                isOpen={isOpen}
                onClose={onClose}
                defaultValue={groupEdit}
                setCurrentValue={setNewValue}
                currentValue={newValue}
                setGroupsEdit={setGroupsEdit}
            />
        </Flex>
    )
};