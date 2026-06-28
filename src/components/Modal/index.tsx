import { ModalRoot } from "./Modal";
import { ModalContent } from "./ModalContent";
import { ModalFooter, ModalFooterActions } from "./ModalFooter";
import { ModalHead } from "./ModalHead";
export { useModal } from "./context/ModalContext";

export const Modal = {
  Root: ModalRoot,
  Header: ModalHead,
  Content:ModalContent,
  Footer:ModalFooter,
  FooterAction:ModalFooterActions
};
