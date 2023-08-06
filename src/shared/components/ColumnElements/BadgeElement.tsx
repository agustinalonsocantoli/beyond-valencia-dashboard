import { Badge, Flex } from "@chakra-ui/react";

interface Props {
    content: boolean;
    isTrue: {
        color: string;
        label: string;
    }
    isFalse: {
        color: string;
        label: string;
    }
}

export const BadgeElement = ({ content, isTrue, isFalse }: Props) => {
    return (
        <Flex>
            <Badge
                colorScheme={content ? isTrue.color : isFalse.color}
                borderRadius="12px"
                p="10px"
            >
                {content ? isTrue.label : isFalse.label}
            </Badge>
        </Flex>
    );
};