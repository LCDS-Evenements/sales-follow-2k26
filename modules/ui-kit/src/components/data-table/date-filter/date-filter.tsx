"use client";

import type { DateFilterProps, DateRange, DateSelection } from "./date-filter.type";
import type { MouseEvent } from "react";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, Separator } from "../../../ui";
import { day } from "../../../utils/day";
import { getIsDateRange, parseAsDate, parseColumnFilterValue } from "./date-filter.util";
import { CalendarIcon, XCircleIcon } from "@core-modules/ui-kit/icons";
import { run } from "@core-packages/effect";
import { useCallback, useMemo } from "react";

export const DateFilter = <TData, _>({ column, title, multiple }: DateFilterProps<TData>) => {
  const columnFilterValue = column.getFilterValue();

  const selectedDates = useMemo<DateSelection>(() => {
    if (!columnFilterValue) {
      return multiple ? { from: undefined, to: undefined } : [];
    }

    if (multiple) {
      const timestamps = parseColumnFilterValue(columnFilterValue);

      return {
        from: parseAsDate(timestamps[0]),
        to: parseAsDate(timestamps[1]),
      };
    }

    const timestamps = parseColumnFilterValue(columnFilterValue);
    const date = parseAsDate(timestamps[0]);

    return date ? [date] : [];
  }, [columnFilterValue, multiple]);

  const onSelect = useCallback((date: Date | DateRange | undefined) => {
    if (!date) {
      column.setFilterValue(undefined);
      return;
    }

    if (multiple && !("getTime" in date)) {
      const from = date.from?.getTime();
      const to = date.to?.getTime();

      column.setFilterValue(from || to ? [from, to] : undefined);
    }

    else if (!multiple && "getTime" in date) {
      column.setFilterValue(date.getTime());
    }
  }, [column, multiple]);

  const onReset = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      column.setFilterValue(undefined);
    },
    [column],
  );

  const hasValue = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return false;

      return selectedDates.from || selectedDates.to;
    }

    if (!Array.isArray(selectedDates)) return false;

    return selectedDates.length > 0;
  }, [multiple, selectedDates]);

  const formatDateRange = useCallback((range: DateRange) => {
    if (!range.from && !range.to) return "";

    if (range.from && range.to) {
      return `${day(range.from).format("ll")} - ${day(range.to).format("ll")}`;
    }

    return day(range.from ?? range.to).format("ll");
  }, []);

  const label = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return null;

      const hasSelectedDates = selectedDates.from || selectedDates.to;
      const dateText = hasSelectedDates
        ? formatDateRange(selectedDates)
        : "Select date range";

      return (
        <span className="flex items-center gap-2">
          <span>{title}</span>

          {hasSelectedDates && (
            <>
              <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4 bg-neutral-300" />

              <span>{dateText}</span>
            </>
          )}
        </span>
      );
    }

    if (getIsDateRange(selectedDates)) return null;

    const hasSelectedDate = selectedDates.length > 0;
    const dateText = hasSelectedDate
      ? day(selectedDates[0]).format("ll")
      : "Select date";

    return (
      <span className="flex items-center gap-2">
        <span>{title}</span>
        {hasSelectedDate && (
          <>
            <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4 bg-neutral-300" />

            <span>{dateText}</span>
          </>
        )}
      </span>
    );
  }, [selectedDates, multiple, formatDateRange, title]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed bg-neutral-100">
          {run(() => {
            if (hasValue) {
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

            return (
              <CalendarIcon size={16} className="mr-1" />
            );
          })}

          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        {run(() => {
          if (multiple) {
            return (
              <Calendar
                mode="range"
                selected={
                  getIsDateRange(selectedDates)
                    ? selectedDates
                    : { from: undefined, to: undefined }
                }
                onSelect={onSelect}
              />
            );
          }

          return (
            <Calendar
              mode="single"
              selected={!getIsDateRange(selectedDates) ? selectedDates[0] : undefined}
              onSelect={onSelect}
            />
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
