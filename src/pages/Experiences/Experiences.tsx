import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { ExperiencesTable } from "./views/ExperiencesTable";
import { BiAddToQueue, BiPlusCircle, BiRefresh } from "react-icons/bi";
import { ExperiencesInformation } from "./views/ExperiencesInformation";
import { useEffect, useState } from "react";
import { ExperiencesInt } from "../../interfaces/ExperiencesInt";
import { addExperience, updateExperiences } from "../../shared/middlewares/experiences.middleware";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { NewExperience } from "./views/NewExperience";

export const Experiences = () => {
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const [slug, setSlug] = useState<string>()
    const [currentValue, setCurrentValue] = useState<ExperiencesInt>()
    const [newValue, setNewValue] = useState<ExperiencesInt>()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsDisabled(true)

    }, [location.pathname])

    const updateData = () => {
        if (slug && currentValue)
            updateExperiences({
                slug: slug,
                data: currentValue
            })
            .then(() => {
                setCurrentValue(undefined);
                navigate(`/experiences`)
                toastNotify(toast, StatusEnumTypes.SUCCESS, "Datos actualizados con exito");
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al actualizar los datos"))
    }

    const addData = () => {
        if(newValue)
            addExperience(newValue)
            .then(() => {
                setNewValue(undefined);
                navigate(`/experiences`)
                toastNotify(toast, StatusEnumTypes.SUCCESS, "Datos actualizados con exito");
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al crear la experience"))
    }

    return (
        <Flex
            direction="column"
            w="100%"
        >
            <Topbar
                title="Experiences"
                buttons={
                    location.pathname.includes("/experiences/new")
                        ?
                        [
                            {
                                label: "Crear experience",
                                onClick: () => addData(),
                                icon: BiAddToQueue,
                                isDisabled: isDisabled,
                                requiredText: "Debe completar todos los datos"
                            }
                        ]
                        : location.pathname.startsWith("/experiences/")
                        ?   
                        [
                            {
                                label: "Guardar cambios",
                                onClick: () => updateData(),
                                icon: BiRefresh,
                                isDisabled: isDisabled,
                                requiredText: "No se realizo ningun cambio"
                            }
                        ]
                        :
                        [
                            {
                                label: "Nueva experience",
                                onClick: () => navigate("/experiences/new"),
                                icon: BiPlusCircle
                            }
                        ]
                }
            />

            <Flex
                maxH="calc(100vh - 75px)"
                overflow="auto"
            >
                <Routes>
                    <Route index element={
                        <ExperiencesTable
                        />
                    }
                    />

                    <Route path=":slug" element={
                        <ExperiencesInformation
                            setSlug={setSlug}
                            currentValue={currentValue}
                            setCurrentValue={setCurrentValue}
                            setIsDisabled={setIsDisabled}
                        />
                    }
                    />

                    <Route path="/new" element={
                        <NewExperience 
                            newValue={newValue}
                            setNewValue={setNewValue}
                            setIsDisabled={setIsDisabled}
                        />
                    }
                    />
                </Routes>
            </Flex>
        </Flex>
    )
};