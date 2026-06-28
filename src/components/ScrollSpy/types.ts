import type { RefObject } from "react";

export type ScrollSpyContextType = {
  activeTab: string;
  registerSection: (id: string, element: HTMLElement) => void;
  unregisterSection: (id: string) => void;
  registerTab: (id: string, element: HTMLButtonElement) => void;
  unRegisterTab: (id: string) => void;
  tabs: Map<string, HTMLButtonElement>;
  scrollTo: (id: string) => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};
