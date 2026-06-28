import { forwardRef, useState } from "react";
import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: "primary" | "secondary";
  label?: React.ReactNode;
  helperText?: React.ReactNode;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  function TextArea(
    {
      variant = "primary",
      className,
      disabled,
      label,
      helperText,
      ...rest
    },
    ref,
  ) {
    const [isFocused, setIsFocused] = useState(false);

    const clsParts: Array<string | undefined> = [styles.textarea];

    if (className) clsParts.push(className);
    if (variant === "primary") clsParts.push(styles.primary);
    if (variant === "secondary") clsParts.push(styles.secondary);
    if (isFocused) clsParts.push(styles.focus);
    if (disabled) clsParts.push(styles.disabled);

    const cls = clsParts.filter(Boolean).join(" ");

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}

        <textarea
          ref={ref}
          className={cls}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />

        {helperText && (
          <div className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

export default TextArea;