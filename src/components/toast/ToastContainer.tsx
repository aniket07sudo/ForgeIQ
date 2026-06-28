import type { ToastVariant } from "./context";
import styles from "./Toast.module.scss";
import { ToastItem } from "./ToastItem";

export interface Toast {
  id: number;
  variant: ToastVariant;
  message: string;
  duration: number;
  closing: boolean;
}

interface ToastContainerProps {
  toasts: Toast[];
  closeToast(id: number): void;
  removeToast(id: number): void;
}

export function ToastContainer({
  toasts,
  closeToast,
  removeToast,
}: ToastContainerProps) {
  return (
    <div className={styles.container}>
      {toasts?.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={closeToast}
          onExited={removeToast}
        />
      ))}
    </div>
  );
}
