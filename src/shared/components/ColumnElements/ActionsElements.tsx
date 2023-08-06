import { Box, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";

interface Props {
    edit?: {
        title?: string;
        isDisabled?: boolean;
        onClick: (e?: any) => any;
    };
    remove?: {
        title?: string;
        isDisabled?: boolean;
        onClick: (e?: any) => any;
    };
}

export const ActionsElements = ({ edit, remove }: Props) => {
    return (
        <Menu isLazy>
            <MenuButton
                as={IconButton}
                outline={"none"}
                bg={"transparent"}
                className="action-icon"
                onClick={(e) => e.stopPropagation()}
                _focus={{ bg: "transparent" }}
                _hover={{ bg: "transparent", color: "#71717E" }}
                _active={{ bg: "transparent", color: "#3484FB" }}
                _expanded={{ bg: "transparent", color: "#3484FB" }}
                icon={
                    <Icon
                        color="#55556A"
                        as={BiDotsVerticalRounded}
                        w={"24px"}
                        h={"24px"}
                    />
                }
            />
            <Portal>
                <MenuList
                    p="0px"
                    maxH="380px"
                    w="fit-content"
                    overflowY="auto"
                    rounded="8px"
                    boxShadow={"0px 10px 30px rgba(1, 20, 52, 0.2)"}
                >
                    {edit && (
                        <MenuItem
                            icon={<BiPencil />}
                            mb="5px"
                            p="10px 20px"
                            _last={{ mb: "0px" }}
                            isDisabled={edit.isDisabled}
                            onClick={(e) => {
                                e.stopPropagation();

                                if (edit.onClick) edit.onClick(e);
                            }}
                        >
                            <Box color="#55556A" fontSize="16px">
                                {edit.title || "Editar"}
                            </Box>
                        </MenuItem>
                    )}

                    {remove && (
                        <MenuItem
                            icon={<BiTrash />}
                            mb="5px"
                            p="10px 20px"
                            _last={{ mb: "0px" }}
                            isDisabled={remove.isDisabled}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (remove.onClick) remove.onClick(e);
                            }}
                        >
                            <Box color="#55556A" fontSize="16px">
                                {remove.title || "Eliminar"}
                            </Box>
                        </MenuItem>
                    )}
                </MenuList>
            </Portal>
        </Menu>
    );
}