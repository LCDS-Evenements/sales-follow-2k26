"use client";

import type { ToolbarProps } from "./toolbar.type";
import { Button } from "../../../ui";
import { SortList } from "../sort-list";
import { ViewOptions } from "../view-options";
import { ToolbarFilter } from "./toolbar-filter";
import { XIcon } from "@core-modules/ui-kit/icons";
import { useCallback, useMemo } from "react";

export const Toolbar = <TData, _>({ table }: ToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = useMemo(() => table.getAllColumns().filter((column) => column.getCanFilter()), [table]);

  const onReset = useCallback(() => table.resetColumnFilters(), [table]);

  return (
    <div className="flex w-full items-start justify-between gap-2 p-1">
      <div className="flex flex-1 justify-start items-center gap-2">
        {columns.map((column) => (
          <ToolbarFilter key={column.id} column={column} />
        ))}

        {isFiltered && (
          <Button variant="outline" size="sm" className="border-dashed border-red-500 bg-red-100 text-red-500 hover:bg-red-200" onClick={onReset}>
            <XIcon size={16} className="mr-1" />

            Clear all filters
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <SortList table={table} />

        <ViewOptions table={table} enableColumnOrdering />
      </div>
    </div>
  );
};
