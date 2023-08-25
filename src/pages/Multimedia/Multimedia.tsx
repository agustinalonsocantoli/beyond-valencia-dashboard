import { Box, Flex, useToast } from "@chakra-ui/react";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { getAllMultimedia } from "../../shared/middlewares/multimedia.middleware";
import { LandingTabs } from "./components/LandingTabs";
import { ExperiencesInt } from "../../interfaces/ExperiencesInt";
import { DaystripsInt } from "../../interfaces/DaytripsInt";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { MultimediaInt } from "../../interfaces/MultimediaInt";
import { LandingEnumTypes } from "../../shared/Types/LadingEnumTypes";

export const Multimedia = () => {
    const toast = useToast();
    const [experiences, setExperiences] = useState<MultimediaInt[]>()
    const [daytrips, setDaytrips] = useState<MultimediaInt[]>()
    const [food, setFood] = useState<MultimediaInt[]>()

    const [refresh, setRefresh] = useState<boolean>(true)

    useEffect(() => {
        const newExperiences: MultimediaInt[] = []
        const newDaytrips: MultimediaInt[] = []
        const newFood: MultimediaInt[] = []

        refresh &&
            getAllMultimedia()
            .then((response: AxiosResponse) => {
                const multimedia = response?.data?.data

                multimedia?.map((item: MultimediaInt) => {
                    if(item.landing === LandingEnumTypes.EXPERIENCES) {
                        newExperiences.push(item)
                    }
                    if(item.landing === LandingEnumTypes.DAYTRIPS) {
                        newDaytrips.push(item)
                    }
                    if(item.landing === LandingEnumTypes.FOOD) {
                        newFood.push(item)
                    }
                })

                setExperiences(newExperiences);
                setDaytrips(newDaytrips);
                setFood(newFood);
                setRefresh(false);
            })
            .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al obtener datos, actualice o contacte a soporte"))

    }, [refresh])

    return (
        <Flex
            direction="column"
            w="100%"
        >
            <Topbar
                title="Multimedia"
            />

            <Box px="20px">
                <LandingTabs 
                    experiences={experiences}
                    daytrips={daytrips}
                    food={food}
                    setRefresh={setRefresh}
                />
            </Box>
        </Flex>
    );
};