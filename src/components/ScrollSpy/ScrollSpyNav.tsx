import type { HTMLAttributes } from "react";
import styles from "./ScrollSpy.module.scss";
import { useIndicator } from "../../hooks/useIndicator";
import { useScrollSpy } from "./context/ScrollSpyContext";

interface ScrollSpyNavProps extends HTMLAttributes<HTMLDivElement> {}

export const ScrollSpyNav = ({ children, ...props }: ScrollSpyNavProps) => {
  const { tabs, activeTab } = useScrollSpy();
  const indicator = useIndicator({ tabs, activeTab });
  return (
    <div {...props}>
      {children}
      <span
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.left}px)`,
        }}
        className={styles.indicator}
      />
    </div>
  );
};
