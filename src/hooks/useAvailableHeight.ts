import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface UseAvailableHeightOptions {
  /**
   * Additional height to subtract.
   * Example: sticky footer, padding, etc.
   */
  offset?: number;
}

interface UseAvailableHeightReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  availableHeight: number;
}

export function useAvailableHeight<T extends HTMLElement = HTMLDivElement>({
  offset = 0,
}: UseAvailableHeightOptions = {}): UseAvailableHeightReturn<T> {
  const ref = useRef<T>(null);

  const [availableHeight, setAvailableHeight] = useState(0);

  const calculateHeight = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const { top } = element.getBoundingClientRect();

    setAvailableHeight(Math.max(window.innerHeight - top - offset, 0));
  }, [offset]);

  useLayoutEffect(() => {
    calculateHeight();

    const resizeObserver = new ResizeObserver(() => {
      calculateHeight();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    window.addEventListener("resize", calculateHeight);
    window.addEventListener("scroll", calculateHeight, {
      passive: true,
    });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateHeight);
      window.removeEventListener("scroll", calculateHeight);
    };
  }, [calculateHeight]);

  return {
    ref,
    availableHeight,
  };
}