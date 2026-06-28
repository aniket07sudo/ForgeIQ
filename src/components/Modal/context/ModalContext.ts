import { createContext, useContext, type ComponentType } from "react";

interface ModalContextValue {
  openModal: <P extends object>(
    Component: ComponentType<P>,
    props?: P,
  ) => number;
  closeModal: (id?: number) => void;
  closeAll: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be inside Modal Provider");
  }
  return context as ModalContextValue;
};
