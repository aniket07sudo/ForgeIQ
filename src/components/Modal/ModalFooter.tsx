import type { HTMLAttributes } from "react";
import styles from "./Modal.module.scss";

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className={styles.footer}>{children}</div>;
};

interface ModalFooterActionsProps
  extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right";
}

export function ModalFooterActions({
  align = "right",
  className,
  children,
  ...props
}: ModalFooterActionsProps) {
  const classes = [
    styles.footerActions,
    align === "left"
      ? styles.footerActionsLeft
      : styles.footerActionsRight,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}