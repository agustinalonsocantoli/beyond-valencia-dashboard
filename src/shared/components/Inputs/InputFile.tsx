import { Flex, Icon, Input, Tooltip, useToast } from '@chakra-ui/react';
import { toastNotify } from '../../utils/toastNotify';
import { StatusEnumTypes } from '../../Types/StatusEnumTypes';
import { useState } from 'react';
import { BsImages } from 'react-icons/bs';

interface Props {
    name: string;
    value: any;
    setValue: (action: any) => void;
    index: number;
    setIsDisabled?: (action: boolean) => void;
}

export const InputFile = ({ name, value, setValue, index, setIsDisabled }: Props) => {
    const toast = useToast();
    const [imageName, setImageName] = useState<string | null>(null)
    const [isEmpty, setIsEmpty] = useState<boolean>(true)

    const handleImage = (img: string | ArrayBuffer | null, i: number) => {
        const newMultimedia = [
            ...value?.multimedia?.slice(0, i),
            {
                ...value?.multimedia[i],
                src: img
            },
            ...value?.multimedia?.slice(i + 1)
        ]

        setValue((prev: any) => ({
            ...prev,
            [name]: newMultimedia
        }));

        setIsDisabled && setIsDisabled(false)
    }

    const customBase64Uploader = async (e: any) => {
        if (e.target.files.length === 0) {
            setIsEmpty(true)
            setImageName(null)

            return
        } else {
            setIsEmpty(false)
        }

        const file = e.target.files[0];
        const fileName = e.target.files[0].name
        setImageName(fileName)

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => handleImage(reader.result, index);
        reader.onerror = () => toastNotify(toast, StatusEnumTypes.ERROR, "Error al cargar la imagen")
    };

    return (
        <Tooltip
            hasArrow
            label={isEmpty ? "Upload image" : imageName}
            bg={isEmpty ? "#EC555E" : "#5ecc63"}
            color='#FFF'
            placement='left'
        >
            <Flex
                pos="relative"
                w="55px"
                h="55px"
                borderRadius="100%"
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
                bg={isEmpty ? "#EC555E" : "#5ecc63"}
            >
                <Input
                    type='file'
                    accept="image/*,video/mp4,video/x-m4v,video/*"
                    onChange={customBase64Uploader}
                    border="none"
                    opacity="0"
                    pos="absolute"
                    h="100%"
                    w="100%"
                />

                <Icon
                    as={BsImages}
                    boxSize="25px"
                    color="#FFF"
                />
            </Flex>
        </Tooltip>
    )
}