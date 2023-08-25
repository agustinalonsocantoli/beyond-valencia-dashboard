import { Flex, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AxiosResponse } from "axios";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { PreviewDetails } from "../../../shared/components/Previews/PreviewDetails";
import { EditInformation } from "../../../shared/components/Information/EditInformation";
import { getEventById } from "../../../shared/middlewares/events.middleware";
import { EventsInt } from "../../../interfaces/EventsInt";

interface Props {
    currentValue: any,
    setCurrentValue: (action: any) => void;
    setId: (action: string) => void;
    setIsDisabled: (action: boolean) => void;
}

export const EventsInformation = ({ currentValue, setCurrentValue, setId, setIsDisabled }: Props) => {
    const { id } = useParams();
    const toast = useToast();
    const [event, setEvent] = useState<EventsInt>();
    const [refresh, setRefresh] = useState<boolean>(true);

    useEffect(() => {
        id &&
            setId(id)

    }, [id])

    useEffect(() => {
        refresh &&
            id &&
            getEventById(id)
                .then((response: AxiosResponse) => {
                    setEvent(response?.data?.data);
                    setRefresh(false)
                })
                .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte."))

    }, [refresh, id])

    useEffect(() => {
        event &&
            setCurrentValue(event)
    }, [event])

    return(
        <Flex gap="10px" p="10px">
            <Flex 
                direction="column" 
                flex="1"
            >
                <EditInformation 
                    currentValue={currentValue}
                    setCurrentValue={setCurrentValue}
                    setIsDisabled={setIsDisabled}
                    fromCalled="events"
                />
            </Flex>

            <Flex 
                direction="column" 
                flex="1"
            >
                <PreviewDetails 
                    data={currentValue}
                />
            </Flex>
        </Flex>
    )
}