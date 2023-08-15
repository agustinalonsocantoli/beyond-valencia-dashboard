import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormLabel, Input, ModalFooter, Button, Box, Flex, Icon, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { OrdersGroupsInt } from "../../../interfaces/ExperiencesInt";
import { BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";
import { toastNotify } from "../../utils/toastNotify";
import { StatusEnumTypes } from "../../Types/StatusEnumTypes";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    defaultValue: {
        selectGroup: OrdersGroupsInt;
        index: number;
    } | undefined
    currentValue: any;
    setCurrentValue: (action: any) => void;
    setGroupsEdit: (action: any) => void;
}

export const EditGroupModal = ({
    isOpen,
    onClose,
    defaultValue,
    currentValue,
    setCurrentValue,
    setGroupsEdit
}: Props) => {
    const toast = useToast();
    const [group, setGroup] = useState<OrdersGroupsInt>()

    useEffect(() => {
        setGroup(defaultValue?.selectGroup)
        
    }, [defaultValue])

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        let newValue = value

        if(!newValue || newValue == '') newValue = 0

        setGroup((prev: any) => ({
            ...prev,
            prices: {
                ...prev?.prices,
                [name]: newValue == 0 ? null : Number(newValue)
            }
        }));
    }

    const changeTime = (e: any, i: number) => {
        const { name, value } = e.target;

        const newTime = [
            ...(group?.deapertureTime.slice(0, i) as []),
            value,
            ...(group?.deapertureTime?.slice(i + 1) as [])
        ]

        setGroup((prev: any) => ({
            ...prev,
            [name]: newTime
        }));
    }

    const addTime = () => {
        const newTime = [...(group?.deapertureTime as []), '']

        setGroup((prev: any) => ({
            ...prev,
            deapertureTime: newTime
        }));
    }

    const deleteTime = () => {
        group?.deapertureTime?.pop()

        setGroup((prev: any) => ({
            ...prev,
            deapertureTime: group?.deapertureTime
        }));
    }

    const updateValue = (i: number) => {
        const newGroup = [
            ...(currentValue?.groups?.slice(0, i) as []),
            group,
            ...(currentValue?.groups?.slice(i + 1) as [])
        ]

        setCurrentValue((prev: any) => ({
            ...prev,
            groups: newGroup
        }));

        toastNotify(toast, StatusEnumTypes.SUCCESS, "Grupo actualizado, recuerde guardar los cambios")

    }

    return (
        (defaultValue && group) &&
        <Modal 
            isOpen={isOpen} 
            onClose={() => {
                setGroupsEdit(undefined);
                onClose();
            }} 
            isCentered
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader textAlign="center">
                    Editar {group?.title}
                </ModalHeader>

                <ModalBody gap="10px">
                    <Box>
                        <FormLabel>Precio Adulto</FormLabel>
                        <Input
                            name="adults"
                            onChange={handleChange}
                            defaultValue={
                                group?.prices?.adults ?
                                    group?.prices?.adults :
                                    0
                            }
                        />
                    </Box>

                    <Box>
                        <FormLabel>Precio Children</FormLabel>
                        <Input
                            name="children"
                            onChange={handleChange}
                            defaultValue={
                                group?.prices?.children ?
                                    group?.prices?.children :
                                    0
                            }
                        />
                    </Box>

                    <Box>
                        <FormLabel>Deaperture Time</FormLabel>

                        <Flex direction="column" gap="5px">
                            {group?.deapertureTime?.map((item: string, index: number) => (
                                <Input
                                    key={index}
                                    name="deapertureTime"
                                    onChange={(e: any) => changeTime(e, index)}
                                    defaultValue={item}
                                />
                            ))}
                        </Flex>

                        <Flex alignItems="center" gap="5px" mt="10px">
                            <Icon as={BiSolidPlusCircle}
                                boxSize="22px"
                                color="green"
                                cursor="pointer"
                                onClick={addTime}
                            />

                            <Icon
                                as={BiSolidMinusCircle}
                                boxSize="22px"
                                color="red"
                                cursor="pointer"
                                onClick={deleteTime}
                            />
                        </Flex>
                    </Box>
                </ModalBody>

                <ModalFooter gap="10px">
                    <Button 
                        bg={"rgba(50, 212, 164, .50)"}
                        _hover={{ bg: "rgba(50, 212, 164, .25)"}}
                        onClick={() => {
                            setGroupsEdit(undefined);
                            onClose();
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        bg={"rgba(50, 212, 164, .50)"}
                        _hover={{ bg: "rgba(50, 212, 164, .25)"}}
                        isDisabled={defaultValue?.selectGroup === group}
                        onClick={() => {
                            updateValue(defaultValue?.index);
                            setGroupsEdit(undefined);
                            onClose();
                        }}
                    >
                        Modificar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};