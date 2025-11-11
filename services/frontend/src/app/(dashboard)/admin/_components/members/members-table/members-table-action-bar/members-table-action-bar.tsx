import type { MembersTableActionBarProps } from "./members-table-action-bar.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { ActionBarAction } from "@core-modules/ui-kit/components";
import { CheckIcon, CopyIcon, GraduationCapIcon, TrashIcon } from "@core-modules/ui-kit/icons";
import { Select, SelectContent, SelectGroup, SelectItem } from "@core-modules/ui-kit/ui";
import { SelectTrigger } from "@radix-ui/react-select";
import { useCopyToClipboard } from "#/react/hooks/clipboard";

export const MembersTableActionBar: Component<MembersTableActionBarProps> = ({ table }) => {
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
            <GraduationCapIcon />
          </ActionBarAction>
        </SelectTrigger>

        <SelectContent align="center">
          <SelectGroup>
            {["manager", "viewer"].map((role) => (
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
