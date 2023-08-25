import { Flex, useToast } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { BiAddToQueue, BiPlusCircle, BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { DaytripsTable } from "./views/DaytripsTable";
import { DaytripsInformation } from "./views/DaytripsInformation";
import { NewDaytrip } from "./views/NewDaytrips";
import { addDaytrip, updateDaytrip } from "../../shared/middlewares/daytrips.middleware";
import { DaystripsInt } from "../../interfaces/DaytripsInt";

export const Daytrips = () => {
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const [id, setId] = useState<string>()
    const [currentValue, setCurrentValue] = useState<DaystripsInt>()
    const [newValue, setNewValue] = useState<DaystripsInt>()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsDisabled(true)

    }, [location.pathname])

    const updateData = () => {
        if (id && currentValue)
            updateDaytrip({
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
            addDaytrip(newValue)
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
                    location.pathname.includes("/daytrips/new")
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
                        : location.pathname.startsWith("/daytrips/")
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
                                onClick: () => navigate("/daytrips/new"),
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

                    <Route path=":id" element={
                        <DaytripsInformation
                            setId={setId}
                            currentValue={currentValue}
                            setCurrentValue={setCurrentValue}
                            setIsDisabled={setIsDisabled}
                        />
                    }
                    />

                    <Route path="/new" element={
                        <NewDaytrip 
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