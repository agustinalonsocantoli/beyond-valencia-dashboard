import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Flex,
  HStack,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { BiImageAdd, BiX } from "react-icons/bi";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadImageModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />

      <ModalContent 
        zIndex={9999}   
        rounded="12px"
      >
        <ModalBody
          p="0"
          borderRadius= "12px"
        >
          <Flex
            justifyContent="center"
            alignContent="center"
          >
            <iframe
              allow="clipboard-read; clipboard-write"
              src={import.meta.env.VITE_URL_IMG_STORAGE}
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "12px",
              }}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
