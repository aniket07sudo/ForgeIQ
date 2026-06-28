export interface CellContext<T> {
  row: T;
  rowIndex: number | string;
  column: Column<T>;
}

export interface Column<T> {
  id?: string;
  header: string;
  accessor?: keyof T;
  renderCell?: (context: CellContext<T>) => React.ReactNode;
  width?: string | number;
}

export interface TableRow<T> {
  id: string | number;
  original: T;
}

export interface useTableOptions<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string | number;
  onRowClick?: (row: T) => void;
}

export interface TableInstance<T extends object> {
  columns: Column<T>[];
  rows: TableRow<T>[];
  onRowClick?: (row: T) => void;
}
