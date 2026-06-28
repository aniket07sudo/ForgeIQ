import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.scss";
import SvgIcon from "../Icon/SvgIcon";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: React.ReactNode;
  helperText?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, className, ...props }, ref) => {
    return (
      <label className={`${styles.wrapper} ${className ?? ""}`}>
        <input ref={ref} type="checkbox" className={styles.input} {...props} />

        <span className={styles.checkbox}>
          <SvgIcon name="check" color="#fff" className={styles.icon} />
        </span>

        {(label || helperText) && (
          <span className={styles.content}>
            {label && <span className={styles.label}>{label}</span>}
            {helperText && <span className={styles.helper}>{helperText}</span>}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
