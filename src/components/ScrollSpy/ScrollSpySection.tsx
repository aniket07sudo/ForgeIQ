import { useEffect, useRef, type HTMLAttributes } from "react";
import { useScrollSpy } from "./context/ScrollSpyContext";

interface ScrollSpySectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
}

export const ScrollSpySection = ({
  id,
  children,
  ...props
}: ScrollSpySectionProps) => {
  const ref = useRef<HTMLElement>(null);

  const { registerSection, unregisterSection } = useScrollSpy();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    registerSection(id, element);

    return () => unregisterSection(id);
  }, [id, registerSection, unregisterSection]);

  return (
    <section {...props} id={id} ref={ref}>
      {children}
    </section>
  );
};
