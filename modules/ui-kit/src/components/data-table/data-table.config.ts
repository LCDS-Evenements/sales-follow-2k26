export type DataTableConfig = typeof getDataTableConfig;

export const filterVariants = [
  "text",
  "number",
  "range",
  "date",
  "dateRange",
  "boolean",
  "select",
  "multiSelect",
] as const;
export type FilterVariant = typeof filterVariants[number];

export const getDataTableConfig = () => {
  const dataTableConfig = {
    sortOrders: [{ label: "Asc", value: "asc" as const }, { label: "Desc", value: "desc" as const }],
    filterVariants,
    booleanVariants: [{ label: "Active", value: true }, { label: "Inactive", value: false }],
  };

  return dataTableConfig;
};
