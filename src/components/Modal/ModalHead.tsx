import SvgIcon from "../Icon/SvgIcon";
import styles from "./Modal.module.scss";

interface ModalHeadProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const ModalHead = ({ children, onClose }: ModalHeadProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{children}</div>
      {onClose && (
        <button onClick={onClose}>
          <SvgIcon color="#fff" name="cancel" size={30} />
        </button>
      )}
    </div>
  );
};
