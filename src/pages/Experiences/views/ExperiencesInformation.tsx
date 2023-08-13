import { Flex, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getExperienceBySlug } from "../../../shared/middlewares/experiences.middleware";
import { AxiosResponse } from "axios";
import { toastNotify } from "../../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../../shared/Types/StatusEnumTypes";
import { PreviewDetails } from "../../../shared/components/Previews/PreviewDetails";
import { ShowInformation } from "../../../shared/components/Information/ShowInformation";
import { ExperiencesInt } from "../../../interfaces/ExperiencesInt";

interface Props {
    currentValue: any,
    setCurrentValue: (action: any) => void;
    setSlug: (action: string) => void;
}

export const ExperiencesInformation = ({ currentValue, setCurrentValue, setSlug }: Props) => {
    const { slug } = useParams();
    const toast = useToast();
    const [experience, setExperience] = useState<ExperiencesInt>();
    const [refresh, setRefresh] = useState<boolean>(true);

    useEffect(() => {
        slug &&
            setSlug(slug)

    }, [slug])

    useEffect(() => {
        refresh &&
            slug &&
            getExperienceBySlug(slug)
                .then((response: AxiosResponse) => {
                    setExperience(response?.data?.data);
                    setRefresh(false)
                })
                .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte."))

    }, [refresh, slug])

    useEffect(() => {
        experience &&
            setCurrentValue(experience)
    }, [experience])

    return(
        <Flex gap="10px" p="10px">
            <Flex 
                direction="column" 
                flex="1"
            >
                <ShowInformation 
                    currentValue={currentValue}
                    setCurrentValue={setCurrentValue}
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