import { forwardRef, useState } from "react";
import type { ButtonHTMLAttributes, Ref } from "react";
import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "glass" | "solid";
  size?: "sm" | "md";
};

export const Button = forwardRef(function Button(
  {
    variant = "ghost",
    size = "md",
    className,
    disabled,
    children,
    ...rest
  }: Props,
  ref: Ref<HTMLButtonElement | null>,
) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const cls = [styles.btn];
  if (variant === "primary") cls.push(styles.primary);
  if (variant === "ghost" || variant === "glass") cls.push(styles.glass);
  if (variant === "solid") cls.push(styles.solid);
  if (size === "sm") cls.push(styles.small);
  if (hover) cls.push(styles.hover);
  if (focus) cls.push(styles.focus);
  if (disabled) cls.push(styles.disabled);
  if (className) cls.push(className);

  return (
    <button
      ref={ref}
      className={cls.join(" ")}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={(e) => {
        setFocus(true);
        (rest.onFocus as any)?.(e);
      }}
      onBlur={(e) => {
        setFocus(false);
        (rest.onBlur as any)?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
