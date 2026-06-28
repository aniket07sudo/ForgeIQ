import type { HTMLAttributes, ReactNode } from "react";
import { useScrollSpy } from "./context/ScrollSpyContext";
import styles from "./ScrollSpy.module.scss";

interface ScrollSpyContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ScrollSpyContent = ({
  children,
  ...props
}: ScrollSpyContentProps) => {
  const { scrollContainerRef } = useScrollSpy();
  return (
    <div
      className={styles.contentContainer}
      ref={scrollContainerRef}
      {...props}
    >
      {children}
    </div>
  );
};
