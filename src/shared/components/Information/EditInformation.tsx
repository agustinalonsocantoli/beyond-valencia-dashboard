import { Box, Button, Flex, FormLabel, Icon, Input, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { InformationSelect } from "../Elements/InformationSelect";
import { BiEdit, BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";
import { toastNotify } from "../../utils/toastNotify";
import { StatusEnumTypes } from "../../Types/StatusEnumTypes";
import { useEffect, useState } from "react";
import { OrdersGroupsInt } from "../../../interfaces/ExperiencesInt";
import { EditGroupModal } from "../Modals/EditGroupModal";
import { format } from "date-fns";
import { InputFile } from "../Inputs/InputFile";

interface Props {
    currentValue: any,
    setCurrentValue: (action: any) => void;
    setIsDisabled: (action: boolean) => void;
    fromCalled: "experiences" | "daytrips" | "events"
}

export const EditInformation = ({ currentValue, setCurrentValue, setIsDisabled, fromCalled }: Props) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupEdit, setGroupsEdit] = useState<{
        selectGroup: OrdersGroupsInt;
        index: number;
    }>();

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (
            name === "label" ||
            name === 'text'
        ) {
            setCurrentValue((prev: any) => ({
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
            setCurrentValue((prev: any) => ({
                ...prev,
                details: {
                    ...prev?.details,
                    [name]: value
                }
            }));
        } else if (
            name === "pointLink"
        ) {
            setCurrentValue((prev: any) => ({
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
            setCurrentValue((prev: any) => ({
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
            setCurrentValue((prev: any) => ({
                ...prev,
                [name]: value
            }));
        }

        setIsDisabled(false)
    }

    const changeHighlights = (e: any, i: number) => {
        const { name, value } = e.target;

        const newHighlights = [
            ...currentValue?.highlights.slice(0, i),
            value,
            ...currentValue?.highlights.slice(i + 1)
        ]

        setCurrentValue((prev: any) => ({
            ...prev,
            [name]: newHighlights
        }));

        setIsDisabled(false)
    }

    const changeIncluded = (e: any, i: number, isSelect = false) => {
        if (!isSelect) {
            const { name, value } = e.target;

            const newIncluded = [
                ...currentValue?.included.slice(0, i),
                {
                    ...currentValue?.included[i],
                    text: value
                },
                ...currentValue?.included.slice(i + 1)
            ]

            setCurrentValue((prev: any) => ({
                ...prev,
                [name]: newIncluded
            }));
        } else {
            const { value } = e;

            const newIncluded = [
                ...currentValue?.included.slice(0, i),
                {
                    ...currentValue?.included[i],
                    state: value
                },
                ...currentValue?.included.slice(i + 1)
            ]

            setCurrentValue((prev: any) => ({
                ...prev,
                included: newIncluded
            }));
        }

        setIsDisabled(false)
    }

    const selectedPublished = (e: any) => {

        setCurrentValue((prev: any) => ({
            ...prev,
            published: e.value
        }));

        setIsDisabled(false)
    }

    const addHighlights = () => {
        const newHighlights = [...currentValue?.highlights, '']

        setCurrentValue((prev: any) => ({
            ...prev,
            highlights: newHighlights
        }));
    }

    const deleteHighlights = () => {
        currentValue?.highlights.pop()

        setCurrentValue((prev: any) => ({
            ...prev,
            highlights: currentValue?.highlights
        }));
    }

    const addIncluded = () => {
        const newIncluded = [
            ...currentValue?.included,
            {
                text: "",
                state: true
            }
        ]

        setCurrentValue((prev: any) => ({
            ...prev,
            included: newIncluded
        }));
    }

    const deleteIncluded = () => {
        currentValue?.included.pop()

        setCurrentValue((prev: any) => ({
            ...prev,
            included: currentValue?.included
        }));
    }

    const changeImage = (e: any, i: number, isSelect = false) => {
        if (!isSelect) {
            const { name, value } = e.target;

            const newMultimedia = [
                ...currentValue?.multimedia?.slice(0, i),
                {
                    ...currentValue?.multimedia[i],
                    src: value
                },
                ...currentValue?.multimedia?.slice(i + 1)
            ]

            setCurrentValue((prev: any) => ({
                ...prev,
                [name]: newMultimedia
            }));
        } else {
            const { value } = e;

            const newMultimedia = [
                ...currentValue?.multimedia?.slice(0, i),
                {
                    ...currentValue?.multimedia[i],
                    type: value
                },
                ...currentValue?.multimedia?.slice(i + 1)
            ]

            setCurrentValue((prev: any) => ({
                ...prev,
                multimedia: newMultimedia
            }));
        }

        setIsDisabled(false)
    }

    const selectedGroup = (e: any, i: number) => {
        const { value, label } = e;

        const newGroup = [
            ...currentValue?.groups.slice(0, i),
            {
                ...currentValue?.groups[i],
                title: label,
                type: value
            },
            ...currentValue?.groups.slice(i + 1)
        ]

        setCurrentValue((prev: any) => ({
            ...prev,
            groups: newGroup
        }));

        setIsDisabled(false)

        if (currentValue?.groups[i - 1]?.title === label || currentValue?.groups[i - 1]?.type === value)
            toastNotify(toast, StatusEnumTypes.INFO, `El grupo seleccionado ya existe`)
    }

    const addGroup = () => {
        if (currentValue?.groups?.length < 2) {
            const newGroup = [
                ...currentValue?.groups,
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

            setCurrentValue((prev: any) => ({
                ...prev,
                groups: newGroup
            }));
        } else {
            toastNotify(toast, StatusEnumTypes.WARNING, "Llego al limite de grupos")
        }
    }

    const deleteGroup = () => {
        currentValue?.groups.pop()

        setCurrentValue((prev: any) => ({
            ...prev,
            groups: currentValue?.groups
        }));
    }

    return (
        currentValue &&
        <Flex direction="column" pb="20px" gap="20px">
            <Box>
                <FormLabel>Publicado</FormLabel>
                <InformationSelect
                    name="published"
                    defaultValue={currentValue && {
                        value: currentValue?.published,
                        label: currentValue?.published ? "Si" : "No"
                    }}
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
                        defaultValue={format(new Date(currentValue?.eventDate), "yyyy-LL-dd")}
                    />
                </Box>
            }

            <Box>
                <FormLabel>Multimedia</FormLabel>

                <Flex direction="column" gap="10px">
                    {currentValue?.multimedia?.map((item: any, index: number) => (
                        <Flex alignItems="center" gap="20px" key={index}>
                            <InputFile
                                name="multimedia"
                                value={currentValue}
                                setValue={setCurrentValue}
                                index={index}
                                setIsDisabled={setIsDisabled}
                                isArray={true}
                            />

                            <Box flex="1">
                                <InformationSelect
                                    name="multimediaType"
                                    defaultValue={{
                                        value: item.type,
                                        label: item.type === "image" ? "Imagen" : "Video"
                                    }}
                                    options={[
                                        { value: "image", label: "Imagen" },
                                        { value: "video", label: "Video" }
                                    ]}
                                    onChange={(e: any) => changeImage(e, index, true)}
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
                    defaultValue={currentValue?.title}
                />
            </Box>

            <Flex gap="10px">
                <Box flex="1">
                    <FormLabel>Subtitle Label</FormLabel>
                    <Input
                        name="label"
                        onChange={handleChange}
                        defaultValue={currentValue?.subtitle?.label}
                    />
                </Box>

                <Box flex="1">
                    <FormLabel>Subtitle Text</FormLabel>
                    <Input
                        name="text"
                        onChange={handleChange}
                        defaultValue={currentValue?.subtitle?.text}
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
                    defaultValue={currentValue?.headline}
                />
            </Box>

            <Box>
                <FormLabel>Overview</FormLabel>
                <Textarea
                    name="description"
                    resize="none"
                    minH="100px"
                    onChange={handleChange}
                    defaultValue={currentValue?.description}
                />
            </Box>

            <Box>
                <FormLabel>Highlights</FormLabel>

                <Flex direction="column" gap="5px">
                    {currentValue?.highlights?.map((item: string, index: number) => (
                        <Input
                            key={index}
                            name="highlights"
                            onChange={(e: any) => changeHighlights(e, index)}
                            defaultValue={item}
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
                    {currentValue?.included?.map((item: any, index: number) => (
                        <Flex alignItems="center" gap="10px" key={index}>
                            <Input
                                flex="1"
                                name="included"
                                onChange={(e: any) => changeIncluded(e, index)}
                                defaultValue={item?.text}
                            />

                            <Box flex="1">
                                <InformationSelect
                                    name="includedState"
                                    defaultValue={{
                                        value: item.state,
                                        label: item.state ? "Si" : "No"
                                    }}
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
                        defaultValue={currentValue?.details?.age}
                    />

                    <FormLabel>Details Meeting Point Link</FormLabel>
                    <Input
                        name="pointLink"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.meetengPoint?.Link}
                    />

                    <FormLabel>Details Meeting Point Label</FormLabel>
                    <Input
                        name="pointLabel"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.meetengPoint?.label}
                    />
                </Flex>

                <Flex flex="1" direction="column" gap="10px">
                    <FormLabel>Details Ticketing</FormLabel>
                    <Input
                        name="ticket"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.ticket}
                    />

                    <FormLabel>Details Lenguage</FormLabel>
                    <Input
                        name="language"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.language}
                    />

                    <FormLabel>Details How long</FormLabel>
                    <Input
                        name="duration"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.duration}
                    />
                </Flex>
            </Flex>

            <Flex gap="5px">
                <Box flex="1">
                    <FormLabel>Details Accessibility</FormLabel>
                    <Input
                        name="accessibility"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.accessibility}
                    />
                </Box>

                <Box flex="1">
                    <FormLabel>Details Mobility</FormLabel>
                    <Input
                        name="mobility"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.mobility}
                    />
                </Box>

                <Box flex="1">
                    <FormLabel>Details Availability</FormLabel>
                    <Input
                        name="availably"
                        onChange={handleChange}
                        defaultValue={currentValue?.details?.availably}
                    />
                </Box>
            </Flex>

            <Box>
                <FormLabel>Groups</FormLabel>

                <Flex direction="column" gap="5px">
                    {currentValue?.groups?.map((item: any, index: number) => (
                        <Flex alignItems="center" gap="20px" key={index}>
                            <Box w="50%">
                                <InformationSelect
                                    name="groups"
                                    defaultValue={item && {
                                        value: item.type,
                                        label: item.title
                                    }}
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
                    defaultValue={currentValue?.information}
                />
            </Box>

            <Box>
                <FormLabel>Cancelation polices</FormLabel>
                <Textarea
                    name="policies"
                    resize="none"
                    minH="50px"
                    onChange={handleChange}
                    defaultValue={currentValue?.policies}
                />
            </Box>

            <Box>
                <FormLabel>Terms and conditions</FormLabel>
                <Textarea
                    name="conditions"
                    resize="none"
                    minH="100px"
                    onChange={handleChange}
                    defaultValue={currentValue?.conditions}
                />
            </Box>

            <EditGroupModal
                isOpen={isOpen}
                onClose={onClose}
                defaultValue={groupEdit}
                setCurrentValue={setCurrentValue}
                currentValue={currentValue}
                setGroupsEdit={setGroupsEdit}
            />
        </Flex>
    )
};