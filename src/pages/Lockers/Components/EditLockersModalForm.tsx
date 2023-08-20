import { Box, Button, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { useEffect, useState } from "react";
import { InformationSelect } from "../../../shared/components/Elements/InformationSelect";
import { ProductsEnumTypes } from "../../../shared/Types/ProductsEnumTypes";
import { ProductInt } from "../../../interfaces/ProductInt";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setRefresh: (action: boolean) => void;
    bikeEdit: any
    setBikeEdit: (action: any) => void;
}

export const EditBikesModalForm = ({ isOpen, onClose, setRefresh, bikeEdit, setBikeEdit }: Props) => {
    const toast = useToast();
    const [currentValue, setCurrentValue] = useState<ProductInt>();

    useEffect(() => {
        setCurrentValue(bikeEdit)

    }, [bikeEdit])

    const inputChange = (e: any) => {
        const { name, value } = e.target;

        if(
            name === "small" ||
            name === "medium"
        ) {
            setCurrentValue((prev: any) => ({
                ...prev,
                price: {
                    ...prev.price,
                    [name]: value
                }
            }));
        } else {
            setCurrentValue((prev: any) => ({
                ...prev,
                [name]: value
            }));
        }

    }

    const onSubmit = (values: any) => {
        // const newCode = {
        //     code: values.code,
        //     discount: values.discount,
        // }

        //     .then(() => {
        //         setRefresh(true);
        //         toastNotify(toast, StatusEnumTypes.SUCCESS, "Su codigo fue creado")

        //     })
        //     .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte"))

        setCurrentValue(undefined);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            size="3xl"
            isCentered
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>
                    Nuevo producto
                </ModalHeader>

                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        gap="20px"
                    >
                        <Box>
                            <FormLabel>Title</FormLabel>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={currentValue?.title}
                                disabled={true}
                            />
                        </Box>

                        <Box>
                            <FormLabel>Descripcion</FormLabel>
                            <Input
                                type="text"
                                id="description"
                                name="description"
                                onChange={inputChange}
                                defaultValue={currentValue?.description}
                            />
                        </Box>

                        <Box>
                            <FormLabel>Precio Small</FormLabel>
                            <Input
                                type="number"
                                id="small"
                                name="small"
                                defaultValue={currentValue?.price?.small}
                                onChange={inputChange}
                            />
                        </Box>

                        <Box>
                            <FormLabel>Precio Medium</FormLabel>
                            <Input
                                type="number"
                                id="medium"
                                name="medium"
                                defaultValue={currentValue?.price?.medium}
                                onChange={inputChange}
                            />
                        </Box>
                    </ModalBody>

                    <ModalFooter
                        gap="10px"
                    >
                        <Button
                            bg='#32d4a4'
                            color="#FFFFFF"
                            _hover={{ bg: "rgba(50, 212, 164, .7)" }}
                            type="submit"
                            onClick={onClose}
                            w="25%"
                            isDisabled={bikeEdit === currentValue}
                        >
                            Crear
                        </Button>

                        <Button
                            bg='#32d4a4'
                            color="#FFFFFF"
                            _hover={{ bg: "rgba(50, 212, 164, .7)" }}
                            onClick={(e: any) => {
                                setCurrentValue(undefined);
                                onClose();
                            }}
                            w="25%"
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>
    );
};