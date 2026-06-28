import type { TableInstance, useTableOptions } from "./types";

export function useTable<T extends object>({
  data,
  columns,
  getRowId,
  onRowClick,
}: useTableOptions<T>): TableInstance<T> {
  const rows = data.map((item) => ({
    id: getRowId(item),
    original: item,
  }));

  return {
    rows,
    columns,
    onRowClick,
  };
}
