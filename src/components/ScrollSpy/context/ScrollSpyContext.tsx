import { createContext, useContext } from "react";
import type { ScrollSpyContextType } from "../types";

export const ScrollSpyContext = createContext<ScrollSpyContextType | null>(null);

export const useScrollSpy = () : ScrollSpyContextType => {
  const context = useContext(ScrollSpyContext);
  if (!context) {
    throw new Error("ScrollSpy components must be used inside ScrollSpy root");
  }
  return context;
};
