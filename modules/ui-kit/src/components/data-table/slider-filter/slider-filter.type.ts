import type { Column } from "@tanstack/react-table";

export type Range = {
  min: number;
  max: number;
};

export type RangeValue = [number, number];

export type SliderFilterProps<TData> = {
  column: Column<TData>;
  title?: string;
};
