import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Modal.module.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

export const ModalRoot = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className={styles.modal} {...props}>
        {children}
      </div>
    );
  },
);
