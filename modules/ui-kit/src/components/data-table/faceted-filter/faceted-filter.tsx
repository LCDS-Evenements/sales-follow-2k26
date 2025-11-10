"use client";

import type { Option } from "../data-table.type";
import type { FacetedFilterProps } from "./faceted-filter.type";
import type { MouseEvent } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  Separator,
  Badge,
  PopoverContent,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "../../../ui";
import { CheckIcon, PlusCircleIcon, XCircleIcon } from "@core-modules/ui-kit/icons";
import { cn } from "@core-modules/ui-kit/utils";
import { run } from "@core-packages/effect";
import { createElement, useCallback, useMemo, useState } from "react";

export const FacetedFilter = <TData, TValue>({ column, title, options, multiple, icon }: FacetedFilterProps<TData, TValue>) => {
  const [open, setOpen] = useState<boolean>(false);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = useMemo(() => new Set(Array.isArray(columnFilterValue) ? columnFilterValue : []), [columnFilterValue]);

  const onItemSelect = useCallback((option: Option, isSelected: boolean) => {
    if (!column) return;

    if (multiple) {
      const newSelectedValues = new Set(selectedValues);
      if (isSelected) {
        newSelectedValues.delete(option.value);
      }
      else {
        newSelectedValues.add(option.value);
      }
      const filterValues = Array.from(newSelectedValues);
      column.setFilterValue(filterValues.length ? filterValues : undefined);
    }
    else {
      column.setFilterValue(isSelected ? undefined : [option.value]);
      setOpen(false);
    }
  }, [column, multiple, selectedValues]);

  const onReset = useCallback((event?: MouseEvent) => {
    event?.stopPropagation();
    column?.setFilterValue(undefined);
  }, [column]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed bg-neutral-100">
          {run(() => {
            if (selectedValues.size > 0) {
              return (
                <div
                  tabIndex={0}
                  onClick={onReset}
                  className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <XCircleIcon size={16} className="mr-1" />
                </div>
              );
            }

            if (icon) {
              return createElement(icon, { size: 16, className: "mr-1" });
            }

            return <PlusCircleIcon size={16} className="mr-1" />;
          })}

          {title}

          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4 bg-neutral-300" />

              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden bg-neutral-200 hover:bg-neutral-200">{selectedValues.size}</Badge>

              <div className="hidden items-center gap-1 lg:flex">
                {run(() => {
                  if (selectedValues.size > 2) {
                    return (
                      <Badge variant="secondary" className="rounded-sm px-1 font-normal bg-neutral-200 hover:bg-neutral-200">
                        {selectedValues.size}

                        {" "}

                        selected
                      </Badge>
                    );
                  }

                  return options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal bg-neutral-200 hover:bg-neutral-200">{option.label}</Badge>
                    ));
                })}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />

          <CommandList className="max-h-full">
            <CommandEmpty>No results found</CommandEmpty>

            <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem key={option.value} onSelect={() => onItemSelect(option, isSelected)} className="hover:bg-neutral-100 cursor-pointer">
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border border-primary mr-2",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon />
                    </div>

                    {option.icon && <option.icon className="size-4 mr-1" />}

                    <span className="truncate">
                      {option.label}
                    </span>

                    <span className="ml-auto font-mono text-xs">
                      {option.count ?? 0}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />

                <CommandGroup>
                  <CommandItem onSelect={() => onReset()} className="justify-center text-center pb-2 pt-0">
                    <Button variant="outline" size="sm" className="w-full h-8" onClick={onReset}>
                      Clear
                    </Button>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
