"use client";

import type { ColumnHeaderProps } from "./column-header.type";
import { Button } from "../../../ui";
import { ChevronDownIcon, ChevronUpIcon } from "@core-modules/ui-kit/icons";
import { cn } from "@core-modules/ui-kit/utils";

export const ColumnHeader = <TData, TValue>({ column, title, className }: ColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <span className={cn(className, "font-semibold text-sm")}>{title}</span>;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => column.toggleSorting(undefined)}
      className={cn("p-0 hover:bg-transparent! flex gap-2 items-center justify-start w-full", className)}
    >
      <span className="font-semibold">{title}</span>

      <div className="flex flex-col">
        <ChevronUpIcon
          className={cn(
            "-mb-0.5 size-3",
            column.getIsSorted() === "asc"
              ? "text-accent-foreground"
              : "text-muted-foreground",
          )}
        />

        <ChevronDownIcon
          size={12}
          className={cn(
            "-mt-0.5 size-3",
            column.getIsSorted() === "desc"
              ? "text-accent-foreground"
              : "text-muted-foreground",
          )}
        />
      </div>
    </Button>
  );
};
