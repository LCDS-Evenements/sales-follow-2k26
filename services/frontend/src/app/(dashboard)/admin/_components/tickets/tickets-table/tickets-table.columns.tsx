"use client";

import type { Ticket } from "./tickets-table.type";
import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "./status-badge";
import { AnimatedPlusIcon, ColumnHeader } from "@core-modules/ui-kit/components";
import {
  CheckIcon,
  ClockIcon,
  CopyIcon,
  EllipsisIcon,
  FlameIcon,
  PenIcon,
  ServerIcon,
  ShoppingBasketIcon,
  SparklesIcon,
  TextIcon,
  TicketIcon,
  TrashIcon,
} from "@core-modules/ui-kit/icons";
import { toast } from "@core-modules/ui-kit/sonner";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@core-modules/ui-kit/ui";
import { useCopyToClipboard } from "#/react/hooks/clipboard";
import { useState } from "react";

type GetTicketsColumnsProps = {
  statusCount: Record<Ticket["status"], number>;
};

// This function is used to generate the columns for the tickets table.
export const getTicketsColumns = ({ statusCount }: GetTicketsColumnsProps): ColumnDef<Ticket>[] => {
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
      id: "label",
      accessorKey: "label",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Label" />
      ),
      meta: {
        label: "Label",
        placeholder: "Search by label...",
        variant: "text",
        icon: TextIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "category",
      accessorKey: "category",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Category" />
      ),
      enableSorting: true,
      meta: {
        label: "Category",
      },
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
      enableSorting: true,
      enableColumnFilter: true,
      meta: {
        variant: "range",
        label: "Amount",
      },
    },
    {
      id: "capacity",
      accessorKey: "capacity",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Capacity" />
      ),
      meta: {
        variant: "number",
        unit: "qty",
        label: "Capacity",
      },
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      id: "ticketsSold",
      accessorKey: "ticketsSold",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Tickets sold" />
      ),
      cell: ({ cell, row }) => {
        const ticketsSold = cell.getValue();

        const pourcentage = row.original.pourcentage;

        return (
          <span>
            {String(ticketsSold)}

            {" "}

            (
            {pourcentage}

            {" "}

            %)
          </span>
        );
      },
      meta: {
        label: "Tickets sold",
      },
      enableSorting: true,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Status" />
      ),
      cell: ({ cell }) => {
        const status = cell.getValue<"coming-soon" | "in-sale" | "limited-stock" | "sold-out">();

        return <StatusBadge status={status} />;
      },
      meta: {
        label: "Status",
        variant: "select",
        options: [
          { label: "Coming soon", value: "coming-soon", count: statusCount["coming-soon"], icon: ClockIcon },
          { label: "In sale", value: "in-sale", count: statusCount["in-sale"], icon: ShoppingBasketIcon },
          { label: "Limited stock", value: "limited-stock", count: statusCount["limited-stock"], icon: FlameIcon },
          { label: "Sold out", value: "sold-out", count: statusCount["sold-out"], icon: SparklesIcon },
        ],
        icon: ServerIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "actions",
      header: function Header() {
        const [hovered, setHovered] = useState<boolean>(false);

        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <Button size="sm" className="h-6 px-1!" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
                  <AnimatedPlusIcon size={12} data-hovered={hovered} />

                  <TicketIcon size={16} />
                </Button>
              </div>
            </TooltipTrigger>

            <TooltipContent>
              Create a new ticket
            </TooltipContent>
          </Tooltip>
        );
      },
      cell: function Cell({ row }) {
        const category = row.getValue<string>("category");

        const label = row.getValue<string>("label");

        const status = row.getValue<string>("status");

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
                  [
                  {category}
                  ]

                  {" "}

                  {label}
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
                    <ServerIcon className="mr-2" />

                    Status
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={status}>
                      <DropdownMenuRadioItem value="coming-soon" className="capitalize cursor-pointer">
                        Coming soon
                      </DropdownMenuRadioItem>

                      <DropdownMenuRadioItem value="in-sale" className="capitalize cursor-pointer">
                        In sale
                      </DropdownMenuRadioItem>

                      <DropdownMenuRadioItem value="limited-stock" className="capitalize cursor-pointer">
                        Limited stock
                      </DropdownMenuRadioItem>

                      <DropdownMenuRadioItem value="sold-out" className="capitalize cursor-pointer">
                        Sold out
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
