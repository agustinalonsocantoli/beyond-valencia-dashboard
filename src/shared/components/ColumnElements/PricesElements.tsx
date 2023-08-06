import { Flex, Text } from "@chakra-ui/react"

interface Props {
    groups: any[];
    groupType: "private" | "group"
}

export const PricesElements = ({ groups, groupType }: Props) => {

    return (
        <Flex>
            {groups.map((group: any, index: number) => {
                if (group?.type === "private") {
                    return (
                        groupType === "private" ?
                            <Flex direction="column" key={index}>
                                {group.prices.adults && <Text>Adults: {group.prices.adults}€</Text>}
                                {group.prices.children && <Text>Children: {group.prices.children}€</Text>}
                            </Flex>
                            : null
                    )
                } else {
                    return (
                        groupType === "group" ?
                            <Flex direction="column" key={index}>
                                {group.prices.adults && <Text>Adults: {group.prices.adults}€</Text>}
                                {group.prices.children && <Text>Children: {group.prices.children}€</Text>}
                            </Flex>
                            : null
                    )
                }
            })}
        </Flex>
    )
}