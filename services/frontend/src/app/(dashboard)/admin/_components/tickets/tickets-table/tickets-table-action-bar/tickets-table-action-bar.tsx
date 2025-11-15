import type { TicketsTableActionBarProps } from "./tickets-table-action-bar.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { ActionBarAction } from "@core-modules/ui-kit/components";
import { CheckIcon, CopyIcon, ServerIcon, TrashIcon } from "@core-modules/ui-kit/icons";
import { Select, SelectContent, SelectGroup, SelectItem } from "@core-modules/ui-kit/ui";
import { SelectTrigger } from "@radix-ui/react-select";
import { useCopyToClipboard } from "#/react/hooks/clipboard";

export const TicketsTableActionBar: Component<TicketsTableActionBarProps> = ({ table }) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  if (typeof table === "undefined") return <></>;

  const rows = table.getFilteredSelectedRowModel().rows;

  const ids = rows.map((row) => row.original.id);

  const copyIDS = () => {
    const joinedIDS = ids.join(", ");

    copyToClipboard(joinedIDS);
  };

  return (
    <div className="flex items-center gap-1.5">
      <Select>
        <SelectTrigger>
          <ActionBarAction size="icon">
            <ServerIcon />
          </ActionBarAction>
        </SelectTrigger>

        <SelectContent align="center">
          <SelectGroup>
            {["coming-soon", "in-sale", "limited-stock", "sold-out"].map((role) => (
              <SelectItem key={role} value={role} className="capitalize cursor-pointer">{role}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <ActionBarAction size="icon" onClick={() => copyIDS()}>
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </ActionBarAction>

      <ActionBarAction variant="destructive">
        <TrashIcon />
      </ActionBarAction>
    </div>
  );
};
