import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { NewInformation } from "../../../shared/components/Information/NewInformation";
import { PreviewDetails } from "../../../shared/components/Previews/PreviewDetails";

interface Props {
    newValue: any,
    setNewValue: (action: any) => void;
    setIsDisabled: (action: boolean) => void;
}

export const NewExperience = ({ newValue, setNewValue, setIsDisabled }: Props) => {
    return (
        <Flex gap="10px" p="10px" w="100%">
            <Flex
                direction="column"
                flex="1"
            >
                <NewInformation
                    newValue={newValue}
                    setNewValue={setNewValue}
                    setIsDisabled={setIsDisabled}
                />
            </Flex>

            <Flex
                direction="column"
                flex="1"
            >
                <PreviewDetails
                    data={newValue}
                />
            </Flex>
        </Flex>
    );
}