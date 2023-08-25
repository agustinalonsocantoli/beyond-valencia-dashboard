import { Flex, useToast } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { BiAddToQueue, BiPlusCircle, BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";
import { ExperiencesInt } from "../../interfaces/ExperiencesInt";
import { addExperience, updateExperiences } from "../../shared/middlewares/experiences.middleware";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { DaytripsTable } from "./views/DaytripsTable";

export const Daytrips = () => {
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const [id, setId] = useState<string>()
    const [currentValue, setCurrentValue] = useState<ExperiencesInt>()
    const [newValue, setNewValue] = useState<ExperiencesInt>()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsDisabled(true)

    }, [location.pathname])

    const updateData = () => {
        if (id && currentValue)
            updateExperiences({
                id: id,
                data: currentValue
            })
            .then(() => {
                setCurrentValue(undefined);
                navigate(`/daytrips`)
                toastNotify(toast, StatusEnumTypes.SUCCESS, "Datos actualizados con exito");
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al actualizar los datos"))
    }

    const addData = () => {
        if(newValue)
            addExperience(newValue)
            .then(() => {
                setNewValue(undefined);
                navigate(`/daytrips`)
                toastNotify(toast, StatusEnumTypes.SUCCESS, "Daytrips creado con exito");
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al crear Daytrips"))
    }

    return (
        <Flex
            direction="column"
            w="100%"
        >
            <Topbar
                title="Daytrips"
                buttons={
                    location.pathname.includes("/daytrip/new")
                        ?
                        [
                            {
                                label: "Crear daytrip",
                                onClick: () => addData(),
                                icon: BiAddToQueue,
                                isDisabled: isDisabled,
                                requiredText: "Debe completar todos los datos"
                            }
                        ]
                        : location.pathname.startsWith("/daytrip/")
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
                                label: "Nuevo daytrip",
                                onClick: () => navigate("/daytrip/new"),
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
                        <DaytripsTable />
                    }
                    />
{/* 
                    <Route path=":id" element={
                        <ExperiencesInformation
                            setId={setId}
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
                    /> */}
                </Routes>
            </Flex>
        </Flex>
    )
};