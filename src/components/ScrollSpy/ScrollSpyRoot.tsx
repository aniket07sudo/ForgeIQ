import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ScrollSpyContext } from "./context/ScrollSpyContext";

interface ScrollSpyRootProps {
  children: ReactNode;
}

export const ScrollSpyRoot = ({ children }: ScrollSpyRootProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const observerRef = useRef<IntersectionObserver>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (!visible.length) {
          return;
        }

        const nextActiveTab = visible[0].target.id;

        setActiveTab((prev) => (prev === nextActiveTab ? prev : nextActiveTab));
      },
      {
        root: container,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      },
    );

    return () => observerRef?.current?.disconnect();
  }, []);

  const registerSection = useCallback((id: string, element: HTMLElement) => {
    sectionsRef.current.set(id, element);
    observerRef.current?.observe(element);
  }, []);

  const registerTab = useCallback((id: string, element: HTMLButtonElement) => {
    tabsRef.current.set(id, element);
  }, []);

  const unRegisterTab = useCallback((id: string) => {
    tabsRef.current.delete(id);
  }, []);

  const unRegisterSection = useCallback((id: string) => {
    const element = sectionsRef.current.get(id);
    if (element) {
      observerRef.current?.unobserve(element);
    }
    sectionsRef.current.delete(id);
  }, []);

  const handleScrollToSection = useCallback((id: string) => {
    const element = sectionsRef.current.get(id);
    const container = scrollContainerRef.current;

    if (!element || !container) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const offset = elementRect.top - containerRect.top + container.scrollTop;

    container.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }, []);

  const value = useMemo(
    () => ({
      activeTab,
      registerSection,
      registerTab,
      unRegisterTab,
      unregisterSection: unRegisterSection,
      tabs: tabsRef.current,
      scrollTo: handleScrollToSection,
      scrollContainerRef,
    }),
    [activeTab, registerSection, unRegisterSection, registerTab, unRegisterTab],
  );

  return (
    <ScrollSpyContext.Provider value={value}>
      {children}
    </ScrollSpyContext.Provider>
  );
};
