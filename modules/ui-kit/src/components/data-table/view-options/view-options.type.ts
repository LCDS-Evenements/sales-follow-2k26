import type { Table } from "@tanstack/react-table";

export type ViewOptionsProps<TData> = {
  table: Table<TData>;
  enableColumnOrdering: boolean;
};
