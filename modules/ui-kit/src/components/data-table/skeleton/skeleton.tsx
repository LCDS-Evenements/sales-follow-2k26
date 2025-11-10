import type { DataTableSkeletonProps } from "./skeleton.type";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Skeleton } from "../../../ui";
import { cn, type Component } from "@core-modules/ui-kit/utils";
import { run } from "@core-packages/effect";

const DEFAULT_CELL_WIDTHS = ["auto"];

export const DataTableSkeleton: Component<DataTableSkeletonProps> = ({
  columnCount,
  rowCount = 10,
  filterCount = 0,
  cellWidths = DEFAULT_CELL_WIDTHS,
  withViewOptions = true,
  withPagination = true,
  shrinkZero = false,
  className,
  ...props
}) => {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? "auto",
  );

  return (
    <div className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)} {...props}>
      <div className="flex w-full items-center justify-between gap-2 overflow-auto p-1">
        <div className="flex flex-1 items-center gap-2">
          {run(() => {
            if (filterCount > 0) {
              return Array.from({ length: filterCount }).map(() => (
                <Skeleton key={`filter-${crypto.randomUUID()}`} className="h-7 w-[4.5rem] border-dashed" />
              ));
            }

            return null;
          })}
        </div>

        {run(() => {
          if (withViewOptions) {
            return <Skeleton className="ml-auto hidden h-7 w-[4.5rem] lg:flex" />;
          }

          return null;
        })}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map(() => (
              <TableRow key={crypto.randomUUID()} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableHead key={`column-${crypto.randomUUID()}`} style={{ width: cozyCellWidths[j], minWidth: shrinkZero ? cozyCellWidths[j] : "auto" }}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {Array.from({ length: rowCount }).map(() => (
              <TableRow key={crypto.randomUUID()} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell key={`column-${crypto.randomUUID()}`} style={{ width: cozyCellWidths[j], minWidth: shrinkZero ? cozyCellWidths[j] : "auto" }}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {run(() => {
        if (withPagination) {
          return (
            <div className="flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8">
              <Skeleton className="h-7 w-40 shrink-0" />

              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-24" />

                  <Skeleton className="h-7 w-[4.5rem]" />
                </div>

                <div className="flex items-center justify-center font-medium text-sm">
                  <Skeleton className="h-7 w-20" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="hidden size-7 lg:block" />

                  <Skeleton className="size-7" />

                  <Skeleton className="size-7" />

                  <Skeleton className="hidden size-7 lg:block" />
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
