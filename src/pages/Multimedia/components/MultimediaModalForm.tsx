import {
    Box,
    Button,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from "@chakra-ui/react";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { useEffect, useState } from "react";
import { InformationSelect } from "../../../shared/components/Elements/InformationSelect";
import { LandingEnumTypes } from "../../../shared/Types/LadingEnumTypes";
import { getExperiences } from "../../../shared/middlewares/experiences.middleware";
import { getDaytrips } from "../../../shared/middlewares/daytrips.middleware";
import { AxiosResponse } from "axios";
import { ExperiencesInt } from "../../../interfaces/ExperiencesInt";
import { DaystripsInt } from "../../../interfaces/DaytripsInt";
import { MultimediaInt } from "../../../interfaces/MultimediaInt";
import { updateMultimedia } from "../../../shared/middlewares/multimedia.middleware";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setRefresh: (action: boolean) => void;
    multimedia: MultimediaInt | undefined;
    setMultimedia: (action: any) => void;
}

export const MultimediaModalForm = ({ isOpen, onClose, multimedia, setMultimedia, setRefresh }: Props) => {
    const toast = useToast();
    const [currentValue, setCurrentValue] = useState<MultimediaInt>();
    const [options, setOptions] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        setCurrentValue(multimedia)

    }, [multimedia])

    useEffect(() => {
        const newOptions: {value: string, label: string}[] = []

        if(multimedia?.landing === LandingEnumTypes.EXPERIENCES) {
            getExperiences()
            .then((response: AxiosResponse) => {
                const experiences = response?.data?.data;

                experiences.map((experience: ExperiencesInt) => {
                    return newOptions.push({ value: `/experiences/${experience?._id}`, label: experience?.title })
                })

                setOptions(newOptions)
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "No se han podido cargar las opciones"))
        }
        if(multimedia?.landing === LandingEnumTypes.DAYTRIPS) {
            getDaytrips()
            .then((response: AxiosResponse) => {
                const daytrips = response?.data?.data;

                daytrips.map((daytrip: DaystripsInt) => {
                    return newOptions.push({ value: `/daytrips/${daytrip?._id}`, label: daytrip?.title })
                })

                setOptions(newOptions)
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "No se han podido cargar las opciones"))
        }
    }, [multimedia?.landing])

    const inputChange = (e: any) => {
        const { name, value } = e.target;

        setCurrentValue((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }

    const selectedChange = (e: any, name: string) => {

        setCurrentValue((prev: any) => ({
            ...prev,
            [name]: e.value
        }));
    }

    const handleSubmit = () => {
        if (!multimedia?._id || !currentValue) return

        updateMultimedia({
            id: multimedia?._id,
            editMultimedia: currentValue
        })
        .then(() => {
            setRefresh(true);
            setMultimedia(undefined);
            setOptions([]);
            setCurrentValue(undefined);
            onClose();
            toastNotify(toast, StatusEnumTypes.SUCCESS, "Multimedia actualizada")
        })
        .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte"))
    };

    return (
        currentValue &&
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
                    Editar Multimedia
                </ModalHeader>

                <ModalBody
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    {currentValue?.landing !== LandingEnumTypes.HOME &&
                        <Box>
                            <FormLabel>Seleccione a donde se redirige</FormLabel>
                            <InformationSelect
                                name="navigate"
                                options={options}
                                onChange={(e: any) => selectedChange(e, "navigate")}
                            />
                        </Box>
                    }

                    <Box>
                        <FormLabel>Titulo</FormLabel>
                        <Input
                            type="text"
                            id="h3"
                            name="h3"
                            placeholder="Titulo"
                            onChange={inputChange}
                            defaultValue={currentValue.h3}
                        />
                    </Box>

                    <Box>
                        <FormLabel>Subtitulo Label</FormLabel>
                        <Input
                            type="text"
                            id="p"
                            name="p"
                            placeholder="Subtitulo Label"
                            onChange={inputChange}
                            defaultValue={currentValue.p}
                        />
                    </Box>

                    <Box>
                        <FormLabel>Subtitulo Text</FormLabel>
                        <Input
                            type="text"
                            id="span"
                            name="span"
                            placeholder="Subtitulo Text"
                            onChange={inputChange}
                            defaultValue={currentValue.span}
                        />
                    </Box>

                    <Box>
                        <FormLabel>Tipo</FormLabel>
                        <InformationSelect
                            name="type"
                            defaultValue={{
                                value: currentValue.type,
                                label: currentValue.type === "image" ? "Imagen" : "Video"
                            }}
                            options={[
                                { value: "image", label: "Imagen" },
                                { value: "video", label: "Video" }
                            ]}
                            onChange={(e: any) => selectedChange(e, "type")}
                        />
                    </Box>

                    <Box>
                        <FormLabel>Url Multimedia</FormLabel>
                        <Input
                            name="src"
                            id="src"
                            placeholder="Url"
                            defaultValue={currentValue?.src}
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
                        onClick={handleSubmit}
                        w="25%"
                        isDisabled={multimedia === currentValue}
                    >
                        Actualizar
                    </Button>

                    <Button
                        bg='#32d4a4'
                        color="#FFFFFF"
                        _hover={{ bg: "rgba(50, 212, 164, .7)" }}
                        onClick={(e: any) => {
                            setMultimedia(undefined);
                            setOptions([]);
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