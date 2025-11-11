"use client";

import type { ActionBarSelectionProps } from "./action-bar-selection.type";
import { Button, Separator, Tooltip, TooltipContent, TooltipTrigger } from "../../../../ui";
import { XIcon } from "@core-modules/ui-kit/icons";
import { run } from "@core-packages/effect";
import { useCallback } from "react";

export const ActionBarSelection = <TData, _>({ table }: ActionBarSelectionProps<TData>) => {
  const onClearSelection = useCallback(() => {
    table.toggleAllRowsSelected(false);
  }, [table]);

  return (
    <div className="flex h-7 items-center rounded-md border pr-1 pl-2.5">
      <span className="whitespace-nowrap text-xs">
        {run(() => {
          if (table.getFilteredSelectedRowModel().rows.length > 1) {
            return `${String(table.getFilteredSelectedRowModel().rows.length)} selectionnées`;
          }

          return `${String(table.getFilteredSelectedRowModel().rows.length)} selectionnée`;
        })}
      </span>

      <Separator orientation="vertical" className="mr-1 ml-2 data-[orientation=vertical]:h-4" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-5" onClick={onClearSelection}>
            <XIcon className="size-3.5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent sideOffset={10} className="flex items-center gap-2 border bg-accent px-2 py-1 font-semibold text-foreground [&>span]:hidden">
          <p>Clear</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
