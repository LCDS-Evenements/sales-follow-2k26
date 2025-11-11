"use client";

import type { SortListItemProps } from "./sort-list-item.type";
import type { SortDirection } from "@tanstack/react-table";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui";
import { getDataTableConfig } from "../../data-table.config";
import { ChevronDownIcon, Trash2Icon } from "@core-modules/ui-kit/icons";
import { useState } from "react";

export const SortListItem = ({ sort, columns, columnLabels, onSortUpdate, onSortRemove }: SortListItemProps) => {
  const { sortOrders } = getDataTableConfig();

  const [showFieldSelector, setShowFieldSelector] = useState<boolean>(false);
  const [showDirectionSelector, setShowDirectionSelector] = useState<boolean>(false);

  return (
    <div role="listitem" tabIndex={-1} className="flex items-center gap-2">
      <Popover open={showFieldSelector} onOpenChange={setShowFieldSelector}>
        <PopoverTrigger asChild>
          <Button role="combobox" variant="outline" size="sm" className="w-44 justify-between font-normal">
            <span className="truncate capitalize">{columnLabels.get(sort.id)}</span>

            <ChevronDownIcon size={16} className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search fields..." />

            <CommandList>
              <CommandEmpty>No fields found</CommandEmpty>

              <CommandGroup>
                {columns.map((column) => (
                  <CommandItem
                    key={column.id}
                    value={column.id}
                    onSelect={(value) => onSortUpdate(sort.id, { id: value })}
                    className="cusror-pointer"
                  >
                    <span className="truncate capitalize">{column.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Select
        open={showDirectionSelector}
        onOpenChange={setShowDirectionSelector}
        value={sort.desc ? "desc" : "asc"}
        onValueChange={(value: SortDirection) => onSortUpdate(sort.id, { desc: value === "desc" })}
      >
        <SelectTrigger className="rounded-md h-8! px-3">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="min-w-[var(--radix-select-trigger-width)] origin-[var(--radix-select-content-transform-origin)]">
          {sortOrders.map((order) => (
            <SelectItem key={order.value} value={order.value} className="cursor-pointer!">{order.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="destructive" size="icon" className="size-7 shrink-0 rounded" onClick={() => onSortRemove(sort.id)}>
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};
