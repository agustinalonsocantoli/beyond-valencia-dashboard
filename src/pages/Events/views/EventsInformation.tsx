import { Flex, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AxiosError, AxiosResponse } from "axios";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { PreviewDetails } from "../../../shared/components/Previews/PreviewDetails";
import { EditInformation } from "../../../shared/components/Information/EditInformation";
import { getEventById } from "../../../shared/middlewares/events.middleware";
import { EventsInt } from "../../../interfaces/EventsInt";
import { useAuthContex } from "../../../shared/context/auth.context";

interface Props {
    currentValue: any,
    setCurrentValue: (action: any) => void;
    setId: (action: string) => void;
    setIsDisabled: (action: boolean) => void;
}

export const EventsInformation = ({ currentValue, setCurrentValue, setId, setIsDisabled }: Props) => {
    const { id } = useParams();
    const { logout } = useAuthContex();
    const navigate = useNavigate();
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
                .catch((error: AxiosError) => {
                    if(error?.response?.status === 401) {
                        logout(
                            navigate, 
                            toast, 
                            StatusEnumTypes.ERROR, 
                            "Su Token ha caducado, vuelva a iniciar sesion"
                        )
                    } else {
                        toastNotify(toast, StatusEnumTypes.ERROR, "Error al actualizar los datos")
                    }
                })

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