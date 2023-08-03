import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { ExperiencesTable } from "./views/ExperiencesTable";

export const Experiences = () => {
    return (
        <Flex 
            direction="column" 
            w="100%"
        >
            <Topbar title="Experiences" />

            <Flex>
                <Routes>
                    <Route index element={<ExperiencesTable />} />

                    <Route path=":experienceId" element={<Flex>CON ID</Flex>} />
                </Routes>
            </Flex>
        </Flex>
    )
};