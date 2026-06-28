import { useCallback, useMemo, useState } from "react";
import { ModalContext } from "./context/ModalContext";
import { createPortal } from "react-dom";
import { ModalHost } from "./ModalHost";

export type ModalComponent<P = object> = React.ComponentType<P>;

interface ModalItem {
  id: number;
  Component: React.ComponentType<any>;
  props: any;
  closing: boolean;
}

let modalId = 0;

interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const openModal = useCallback(
    <P extends object>(Component: ModalComponent<P>, props?: P) => {
      const id = ++modalId;

      setModals((prev) => [
        ...prev,
        {
          id,
          Component,
          props,
          closing: false,
        },
      ]);
      return id;
    },
    [],
  );

  const closeModal = useCallback((id?: number) => {
    setModals((prev) => {
      if (prev.length === 0) return prev;
      const modalId = id ?? prev.at(-1)?.id;
      return prev.map((modal) =>
        modal.id == modalId ? { ...modal, closing: true } : modal,
      );
    });
  }, []);

  const closeAll = useCallback(() => {
    setModals((prev) =>
      prev.map((modal) => ({
        ...modal,
        closing: true,
      })),
    );
  }, []);

  const removeModal = useCallback((id:number) => {
    setModals((prev) => prev.filter((modal) => modal.id != id));
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      closeAll,
    }),
    [openModal, closeAll, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {createPortal(
        <>
          {modals.map(({ Component, props, id, closing }) => (
            <ModalHost onExited={() => removeModal(id)} closing={closing}>
              <Component key={id} {...props} />
            </ModalHost>
          ))}
        </>,
        document.body,
      )}
    </ModalContext.Provider>
  );
}
