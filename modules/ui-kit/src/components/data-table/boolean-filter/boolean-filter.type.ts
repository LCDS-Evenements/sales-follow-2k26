import type { Column } from "@tanstack/react-table";

export type BooleanFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  title?: string;
};
