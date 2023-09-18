import { Flex, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getExperienceById } from "../../../shared/middlewares/experiences.middleware";
import { AxiosError, AxiosResponse } from "axios";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { PreviewDetails } from "../../../shared/components/Previews/PreviewDetails";
import { EditInformation } from "../../../shared/components/Information/EditInformation";
import { ExperiencesInt } from "../../../interfaces/ExperiencesInt";
import { useAuthContex } from "../../../shared/context/auth.context";
import { validateRol } from "../../../shared/utils/rol";

interface Props {
    currentValue: any,
    setCurrentValue: (action: any) => void;
    setId: (action: string) => void;
    setIsDisabled: (action: boolean) => void;
}

export const ExperiencesInformation = ({ currentValue, setCurrentValue, setId, setIsDisabled }: Props) => {
    const { id } = useParams();
    const { logout, user } = useAuthContex();
    const navigate = useNavigate();
    const toast = useToast();
    const [experience, setExperience] = useState<ExperiencesInt>();
    const [refresh, setRefresh] = useState<boolean>(true);

    useEffect(() => {
        id &&
            setId(id)

    }, [id])

    useEffect(() => {
        refresh &&
            id &&
            getExperienceById(id)
                .then((response: AxiosResponse) => {
                    setExperience(response?.data?.data);
                    setRefresh(false)
                })
                .catch((error: AxiosError) => {
                    if (error?.response?.status === 401) {
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
        experience &&
            setCurrentValue(experience)
    }, [experience])

    return (
        <Flex gap="10px" p="10px">
            {validateRol(["admin"], user?.rol) &&
                <Flex
                    direction="column"
                    flex="1"
                >
                    <EditInformation
                        currentValue={currentValue}
                        setCurrentValue={setCurrentValue}
                        setIsDisabled={setIsDisabled}
                        fromCalled="experiences"
                    />
                </Flex>
            }

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