import type { ToolbarFilterProps } from "./toolbar-filter.type";
import { Input } from "../../../../ui";
import { BooleanFilter } from "../../boolean-filter";
import { DateFilter } from "../../date-filter";
import { FacetedFilter } from "../../faceted-filter";
import { SliderFilter } from "../../slider-filter";
import { cn } from "@core-modules/ui-kit/utils";
import { useCallback } from "react";

export const ToolbarFilter = <TData, _>({ column }: ToolbarFilterProps<TData>) => {
  const columnMeta = column.columnDef.meta;

  const onFilterRender = useCallback(() => {
    if (!columnMeta?.variant) return null;

    switch (columnMeta.variant) {
      case "text":
        return (
          <Input
            placeholder={columnMeta.placeholder ?? columnMeta.label}
            value={column.getFilterValue() as string}
            onChange={(event) => column.setFilterValue(event.target.value)}
            className="w-72"
          />
        );

      case "number":
        return (
          <div className="relative">
            <Input
              type="number"
              inputMode="numeric"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={column.getFilterValue() as string}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className={cn("h-8 w-[120px]", columnMeta.unit && "pr-8")}
            />

            {columnMeta.unit && (
              <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                {columnMeta.unit}
              </span>
            )}
          </div>
        );

      case "range":
        return (
          <SliderFilter column={column} title={columnMeta.label ?? column.id} />
        );

      case "date":
      case "dateRange":
        return (
          <DateFilter column={column} title={columnMeta.label ?? column.id} multiple={columnMeta.variant === "dateRange"} />
        );

      case "select":
      case "multiSelect":
        return (
          <FacetedFilter
            column={column}
            title={columnMeta.label ?? column.id}
            options={columnMeta.options ?? []}
            multiple={columnMeta.variant === "multiSelect"}
            icon={columnMeta.icon ?? undefined}
          />
        );

      case "boolean":
        return (
          <BooleanFilter column={column} title={columnMeta.label ?? column.id} />
        );

      default:
        return null;
    }
  }, [column, columnMeta]);

  return onFilterRender();
};
