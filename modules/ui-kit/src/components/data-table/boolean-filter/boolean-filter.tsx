import type { BooleanFilterProps } from "./boolean-filter.type";
import { Button, Switch } from "../../../ui";
import { Hitbox } from "../../hitbox";
import { ArrowLeftRightIcon, XIcon } from "@core-modules/ui-kit/icons";

export const BooleanFilter = <TData, TValue>({ column, title }: BooleanFilterProps<TData, TValue>) => {
  return (
    <div className="flex items-center space-x-2 px-3 rounded-md border border-dashed! bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8">
      <ArrowLeftRightIcon size={14} className="mr-1" />

      <span className="text-sm font-medium">{title}</span>

      <Switch checked={column?.getFilterValue() === true && column.getIsFiltered()} onCheckedChange={(value) => column?.setFilterValue(value)} />

      {column?.getIsFiltered() && (
        <Hitbox>
          <Button onClick={() => column.setFilterValue(null)} variant="secondary" size="icon" className="size-5">
            <XIcon size={16} />
          </Button>
        </Hitbox>
      )}
    </div>
  );
};
