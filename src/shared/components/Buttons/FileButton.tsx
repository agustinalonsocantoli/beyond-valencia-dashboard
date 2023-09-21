import { Flex, Icon, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { BsImages } from 'react-icons/bs';
import { UploadImageModal } from '../Modals/UploadImageModal';


export const FileButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
                    onClick={onOpen}
                >
                    <Icon
                        as={BsImages}
                        boxSize="20px"
                        color="#FFF"
                    />
                </Flex>

                <UploadImageModal 
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </Flex>
        </Tooltip>
    )
}