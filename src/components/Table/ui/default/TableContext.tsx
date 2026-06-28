import { createContext, useContext } from "react";
import type { TableInstance } from "../../core/types";

export const TableContext = createContext<TableInstance<any> | null>(null);

export const useTableContext = <T extends object>() => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components should be used inside Table.Root");
  }
  return context as TableInstance<T>;
};
