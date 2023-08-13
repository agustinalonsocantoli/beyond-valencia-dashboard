import { Box, Button, Flex, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { PartnertsEnumTypes } from "../../../shared/Types/PartnersEnumTypes";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setRefresh: (action: boolean) => void;
}

export const ExperiencesModalForm = ({ isOpen, onClose, setRefresh }: Props) => {
    const toast = useToast();

    const onSubmit = (values: any) => {
        let stateToBoolean: boolean;

        if (values.state == "true") { stateToBoolean = true } else { stateToBoolean = false }

    };

    const formik = useFormik({
        initialValues: {
  
        },
        validationSchema: Yup.object({
            code: Yup.string()
                .required("Este campo es obligatorio"),
            discount: Yup.number()
                .required("Este campo es obligatorio"),
            state: Yup.string()
                .required("Este campo es obligatorio"),
            name: Yup.string()
                .required("Este campo es obligatorio"),
            contact: Yup.string()
                .required("Este campo es obligatorio"),
            email: Yup.string()
                .email()
                .required("Este campo es obligatorio"),
            phone: Yup.string()
                .required("Este campo es obligatorio"),
            type: Yup.string()
                .required("Este campo es obligatorio"),
        }),
        onSubmit: (values: any, { resetForm }) => {
            onSubmit(values);
            resetForm();
        }
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            size="3xl"
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>
                    Crear nueva Experience
                </ModalHeader>

                <form onSubmit={formik.handleSubmit}>
                    <ModalBody
                        display="flex"
                        justifyContent="center"
                        w={"100%"}
                        gap="75px"
                        p="0 50px"
                    >
                        <Flex
                            direction="column"
                            gap="10px"
                            w="100%"
                        >
                            <Box>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nombre"
                                    onChange={formik.handleChange}
                                />

                                {
                                    formik.touched.name && formik.errors.name
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.name as string}</Box>
                                        : null
                                }
                            </Box>

                            <Box>
                                <FormLabel>Contacto</FormLabel>
                                <Input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Contacto"
                                    onChange={formik.handleChange}
                                />

                                {
                                    formik.touched.contact && formik.errors.contact
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.contact as string}</Box>
                                        : null
                                }
                            </Box>


                            <Box>
                                <FormLabel>Codigo</FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                />

                                {
                                    formik.touched.email && formik.errors.email
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.email as string}</Box>
                                        : null
                                }
                            </Box>


                            <Box>
                                <FormLabel>Telefono</FormLabel>
                                <Input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Telefono"
                                    onChange={formik.handleChange}
                                />

                                {
                                    formik.touched.phone && formik.errors.phone
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.phone as string}</Box>
                                        : null
                                }
                            </Box>

                            <Box>
                                <FormLabel>Tipo</FormLabel>
                                <Select
                                    id="type"
                                    name="type"
                                    onChange={formik.handleChange}
                                >
                                    <option value="default" disabled>Seleccionar tipo</option>
                                    <option value={PartnertsEnumTypes.HOTEL}>Hotel</option>
                                    <option value={PartnertsEnumTypes.HOSTEL}>Hostel</option>
                                    <option value={PartnertsEnumTypes.AIRBNB}>Airbnb</option>
                                    <option value={PartnertsEnumTypes.RESTAURANTE}>Restaurante</option>
                                    <option value={PartnertsEnumTypes.SOCIO}>Socio</option>
                                    <option value={PartnertsEnumTypes.OTROS}>Otros</option>
                                </Select>

                                {
                                    formik.touched.type && formik.errors.type
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.type as string}</Box>
                                        : null
                                }
                            </Box>
                        </Flex>

                        <Flex
                            direction="column"
                            gap="10px"
                            w="100%"
                        >
                            <Box>
                                <FormLabel>Codigo</FormLabel>
                                <Input
                                    type="text"
                                    id="code"
                                    name="code"
                                    placeholder="Codigo"
                                    onChange={formik.handleChange}
                                />

                                {
                                    formik.touched.code && formik.errors.code
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.code as string}</Box>
                                        : null
                                }
                            </Box>

                            <Box>
                                <FormLabel>Descuento</FormLabel>
                                <Input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    placeholder="Descuento"
                                    onChange={formik.handleChange}
                                />

                                {
                                    formik.touched.discount && formik.errors.discount
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.discount as string}</Box>
                                        : null
                                }
                            </Box>

                            <Box>
                                <FormLabel>Estado</FormLabel>
                                <Select
                                    id="state"
                                    name="state"
                                    onChange={formik.handleChange}
                                >
                                    <option value="default" disabled>Seleccionar estado</option>
                                    <option value='true'>Activado</option>
                                    <option value='false'>Desactivado</option>
                                </Select>

                                {
                                    formik.touched.state && formik.errors.state
                                        ? <Box color="red" fontSize="12px" mt="5px">{formik.errors.state as string}</Box>
                                        : null
                                }
                            </Box>
                        </Flex>
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
                            isDisabled={!(formik.isValid && formik.dirty)}
                        >
                            Crear
                        </Button>

                        <Button
                            bg='#32d4a4'
                            color="#FFFFFF"
                            _hover={{ bg: "rgba(50, 212, 164, .7)" }}
                            onClick={(e: any) => {
                                formik.handleReset(e);
                                onClose();
                            }}
                            w="25%"
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};