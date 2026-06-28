import {
  useCallback,
  type ButtonHTMLAttributes,
} from "react";
import { useScrollSpy } from "./context/ScrollSpyContext";

interface ScrollSpyTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  children: React.ReactNode;
}

export const ScrollSpyTab = ({ id, children }: ScrollSpyTabProps) => {
  const { activeTab, registerTab, unRegisterTab, scrollTo } = useScrollSpy();

  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (node) {
        registerTab(id, node);
      } else {
        unRegisterTab(id);
      }
    },
    [id, registerTab, unRegisterTab],
  );

  const active = activeTab == id;

  return (
    <button ref={setRef} data-active={active} onClick={() => scrollTo(id)}>
      {children}
    </button>
  );
};
