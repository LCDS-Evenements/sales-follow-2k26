import type { ComponentProps } from "react";

export type DataTableSkeletonProps = {
  columnCount: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
  withPagination?: boolean;
  shrinkZero?: boolean;
} & ComponentProps<"div">;
