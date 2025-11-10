"use client";

import type { DataTableProps } from "./data-table.type";
import type { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Separator, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui";
import { ActionBar } from "./action-bar";
import { ActionBarSelection } from "./action-bar/action-bar-selection";
import { Pagination } from "./pagination";
import { Toolbar } from "./toolbar";
import { SquareDashedIcon } from "@core-modules/ui-kit/icons";
import { cn } from "@core-modules/ui-kit/utils";
import { run } from "@core-packages/effect";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { createElement, isValidElement } from "react";

export const DataTable = <TData, TValue>({ columns, data, actionBarContent, emptyIcon, emptySentence }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const rows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="flex w-full flex-col gap-2.5 overflow-auto">
      <Toolbar table={table} />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {run(async () => {
                        if (header.isPlaceholder) return null;

                        return flexRender(header.column.columnDef.header, header.getContext());
                      })}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {run(() => {
              if (table.getRowModel().rows.length) {
                return table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(index !== table.getRowModel().rows.length - 1 && "border-b")}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-5 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ));
              }

              return (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-18 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="bg-muted border rounded-lg p-1.5">
                        {run(() => {
                          if (emptyIcon) {
                            return createElement(emptyIcon, { size: 16 });
                          }

                          return <SquareDashedIcon size={16} />;
                        })}
                      </div>

                      <span className="font-semibold text-sm">{emptySentence ?? "No results"}</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2.5">
        <Pagination table={table} />

        {actionBarContent && table.getFilteredSelectedRowModel().rows.length > 0 && (
          <ActionBar table={table} visible={rows.length > 0}>
            <ActionBarSelection table={table} />

            <Separator orientation="vertical" className="hidden data-[orientation=vertical]:h-5 sm:block" />

            {isValidElement(actionBarContent)
              ? createElement(
                  actionBarContent.type,
                  {
                    ...(typeof actionBarContent.props === "object" && actionBarContent.props !== null ? actionBarContent.props : {}),
                    table,
                  },
                )
              : null}
          </ActionBar>
        )}
      </div>
    </div>
  );
};
