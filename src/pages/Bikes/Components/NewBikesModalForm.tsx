import { Box, Button, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { useEffect, useState } from "react";
import { InformationSelect } from "../../../shared/components/Elements/InformationSelect";
import { ProductsEnumTypes } from "../../../shared/Types/ProductsEnumTypes";
import { ProductInt } from "../../../interfaces/ProductInt";
import { validateNewProducts } from "../../../shared/utils/validateData";
import { addBike } from "../../../shared/middlewares/bikes.middleware";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContex } from "../../../shared/context/auth.context";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setRefresh: (action: boolean) => void;
}

export const NewBikesModalForm = ({ isOpen, onClose, setRefresh }: Props) => {
    const toast = useToast();
    const { logout } = useAuthContex();
    const navigate = useNavigate();
    const [currentValue, setCurrentValue] = useState<ProductInt>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
        currentValue && 
            validateNewProducts(currentValue) && setIsDisabled(false);

    }, [currentValue])

    const selectedChange = (e: any, name: string) => {
        let title: string;
        let description: string;
        let type: ProductsEnumTypes;
        
        if(e.label === "All day") {
            title = "All day"
            description = "Todo el día"
            type = ProductsEnumTypes.AllDAY
        }
        if(e.label === "2 hours") {
            title = "2 hours"
            description = "2 horas"
            type = ProductsEnumTypes.HOURS
        }
        if(e.label === "3 days") {
            title = "3 days"
            description = "Tres días"
            type = ProductsEnumTypes.DAYS
        }
        if(e.label === "Longer Time") {
            title = "Longer time?"
            description = "¿Cuántos días necesitas?"
            type = ProductsEnumTypes.LONGER
        }

        setCurrentValue((prev: any) => ({
            ...prev,
            title: title,
            type: type,
            description: description,
            [name]: e.value
        }));
    }

    const inputChange = (e: any) => {
        const { name, value } = e.target;

        setCurrentValue((prev: any) => ({
            ...prev,
            price: {
                ...prev.price,
                [name]: value
            }
        }));
    }

    const onSubmit = () => {
        if(!currentValue) return;

        addBike(currentValue)
        .then(() => {
            setRefresh(true);
            toastNotify(toast, StatusEnumTypes.SUCCESS, "Su producto fue creado")

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
                            <FormLabel>Tipo</FormLabel>
                            <InformationSelect
                            name="select"
                            options={[
                                { value: "2-Hours", label: "2 hours" },
                                { value: "Three-Days", label: "3 days" },
                                { value: "All-Day", label: "All day" },
                                { value: ['2-Days', '3-Days', '4-Days', '5-Days', '6-Days', '7-Days', '8-Days', '9-Days', '10-Days'], label: "Longer Time" },
                            ]}
                            onChange={(e: any) => selectedChange(e, "select")}
                        />
                        </Box>

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
                                defaultValue={currentValue?.description}
                                disabled={true}
                            />
                        </Box>

                        <Box>
                            <FormLabel>Precio Small</FormLabel>
                            <Input
                                type="number"
                                id="small"
                                name="small"
                                onChange={inputChange}
                            />
                        </Box>

                        <Box>
                            <FormLabel>Precio Medium</FormLabel>
                            <Input
                                type="number"
                                id="medium"
                                name="medium"
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
                            isDisabled={isDisabled}
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