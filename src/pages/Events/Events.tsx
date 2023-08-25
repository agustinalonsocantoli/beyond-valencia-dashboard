import { Flex, useToast } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { BiAddToQueue, BiPlusCircle, BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { addEvent, updateEvent } from "../../shared/middlewares/events.middleware";
import { EventsInt } from "../../interfaces/EventsInt";
import { EventsTable } from "./views/EventsTable";
import { EventsInformation } from "./views/EventsInformation";
import { NewEvents } from "./views/NewEvents";

export const Events = () => {
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const [id, setId] = useState<string>()
    const [currentValue, setCurrentValue] = useState<EventsInt>()
    const [newValue, setNewValue] = useState<EventsInt>()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsDisabled(true)

    }, [location.pathname])

    const updateData = () => {
        if (id && currentValue)
            updateEvent({
                id: id,
                data: currentValue
            })
            .then(() => {
                setCurrentValue(undefined);
                navigate(`/events`)
                toastNotify(toast, StatusEnumTypes.SUCCESS, "Datos actualizados con exito");
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al actualizar los datos"))
    }

    const addData = () => {
        if(newValue)
            addEvent(newValue)
            .then(() => {
                setNewValue(undefined);
                navigate(`/events`)
                toastNotify(toast, StatusEnumTypes.SUCCESS, "Event creado con exito");
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al crear Event"))
    }

    return (
        <Flex
            direction="column"
            w="100%"
        >
            <Topbar
                title="Events"
                buttons={
                    location.pathname.includes("/events/new")
                        ?
                        [
                            {
                                label: "Crear event",
                                onClick: () => addData(),
                                icon: BiAddToQueue,
                                isDisabled: isDisabled,
                                requiredText: "Debe completar todos los datos"
                            }
                        ]
                        : location.pathname.startsWith("/events/")
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
                                label: "Nuevo event",
                                onClick: () => navigate("/events/new"),
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
                        <EventsTable />
                    }
                    />

                    <Route path=":id" element={
                        <EventsInformation
                            setId={setId}
                            currentValue={currentValue}
                            setCurrentValue={setCurrentValue}
                            setIsDisabled={setIsDisabled}
                        />
                    }
                    />

                    <Route path="/new" element={
                        <NewEvents
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