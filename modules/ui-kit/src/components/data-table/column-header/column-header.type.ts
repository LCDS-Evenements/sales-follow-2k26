import type { Column } from "@tanstack/react-table";
import type { HTMLAttributes } from "react";

export type ColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & HTMLAttributes<HTMLDivElement>;
