import { Flex, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AxiosError, AxiosResponse } from "axios";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { PreviewDetails } from "../../../shared/components/Previews/PreviewDetails";
import { EditInformation } from "../../../shared/components/Information/EditInformation";
import { getDaytripById } from "../../../shared/middlewares/daytrips.middleware";
import { DaystripsInt } from "../../../interfaces/DaytripsInt";
import { useAuthContex } from "../../../shared/context/auth.context";

interface Props {
    currentValue: any,
    setCurrentValue: (action: any) => void;
    setId: (action: string) => void;
    setIsDisabled: (action: boolean) => void;
}

export const DaytripsInformation = ({ currentValue, setCurrentValue, setId, setIsDisabled }: Props) => {
    const { id } = useParams();
    const { logout } = useAuthContex();
    const navigate = useNavigate();
    const toast = useToast();
    const [daytrip, setDaytrip] = useState<DaystripsInt>();
    const [refresh, setRefresh] = useState<boolean>(true);

    useEffect(() => {
        id &&
            setId(id)

    }, [id])

    useEffect(() => {
        refresh &&
            id &&
            getDaytripById(id)
                .then((response: AxiosResponse) => {
                    setDaytrip(response?.data?.data);
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
                        toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte.")
                    }
                })

    }, [refresh, id])

    useEffect(() => {
        daytrip &&
            setCurrentValue(daytrip)
    }, [daytrip])

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
                    fromCalled="daytrips"
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