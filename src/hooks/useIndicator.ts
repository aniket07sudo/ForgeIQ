import { useLayoutEffect, useState } from "react";

interface useIndicatorProps {
  tabs: Map<string, HTMLButtonElement>;
  activeTab: string;
}

export function useIndicator({ tabs, activeTab }: useIndicatorProps) {
  const [style, setStyle] = useState({
    width: 0,
    height: 0,
    left: 0,
  });

  useLayoutEffect(() => {
    if (!activeTab) {
      return;
    }
    const updateIndicator = () => {
      const tab = tabs.get(activeTab);
      if (!tab) return;
      const parent = tab.offsetParent as HTMLElement | null;
      if (!parent) return;

      setStyle((prev) => {
        const next = {
          width: tab.offsetWidth,
          height: tab.offsetHeight,
          left:
            tab.getBoundingClientRect().left -
            parent.getBoundingClientRect().left,
        };
        if (
          prev.height == next.height &&
          prev.left == next.left &&
          prev.width == next.width
        ) {
          return prev;
        }
        return next;
      });
    };

    updateIndicator();

    const resizeObserver = new ResizeObserver(updateIndicator);

    tabs.forEach((tab) => {
      resizeObserver.observe(tab);
    });

    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      resizeObserver.disconnect();
    };
  }, [tabs, activeTab]);

  return style;
}
