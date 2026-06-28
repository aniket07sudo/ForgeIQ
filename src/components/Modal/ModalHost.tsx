import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalHostProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  closing?: boolean;
  onExited?: () => void;
}

export const ModalHost = ({
  children,
  closing = false,
  onExited,
  ...props
}: ModalHostProps) => {
  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    if (closing) {
      onExited?.();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        {...props}
        className={`${styles.modal} ${closing ? styles.modalClosing : ""}`}
      >
        {children}
      </div>
    </div>
  );
};
