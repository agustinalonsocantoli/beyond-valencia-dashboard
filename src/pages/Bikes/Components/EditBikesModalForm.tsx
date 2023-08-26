import { Box, Button, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { useEffect, useState } from "react";
import { ProductInt } from "../../../interfaces/ProductInt";
import { updateBike } from "../../../shared/middlewares/bikes.middleware";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContex } from "../../../shared/context/auth.context";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setRefresh: (action: boolean) => void;
    bikeEdit: any
    setBikeEdit: (action: any) => void;
}

export const EditBikesModalForm = ({ isOpen, onClose, setRefresh, bikeEdit, setBikeEdit }: Props) => {
    const { logout } = useAuthContex();
    const navigate = useNavigate()
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

    const onSubmit = () => {
        if(!currentValue) return;

        updateBike({
            id: bikeEdit?._id,
            editBike: currentValue
        })
        .then(() => {
            setRefresh(true);
            toastNotify(toast, StatusEnumTypes.SUCCESS, "Su codigo fue creado")

        })
        .catch((error: AxiosError) => {
            if(error?.response?.status === 401) {
                logout(
                    navigate, 
                    toast, 
                    StatusEnumTypes.ERROR, 
                    "Su Token ha caducado, vuelva a iniciar sesion"
                )
            } else {
                toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte.")
            }
        })

        setCurrentValue(undefined);
        onClose();
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
                            onClick={onSubmit}
                            w="25%"
                            isDisabled={bikeEdit === currentValue}
                        >
                            Actualizar
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