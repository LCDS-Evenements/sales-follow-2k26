"use client";

import type { Members } from "./members-table.type";
import type { ColumnDef } from "@tanstack/react-table";
import { AnimatedPlusIcon, ColumnHeader, BooleanVariants } from "@core-modules/ui-kit/components";
import { CalendarIcon, CheckIcon, EllipsisIcon, EyeIcon, GraduationCapIcon, ShieldIcon, TextIcon, UserIcon, XIcon } from "@core-modules/ui-kit/icons";
import { Button, Checkbox, DropdownMenu, DropdownMenuTrigger, Tooltip } from "@core-modules/ui-kit/ui";
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
      cell: ({ row }) => {
        const email = row.getValue<string>("email");

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
      cell: ({ cell }) => day(cell.getValue<Date>()).format("ll"),
      meta: {
        label: "Last time connected",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "active",
      accessorKey: "active",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Active" />
      ),
      cell: ({ cell }) => {
        const value = cell.getValue<Members["active"]>();
        const booleanVariant = (Object.values(BooleanVariants as Record<string, boolean>)).find(
          (variant) => variant === value,
        );

        if (!booleanVariant) return <XIcon size={20} className="text-red-500" />;

        return <CheckIcon size={20} className="text-green-500" />;
      },
      meta: {
        label: "Active",
        variant: "boolean",
      },
      enableColumnFilter: true,
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Role" />
      ),
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
      id: "slider",
      accessorKey: "slider",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Slider" />
      ),
      meta: {
        label: "Slider",
        variant: "range",
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
      cell: function Cell() {
        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex size-7 p-0 data-[state=open]:bg-muted">
                  <EllipsisIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
