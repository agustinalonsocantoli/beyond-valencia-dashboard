import { Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
    content: Date;
}

export const DateElement = ({ content }: Props) => {

    return (
        <Text>
            {format(new Date(content), "dd 'de' LLLL 'del' yyyy'", { locale: es })}
        </Text>
    );
};