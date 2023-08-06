import { Flex, Text } from "@chakra-ui/react";

interface Props {
    title?: {
        text: string;
    }
    subtitle?: {
        text: string;
        label: string;
    }
}

export const TextElement = ({ title, subtitle }: Props) => {
    return (
        <>
            {title &&
                <Text>
                    {title?.text}
                </Text>
            }

            {subtitle &&
                <Flex direction="column">
                    <Text fontWeight="semibold">
                        {subtitle?.label}
                    </Text>

                    <Text>
                        {subtitle?.text}
                    </Text>
                </Flex>
            }
        </>
    );
}