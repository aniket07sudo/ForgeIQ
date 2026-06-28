import type { ReactNode } from "react";
import styles from "./Card.module.scss";

type Props = {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function Card({ children, className = "", variant = "primary" }: Props) {
  const variantClass =
    variant === "secondary" ? styles.secondary : styles.primary;
  const cls = [styles.card, variantClass, className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}

export default Card;
