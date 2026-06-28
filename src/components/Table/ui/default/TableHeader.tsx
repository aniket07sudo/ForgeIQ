import { useTableContext } from "./TableContext";
import styles from "./Table.module.scss";

export const TableHeader = () => {
  const table = useTableContext();

  return (
    <thead>
      <tr className={styles.headerRow}>
        {table.columns.map((column) => (
          <th className={styles.headerCell}>{column.header}</th>
        ))}
      </tr>
    </thead>
  );
};
