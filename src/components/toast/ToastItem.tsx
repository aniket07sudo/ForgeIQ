import type { Toast } from "./ToastContainer";
import styles from "./Toast.module.scss";
import SvgIcon from "../Icon/SvgIcon";

interface ToastItemProps {
  toast: Toast;
  onClose(id: number): void;
  onExited(id: number): void;
}

export const ToastItem = ({ toast, onExited, onClose }: ToastItemProps) => {
  const handleAnimationEnd = () => {
    if (toast.closing) {
      onExited(toast.id);
    }
  };
  return (
    <div
      className={`
        ${styles.toast}
        ${styles[toast.variant]}
        ${toast.closing ? styles.toastClosing : ""}
      `}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.icon}>
        <SvgIcon name="tick" color="rgb(94, 230, 106)" />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{toast.message}</h4>
        {/* <p className={styles.message}>Description </p> */}
      </div>
      <button className={styles.close} onClick={() => onClose(toast.id)}>
        <SvgIcon name="cancel" color="#fff" />
      </button>
    </div>
  );
};
