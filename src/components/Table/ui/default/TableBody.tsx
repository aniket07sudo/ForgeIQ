import { useTableContext } from "./TableContext";
import styles from "./Table.module.scss";

export const TableBody = () => {
  const table = useTableContext();

  return (
    <tbody>
      {table.rows.map((row) => (
        <tr className={styles.row}>
          {table.columns.map((col) => {
            const value = col.accessor ? row.original[col.accessor] : undefined;
            return (
              <td
                onClick={() =>
                  table?.onRowClick
                    ? table?.onRowClick(row.original)
                    : undefined
                }
                className={styles.cell}
              >
                {col.renderCell
                  ? col.renderCell({
                      row: row.original,
                      column: col,
                      rowIndex: row.id,
                    })
                  : value}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
