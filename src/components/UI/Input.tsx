import { forwardRef, useState } from "react";
import type { InputHTMLAttributes, Ref } from "react";
import styles from "./Input.module.scss";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "sm" | "md";
  showCaret?: boolean;
  caretOpen?: boolean;
  label?: string;
  subLabel?:string;
  helperText?: string;
};

export const Input = forwardRef(function Input(
  {
    size = "md",
    className,
    disabled,
    showCaret,
    caretOpen,
    label,
    helperText,
    subLabel,
    ...rest
  }: Props,
  ref: Ref<HTMLInputElement | null>,
) {
  const [isFocused, setIsFocused] = useState(false);

  const cls = [styles.field];
  if (className) cls.push(className);
  if (isFocused) cls.push(styles.focus);
  if (disabled) cls.push(styles.disabled);
  if (size === "sm") cls.push(styles.small);

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      {subLabel && <label className={styles.subLabel}>{subLabel}</label>}

      <div className={styles.input + (showCaret ? ` ${styles.hasCaret}` : "")}>
        <input
          ref={ref}
          className={cls.join(" ")}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            (rest.onFocus as any)?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            (rest.onBlur as any)?.(e);
          }}
          {...rest}
        />

        {showCaret ? (
          <span
            className={styles.caret + (caretOpen ? ` ${styles.open}` : "")}
            aria-hidden
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : null}
        {helperText && <div className={styles.helperText}>{helperText}</div>}
      </div>
    </div>
  );
});

export default Input;
