import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { ExperiencesTable } from "./views/ExperiencesTable";
import { BiPlusCircle, BiRefresh } from "react-icons/bi";
import { ExperiencesInformation } from "./views/ExperiencesInformation";
import { useState } from "react";
import { ExperiencesInt } from "../../interfaces/ExperiencesInt";
import { updateExperiences } from "../../shared/middlewares/experiences.middleware";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";

export const Experiences = () => {
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [slug, setSlug] = useState<string>()
    const [currentValue, setCurrentValue] = useState<ExperiencesInt>()
    

    const updateData = () => {
        if(slug && currentValue)
            updateExperiences({
                slug: slug,
                data:  currentValue
            })
            .then(() => toastNotify(toast, StatusEnumTypes.SUCCESS, "Datos actualizados con exito"))
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al actualizar los datos"))
            .finally(() => navigate(`/experiences/${currentValue?.slug}`))
    }

    return (
        <Flex 
            direction="column" 
            w="100%"
        >
            <Topbar 
                title="Experiences" 
                buttons={
                location.pathname.startsWith("/experiences/") 
                ? 
                [
                    {
                        label: "Guardar cambios",
                        onClick: () => updateData(),
                        icon: BiRefresh
                    }
                ] 
                :
                [
                    {
                        label: "Nueva experience",
                        onClick: () => onOpen(),
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
                                isOpen={isOpen}
                                onClose={onClose}
                            />
                        } 
                    />

                    <Route path=":slug" element={
                            <ExperiencesInformation 
                                setSlug={setSlug}
                                currentValue={currentValue}
                                setCurrentValue={setCurrentValue}
                            />
                        } 
                    />
                </Routes>
            </Flex>
        </Flex>
    )
};