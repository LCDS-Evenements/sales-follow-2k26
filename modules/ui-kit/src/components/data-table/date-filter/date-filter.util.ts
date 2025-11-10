import type { DateRange, DateSelection } from "./date-filter.type";

export const getIsDateRange = (value: DateSelection): value is DateRange => {
  return typeof value === "object" && !Array.isArray(value);
};

export const parseAsDate = (timestamp: number | string | undefined): Date | undefined => {
  if (!timestamp) return undefined;
  const numericTimestamp
    = typeof timestamp === "string" ? Number(timestamp) : timestamp;
  const date = new Date(numericTimestamp);
  return !Number.isNaN(date.getTime()) ? date : undefined;
};

export const parseColumnFilterValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "number" || typeof item === "string") {
        return item;
      }
      return undefined;
    });
  }

  if (typeof value === "string" || typeof value === "number") {
    return [value];
  }

  return [];
};
