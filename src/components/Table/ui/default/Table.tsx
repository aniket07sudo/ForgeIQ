import { TableContext } from "./TableContext";
import styles from "./Table.module.scss";
import type { PropsWithChildren } from "react";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

interface RootProps {
  table: any;
}

const Root = ({ table, children }: PropsWithChildren<RootProps>) => {
  return (
    <TableContext.Provider value={table}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>{children}</table>
      </div>
    </TableContext.Provider>
  );
};

export const Table = {
  Root,
  Header: TableHeader,
  Body: TableBody,
};
