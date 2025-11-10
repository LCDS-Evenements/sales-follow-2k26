"use client";

import type { RangeValue, SliderFilterProps, Range } from "./slider-filter.type";
import type { ChangeEvent, MouseEvent } from "react";
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Separator, Slider } from "../../../ui";
import { PlusCircleIcon, XCircleIcon } from "@core-modules/ui-kit/icons";
import { cn } from "@core-modules/ui-kit/utils";
import { run } from "@core-packages/effect";
import { useCallback, useId, useMemo } from "react";

const getIsValidRange = (value: unknown): value is RangeValue => {
  return (
    Array.isArray(value)
    && value.length === 2
    && typeof value[0] === "number"
    && typeof value[1] === "number"
  );
};

export const SliderFilter = <TData, _>({ column, title }: SliderFilterProps<TData>) => {
  const id = useId();

  const columnFilterValue = getIsValidRange(column.getFilterValue()) ? (column.getFilterValue() as RangeValue) : undefined;

  const defaultRange = column.columnDef.meta?.range;
  const unit = column.columnDef.meta?.unit;

  const { min, max, step } = useMemo<Range & { step: number }>(() => {
    if (defaultRange && getIsValidRange(defaultRange)) {
      const [minValue, maxValue] = defaultRange;
      const rangeSize = maxValue - minValue;
      const step
        = rangeSize <= 20
          ? 1
          : rangeSize <= 100
            ? Math.ceil(rangeSize / 20)
            : Math.ceil(rangeSize / 50);

      return { min: minValue, max: maxValue, step };
    }

    const values = column.getFacetedMinMaxValues();
    if (values && Array.isArray(values)) {
      const [facetMinValue, facetMaxValue] = values;
      if (
        typeof facetMinValue === "number"
        && typeof facetMaxValue === "number"
      ) {
        const rangeSize = facetMaxValue - facetMinValue;
        const step
          = rangeSize <= 20
            ? 1
            : rangeSize <= 100
              ? Math.ceil(rangeSize / 20)
              : Math.ceil(rangeSize / 50);

        return { min: facetMinValue, max: facetMaxValue, step };
      }
    }

    const minValue = 0;
    const maxValue = 100;
    const rangeSize = maxValue - minValue;
    const step
      = rangeSize <= 20
        ? 1
        : rangeSize <= 100
          ? Math.ceil(rangeSize / 20)
          : Math.ceil(rangeSize / 50);

    return { min: minValue, max: maxValue, step };
  }, [column, defaultRange]);

  const range = useMemo((): RangeValue => {
    return columnFilterValue ?? [min, max];
  }, [columnFilterValue, min, max]);

  const formatValue = useCallback((value: number) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }, []);

  const onFromInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(event.target.value);

      if (!Number.isNaN(numValue) && numValue >= min && numValue <= range[1]) {
        column.setFilterValue([numValue, range[1]]);
      }
    },
    [column, min, range],
  );

  const onToInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(event.target.value);

      if (!Number.isNaN(numValue) && numValue <= max && numValue >= range[0]) {
        column.setFilterValue([range[0], numValue]);
      }
    },
    [column, max, range],
  );

  const onSliderValueChange = useCallback(
    (value: RangeValue) => {
      if (Array.isArray(value)) {
        column.setFilterValue(value);
      }
    },
    [column],
  );

  const onReset = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof HTMLDivElement) {
        event.stopPropagation();
      }

      column.setFilterValue(undefined);
    },
    [column],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed bg-neutral-100">
          {run(() => {
            if (columnFilterValue) {
              return (
                <div
                  tabIndex={0}
                  className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  onClick={onReset}
                >
                  <XCircleIcon size={16} className="mr-1" />
                </div>
              );
            }

            return <PlusCircleIcon size={16} className="mr-1" />;
          })}

          <span>{title}</span>

          {run(() => {
            if (columnFilterValue) {
              return (
                <>
                  <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4 bg-neutral-300" />

                  {formatValue(columnFilterValue[0])}

                  {" "}

                  -

                  {" "}

                  {formatValue(columnFilterValue[1])}

                  {unit ? ` ${unit}` : ""}
                </>
              );
            }

            return null;
          })}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="flex w-auto flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{title}</p>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                id={`${id}-from`}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={min.toString()}
                min={min}
                max={max}
                value={range[0].toString()}
                onChange={onFromInputChange}
                className={cn("h-8 w-24", unit && "pr-8")}
              />

              {unit && (
                <span
                  className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground border-t border-b border-r border-neutral-300 text-sm"
                >
                  {unit}
                </span>
              )}
            </div>

            <div className="relative">
              <Input
                id={`${id}-to`}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={max.toString()}
                min={min}
                max={max}
                value={range[1].toString()}
                onChange={onToInputChange}
                className={cn("h-8 w-24", unit && "pr-8")}
              />

              {unit && (
                <span
                  className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground border-t border-b border-r border-neutral-300 text-sm"
                >
                  {unit}
                </span>
              )}
            </div>
          </div>

          <Slider
            id={`${id}-slider`}
            min={min}
            max={max}
            step={step}
            value={range}
            onValueChange={onSliderValueChange}
          />
        </div>

        <Button variant="outline" size="sm" className="h-8" onClick={onReset}>
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
};
