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
import { ContentInt } from "../../../interfaces/ContentInt";
import { InformationSelect } from "../../../shared/components/Elements/InformationSelect";
import { LandingEnumTypes } from "../../../shared/Types/LadingEnumTypes";
import { getExperiences } from "../../../shared/middlewares/experiences.middleware";
import { getDaytrips } from "../../../shared/middlewares/daytrips.middleware";
import { AxiosResponse } from "axios";
import { ExperiencesInt } from "../../../interfaces/ExperiencesInt";
import { DaystripsInt } from "../../../interfaces/DaytripsInt";
import { updateContent } from "../../../shared/middlewares/content.middleware";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setRefresh: (action: boolean) => void;
    content: ContentInt | undefined;
    setContent: (action: any) => void;
}

export const ContentModalForm = ({ isOpen, onClose, content, setContent, setRefresh }: Props) => {
    const toast = useToast();
    const [currentValue, setCurrentValue] = useState<ContentInt>();
    const [options, setOptions] = useState<{value: string, label: string}[]>([]);

    useEffect(() => { console.log(currentValue) }, [currentValue]) 
    useEffect(() => {
        setCurrentValue(content)

    }, [content])

    useEffect(() => {
        const newOptions: {value: string, label: string}[] = []

        if(content?.landing === LandingEnumTypes.EXPERIENCES) {
            getExperiences()
            .then((response: AxiosResponse) => {
                const experiences = response?.data?.data;

                experiences.map((experience: ExperiencesInt) => {
                    return newOptions.push({ value: `/experiences/${experience?.slug}`, label: experience?.title })
                })

                setOptions(newOptions)
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "No se han podido cargar las opciones"))
        }
        if(content?.landing === LandingEnumTypes.DAYTRIPS) {
            getDaytrips()
            .then((response: AxiosResponse) => {
                const daytrips = response?.data?.data;

                daytrips.map((daytrip: DaystripsInt) => {
                    return newOptions.push({ value: `/daytrips/${daytrip?.slug}`, label: daytrip?.title })
                })

                setOptions(newOptions)
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "No se han podido cargar las opciones"))
        }
    }, [content?.landing])

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
        if (!content?._id || !currentValue) return

        updateContent({
            id: content?._id,
            editContent: currentValue
        })
        .then(() => {
            setRefresh(true);
            setContent(undefined);
            setOptions([]);
            setCurrentValue(undefined);
            onClose();
            toastNotify(toast, StatusEnumTypes.SUCCESS, "Card actualizada")
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
                    Editar card
                </ModalHeader>

                <ModalBody
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    {currentValue?.landing !== LandingEnumTypes.HOME &&
                        <Box>
                            <FormLabel>Seleccione a donde redirige la card</FormLabel>
                            <InformationSelect
                                name="link"
                                options={options}
                                onChange={(e: any) => selectedChange(e, "link")}
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
                        <FormLabel>Subtitulo</FormLabel>
                        <Input
                            type="text"
                            id="p"
                            name="p"
                            placeholder="Subtitulo"
                            onChange={inputChange}
                            defaultValue={currentValue.p}
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
                            name="img"
                            id="img"
                            placeholder="Url"
                            onChange={inputChange}
                            defaultValue={currentValue?.img}
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
                        isDisabled={content === currentValue}
                    >
                        Actualizar
                    </Button>

                    <Button
                        bg='#32d4a4'
                        color="#FFFFFF"
                        _hover={{ bg: "rgba(50, 212, 164, .7)" }}
                        onClick={(e: any) => {
                            setContent(undefined);
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