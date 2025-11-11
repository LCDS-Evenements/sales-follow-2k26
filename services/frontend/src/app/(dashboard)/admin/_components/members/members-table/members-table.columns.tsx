"use client";

import type { Members } from "./members-table.type";
import type { ColumnDef } from "@tanstack/react-table";
import { AnimatedPlusIcon, ColumnHeader } from "@core-modules/ui-kit/components";
import { CalendarIcon, CheckIcon, CopyIcon, EllipsisIcon, EyeIcon, GraduationCap, GraduationCapIcon, PenIcon, ShieldIcon, TextIcon, TrashIcon, UserIcon } from "@core-modules/ui-kit/icons";
import { toast } from "@core-modules/ui-kit/sonner";
import { Badge, Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Tooltip } from "@core-modules/ui-kit/ui";
import { run } from "@core-packages/effect";
import { useCopyToClipboard } from "#/react/hooks/clipboard";
import { day } from "#/utils/day";
import { useState } from "react";

// This function is used to generate the columns for the members table.
export const getMembersColumns = (): ColumnDef<Members>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllRowsSelected(Boolean(value))}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            className="translate-y-0.5"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Email" />
      ),
      cell: ({ cell }) => {
        const email = cell.getValue<string>();

        return (
          <p className="lowercase">{email}</p>
        );
      },
      meta: {
        label: "Email",
        placeholder: "Search by email...",
        variant: "text",
        icon: TextIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "firstname",
      accessorKey: "firstname",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Firstname" />
      ),
      enableSorting: false,
      meta: {
        label: "Firstname",
      },
    },
    {
      id: "lastname",
      accessorKey: "lastname",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Lastname" />
      ),
      enableSorting: false,
      meta: {
        label: "Lastname",
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Created at" />
      ),
      cell: ({ cell }) => day(cell.getValue<Date>()).format("ll"),
      meta: {
        label: "Created at",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "lastTimeConnected",
      accessorKey: "lastTimeConnected",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Last time connected" />
      ),
      cell: ({ cell }) => day(cell.getValue<Date>()).format("lll"),
      meta: {
        label: "Last time connected",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Role" />
      ),
      cell: ({ cell }) => {
        const role = cell.getValue<string>();

        return (
          <Badge variant="secondary" className="uppercase">
            {run(() => {
              if (role === "manager") {
                return <ShieldIcon />;
              }

              return <EyeIcon />;
            })}

            {" "}

            {role}
          </Badge>
        );
      },
      meta: {
        label: "Role",
        variant: "select",
        options: [
          { label: "Manager", value: "manager", count: 0, icon: ShieldIcon },
          { label: "Viewer", value: "viewer", count: 0, icon: EyeIcon },
        ],
        icon: GraduationCapIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "actions",
      header: function Header() {
        const [hovered, setHovered] = useState<boolean>(false);

        return (
          <Tooltip>
            <div className="flex items-center justify-center">
              <Button size="sm" className="h-6 px-1!" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
                <AnimatedPlusIcon size={12} data-hovered={hovered} />

                <UserIcon size={16} />
              </Button>
            </div>
          </Tooltip>
        );
      },
      cell: function Cell({ row }) {
        const firstname = row.getValue<string>("firstname");

        const lastname = row.getValue<string>("lastname");

        const role = row.getValue<string>("role");

        const { copyToClipboard, isCopied } = useCopyToClipboard();

        const copy = () => {
          copyToClipboard(row.original.id);

          toast.info("Member ID copied to clipboard");
        };

        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex size-7 p-0 data-[state=open]:bg-muted">
                  <EllipsisIcon size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {firstname}

                  {" "}

                  {lastname}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => copy()}>
                  {isCopied ? <CheckIcon /> : <CopyIcon />}

                  Copy ID
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <PenIcon />

                  Edit
                </DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <GraduationCap className="mr-2" />

                    Role
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={role}>
                      <DropdownMenuRadioItem value="manager" className="capitalize cursor-pointer">
                        Manager
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="viewer" className="capitalize cursor-pointer">
                        Viewer
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive">
                  <TrashIcon />

                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
