"use client";

import type { Purchase } from "./purchases-history.type";
import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "./status-badge";
import { ColumnHeader } from "@core-modules/ui-kit/components";
import {
  CalendarIcon,
  CheckIcon,
  CircleCheckBigIcon,
  CircleDashedIcon,
  CopyIcon,
  EllipsisIcon,
  ServerIcon,
  TextIcon,
  TicketXIcon,
  TrashIcon,
} from "@core-modules/ui-kit/icons";
import { toast } from "@core-modules/ui-kit/sonner";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@core-modules/ui-kit/ui";
import { useCopyToClipboard } from "#/react/hooks/clipboard";
import { day } from "#/utils/day";

type GetPurchasesColumnsProps = {
  statusCounts: Record<Purchase["status"], number>;
};

// This function is used to generate the columns for the purchases table.
export const getPurchasesColumns = ({ statusCounts }: GetPurchasesColumnsProps): ColumnDef<Purchase>[] => {
  return [
    {
      id: "customer",
      accessorKey: "customer",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Customer" className="pl-4" />
      ),
      cell: ({ cell }) => {
        const customer = cell.getValue<string>();

        return <span className="pl-4">{customer}</span>;
      },
      meta: {
        label: "Customer",
      },
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
      id: "ticket",
      accessorKey: "ticket",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Ticket" />
      ),
    },
    {
      id: "quantity",
      accessorKey: "quantity",
      header: ({ column }) => (
        <ColumnHeader column={column} title="quantity" />
      ),
      meta: {
        variant: "number",
        unit: "qty",
        label: "Quantity",
      },
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Amount" />
      ),
      cell: ({ cell }) => {
        const amount = cell.getValue();

        return (
          <span>
            {String(amount)}

            {" "}

            €
          </span>
        );
      },
      meta: {
        variant: "range",
        label: "Amount",
      },
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      id: "purchasedAt",
      accessorKey: "purchasedAt",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Purchased at" />
      ),
      cell: ({ cell }) => day(cell.getValue<Date>()).format("ll"),
      meta: {
        label: "Purchased at",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
      ),
      cell: ({ cell }) => {
        const status = cell.getValue<"completed" | "pending" | "refunded">();

        return <StatusBadge status={status} />;
      },
      meta: {
        label: "Status",
        variant: "select",
        options: [
          { label: "Completed", value: "completed", count: statusCounts.completed, icon: CircleCheckBigIcon },
          { label: "Pending", value: "pending", count: statusCounts.pending, icon: CircleDashedIcon },
          { label: "refunded", value: "Refunded", count: statusCounts.refunded, icon: TicketXIcon },
        ],
        icon: ServerIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const customer = row.getValue<string>("customer");

        const { copyToClipboard, isCopied } = useCopyToClipboard();

        const copy = () => {
          copyToClipboard(row.original.orderID);

          toast.info("Order ID copied to clipboard");
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
                <DropdownMenuLabel>{customer}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => copy()}>
                  {isCopied ? <CheckIcon /> : <CopyIcon />}

                  Copy ID
                </DropdownMenuItem>

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
