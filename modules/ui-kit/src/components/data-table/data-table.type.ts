import type { FilterVariant } from "./data-table.config";
import type { LucideIcon } from "@core-modules/ui-kit/icons";
import type { ColumnDef, ColumnSort, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: LucideIcon;
  }
}

export type Option = {
  label: string;
  value: string;
  count?: number;
  icon?: LucideIcon;
};

export type ExtendedColumnSort<TData> = {
  id: Extract<keyof TData, string>;
} & Omit<ColumnSort, "id">;

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actionBarContent?: ReactNode;
  emptySentence?: string;
  emptyIcon?: LucideIcon;
};

export const BooleanVariants = {
  true: true,
  false: false,
} as const;
