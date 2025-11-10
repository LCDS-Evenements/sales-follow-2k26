import type { Column } from "@tanstack/react-table";

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export type DateSelection = DateRange | Date[];

export type DateFilterProps<TData> = {
  column: Column<TData>;
  title?: string;
  multiple?: boolean;
};
