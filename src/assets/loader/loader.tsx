import styles from "./loader.module.scss";

type LoaderProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
};

export const Loader = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 3,
  className,
}: LoaderProps) => {
  return (
    <span
      className={`${styles.loader} ${className ?? ""}`}
      style={
        {
          "--loader-size": `${size}px`,
          "--loader-color": color,
          "--loader-stroke-width": strokeWidth,
        } as React.CSSProperties
      }
    >
      <svg className={styles.spinner} viewBox="0 0 50 50" aria-hidden="true">
        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" />
      </svg>
    </span>
  );
};

export default Loader;
