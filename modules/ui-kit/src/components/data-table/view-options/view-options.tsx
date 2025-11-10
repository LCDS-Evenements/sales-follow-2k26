"use client";

import type { ViewOptionsProps } from "./view-options.type";
import {
  Button,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandItem,
} from "../../../ui";
import { Sortable, SortableDragHandle, SortableItem } from "../../sortable";
import { CheckIcon, GripVertical, Settings2Icon } from "@core-modules/ui-kit/icons";
import { cn } from "@core-modules/ui-kit/utils";
import { run } from "@core-packages/effect";
import { useMemo, useState } from "react";

export const ViewOptions = <TData, _>({ table, enableColumnOrdering }: ViewOptionsProps<TData>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [drag, setDrag] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const columnOrder = table.getState().columnOrder;

  const sortedColumns = useMemo(
    () => table.getAllColumns().sort((a, b) => {
      return columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id);
    }),
    [columnOrder, table],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2Icon size={16} className="mr-1" />

          Columns
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="end" className="p-0">
        <Command>
          <CommandInput value={search} onValueChange={setSearch} placeholder="Search columns..." />

          <CommandList>
            <CommandEmpty>No columns found</CommandEmpty>

            <CommandGroup>
              <Sortable
                value={sortedColumns.map((c) => ({ id: c.id }))}
                onValueChange={(items: { id: string }[]) => table.setColumnOrder(items.map((c) => c.id))}
                overlay={<div className="h-8 w-full rounded-md bg-muted/60" />}
                onDragStart={() => setDrag(true)}
                onDragEnd={() => setDrag(false)}
                onDragCancel={() => setDrag(false)}
              >
                {sortedColumns
                  .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                  .map((column) => (
                    <SortableItem key={column.id} value={column.id} asChild>
                      <CommandItem
                        value={column.id}
                        onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                        className="capitalize hover:bg-neutral-100"
                        disabled={drag}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            column.getIsVisible()
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon size={16} />
                        </div>

                        <span className="font-medium">{column.columnDef.meta?.label || column.id}</span>

                        {run(() => {
                          if (enableColumnOrdering && !search) {
                            return (
                              <SortableDragHandle
                                variant="ghost"
                                size="icon"
                                className="ml-auto size-5 text-muted-foreground hover:text-foreground hover:border-none focus:bg-muted focus:text-foreground"
                              >
                                <GripVertical
                                  className="size-4"
                                  aria-hidden="true"
                                />
                              </SortableDragHandle>
                            );
                          }

                          return null;
                        })}
                      </CommandItem>
                    </SortableItem>
                  ))}
              </Sortable>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
