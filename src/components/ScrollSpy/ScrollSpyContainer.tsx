import { forwardRef, type HTMLAttributes } from "react";
import styles from './ScrollSpy.module.scss'

interface ScrollSpyContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ScrollSpyContainer = forwardRef<
  HTMLDivElement,
  ScrollSpyContainerProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`${styles.scrollSpyContainer} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
});