"use client";

import type { SortListProps } from "./sort-list.type";
import type { ColumnSort } from "@tanstack/react-table";
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from "../../../ui";
import { SortListItem } from "./sort-list-item";
import { ArrowDownUpIcon } from "@core-modules/ui-kit/icons";
import { cn } from "@core-modules/ui-kit/utils";
import { run } from "@core-packages/effect";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";

export const SortList = <TData, _>({ table }: SortListProps<TData>) => {
  const [open, setOpen] = useState<boolean>(false);

  const addButtonRef = useRef<HTMLButtonElement>(null);

  const sorting = table.getState().sorting;

  const onSortingChange = table.setSorting;

  const { columnLabels, columns } = useMemo(() => {
    const labels = new Map<string, string>();
    const sortingIds = new Set(sorting.map((s) => s.id));
    const availableColumns: { id: string; label: string }[] = [];

    for (const column of table.getAllColumns()) {
      if (!column.getCanSort()) continue;

      const label = column.columnDef.meta?.label || column.id;
      labels.set(column.id, label);

      if (!sortingIds.has(column.id)) {
        availableColumns.push({ id: column.id, label });
      }
    }

    return {
      columnLabels: labels,
      columns: availableColumns,
    };
  }, [sorting, table]);

  const onSortAdd = useCallback(() => {
    if (columns.length === 0) return;

    if (columns[0] !== undefined) {
      onSortingChange((prevSorting) => [
        ...prevSorting,
        { id: columns[0]!.id, desc: false },
      ]);
    }
  }, [columns, onSortingChange]);

  const onSortUpdate = useCallback((sortId: string, updates: Partial<ColumnSort>) => {
    onSortingChange((prevSorting) => {
      return prevSorting.map((sort) => sort.id === sortId ? { ...sort, ...updates } : sort,
      );
    });
  }, [onSortingChange]);

  const onSortRemove = useCallback((sortId: string) => {
    onSortingChange((prevSorting) => prevSorting.filter((item) => item.id !== sortId),
    );
  }, [onSortingChange]);

  const onSortingReset = useCallback(() => onSortingChange(table.initialState.sorting), [onSortingChange, table.initialState.sorting]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowDownUpIcon size={16} className="mr-1" />

          Sort

          {sorting.length > 0 && (
            <Badge variant="outline" className="h-[18.24px] rounded-[3.2px] px-[5.12px] font-mono font-normal text-[10.4px] ml-1">
              {sorting.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="flex w-full max-w-[var(--radix-popover-content-available-width)] origin-[var(--radix-popover-content-transform-origin)] flex-col gap-3.5 p-4 sm:min-w-[380px]"
        align="end"
      >
        <div className="flex flex-col gap-1">
          <h4 className="font-medium leading-none">{sorting.length > 0 ? "Sort by" : "No sorting applied"}</h4>

          <p className={cn("text-muted-foreground text-sm", sorting.length > 0 && "sr-only")}>
            {run(() => {
              if (sorting.length > 0) return "Modify sorting to organize your rows";

              return "Add sorting to organize your rows";
            })}
          </p>
        </div>

        {sorting.length > 0 && (
          <div role="list" className="flex max-h-[300px] flex-col gap-2 overflow-y-auto p-1">
            {sorting.map((sort) => (
              <SortListItem
                key={sort.id}
                sort={sort}
                columns={columns}
                columnLabels={columnLabels}
                onSortUpdate={onSortUpdate}
                onSortRemove={onSortRemove}
              />
            ))}
          </div>
        )}

        <div className="flex w-full items-center gap-2">
          <Button size="sm" className="rounded" ref={addButtonRef} onClick={onSortAdd} disabled={columns.length === 0}>Add sort</Button>

          {sorting.length > 0 && (
            <Button variant="secondary" size="sm" className="rounded" onClick={onSortingReset}>Reset sorting</Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
