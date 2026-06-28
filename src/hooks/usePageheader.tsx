import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const DEFAULT_PAGE_HEADER: PageHeaderConfig = {
  title: "",
  description: "",
  actions: () => <></>,
};

export interface PageHeaderConfig {
  title: string | (() => React.ReactNode);
  description?: string;
  badge?:React.ReactNode;
  actions?: () => React.ReactNode;
}

interface Context {
  setPageHeader: React.Dispatch<React.SetStateAction<PageHeaderConfig>>;
}

export function usePageHeader(config: PageHeaderConfig) {
  const { setPageHeader } = useOutletContext<Context>();

  useEffect(() => {
    setPageHeader(config);
    return () => setPageHeader(DEFAULT_PAGE_HEADER);
  }, [config]);
}
