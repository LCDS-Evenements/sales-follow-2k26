import type { Option } from "../data-table.type";
import type { LucideIcon } from "@core-modules/ui-kit/icons";
import type { Column } from "@tanstack/react-table";

export type FacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  multiple?: boolean;
  icon?: LucideIcon;
};
