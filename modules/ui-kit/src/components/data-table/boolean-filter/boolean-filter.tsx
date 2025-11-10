import type { BooleanFilterProps } from "./boolean-filter.type";
import { Button, Switch } from "../../../ui";
import { ArrowLeftRightIcon, XIcon } from "@core-modules/ui-kit/icons";

export const BooleanFilter = <TData, TValue>({ column, title }: BooleanFilterProps<TData, TValue>) => {
  return (
    <div className="flex items-center space-x-2 border border-dashed px-3 rounded-md h-9 bg-neutral-100 border-neutral-300">
      <ArrowLeftRightIcon size={14} className="mr-1" />

      <span className="text-sm font-medium">{title}</span>

      <Switch checked={column?.getFilterValue() === true && column.getIsFiltered()} onCheckedChange={(value) => column?.setFilterValue(value)} />

      {column?.getIsFiltered() && (
        <Button onClick={() => column.setFilterValue(null)} variant="secondary" size="icon" className="size-6">
          <XIcon size={16} />
        </Button>
      )}
    </div>
  );
};
