"use client";

import type { PaginationProps } from "./pagination.type";
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "@core-modules/ui-kit/icons";

export const Pagination = <TData, _>({ table }: PaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length}

        {" "}

        of

        {table.getFilteredRowModel().rows.length}

        {" "}

        row(s) selected
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>

          <Select value={table.getState().pagination.pageSize.toString()} onValueChange={(value) => { table.setPageSize(Number(value)); }}>
            <SelectTrigger className="!h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>{pageSize}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page

          {" "}

          {table.getState().pagination.pageIndex + 1}

          {" "}

          of

          {" "}

          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon size={16} />
          </Button>

          <Button variant="outline" aria-label="previous page" size="icon" className="size-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeftIcon size={16} />
          </Button>

          <Button variant="outline" aria-label="next page" size="icon" className="size-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRightIcon size={16} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
