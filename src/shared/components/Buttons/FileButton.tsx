import { Flex, Icon, Tooltip, useToast } from '@chakra-ui/react';
import { BsImages } from 'react-icons/bs';


export const FileButton = () => {
    const toast = useToast();

    return (
        <Tooltip
            hasArrow
            label="Upload image"
            bg="#5ecc63"
            color='#FFF'
            placement='left'
        >
            <Flex>
                <Flex
                    borderRadius="100%"
                    alignItems="center"
                    justifyContent="center"
                    bg="#5ecc63"
                    p="10px"
                    cursor="pointer"
                >
                    <Icon
                        as={BsImages}
                        boxSize="20px"
                        color="#FFF"
                    />
                </Flex>
            </Flex>
        </Tooltip>
    )
}