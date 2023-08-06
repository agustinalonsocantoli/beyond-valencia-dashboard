import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const DeleteModal = ({
    title,
    isOpen,
    securityWord,
    onClose,
    onAccept,
}: {
    title: React.ReactNode;
    isOpen: boolean;
    securityWord: string;
    onClose: (e?: any) => void;
    onAccept: (e?: any) => void;
}) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue("");
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>{title}</ModalHeader>

                <ModalBody>
                    <FormLabel className="form-label">
                        Escribe <i>{securityWord}</i> para confirmar{" "}
                        <strong>que quieres borrar</strong> el elemento.
                    </FormLabel>

                    <Input
                        value={value}
                        className="form-input"
                        placeholder={securityWord}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </ModalBody>

                <ModalFooter mt={3}>
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button
                        colorScheme={value !== securityWord ? "gray" : "red"}
                        isDisabled={value !== securityWord}
                        onClick={onAccept}
                    >
                        Eliminar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};