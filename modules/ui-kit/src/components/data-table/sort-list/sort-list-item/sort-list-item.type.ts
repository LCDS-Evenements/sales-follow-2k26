import type { ColumnSort } from "@tanstack/react-table";

export type SortListItemProps = {
  sort: ColumnSort;
  columns: { id: string; label: string }[];
  columnLabels: Map<string, string>;
  onSortUpdate: (sortId: string, updates: Partial<ColumnSort>) => void;
  onSortRemove: (sortId: string) => void;
};
