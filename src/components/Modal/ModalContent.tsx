import styles from "./Modal.module.scss";

interface ModalContentProps {
  children: React.ReactNode;
}

export const ModalContent = ({ children }: ModalContentProps) => {
  return <div className={styles.content}>{children}</div>;
};
