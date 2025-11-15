"use client";

import type { Ticket } from "./tickets-table.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { TicketsTableActionBar } from "./tickets-table-action-bar";
import { getTicketsColumns } from "./tickets-table.columns";
import { DataTable } from "@core-modules/ui-kit/components";
import { TicketsIcon } from "@core-modules/ui-kit/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@core-modules/ui-kit/ui";
import { run } from "@core-packages/effect";

const tickets: Ticket[] = [
  {
    id: "a",
    label: "Pass Vendredi",
    category: "Early",
    amount: 40,
    capacity: 500,
    ticketsSold: 450,
    pourcentage: 90,
    status: "limited-stock",
  },
  {
    id: "b",
    label: "Pass Samedi",
    category: "Early",
    amount: 40,
    capacity: 500,
    ticketsSold: 500,
    pourcentage: 100,
    status: "sold-out",
  },
  {
    id: "c",
    label: "Pass 2 Jours",
    category: "Early",
    amount: 70,
    capacity: 300,
    ticketsSold: 300,
    pourcentage: 100,
    status: "sold-out",
  },
  {
    id: "d",
    label: "Pass Vendredi",
    category: "Regular",
    amount: 50,
    capacity: 500,
    ticketsSold: 320,
    pourcentage: 64,
    status: "in-sale",
  },
  {
    id: "e",
    label: "Pass Samedi",
    category: "Regular",
    amount: 50,
    capacity: 500,
    ticketsSold: 285,
    pourcentage: 57,
    status: "in-sale",
  },
  {
    id: "f",
    label: "Pass 2 Jours",
    category: "Regular",
    amount: 90,
    capacity: 300,
    ticketsSold: 180,
    pourcentage: 60,
    status: "in-sale",
  },
  {
    id: "g",
    label: "Pass Vendredi",
    category: "Late",
    amount: 60,
    capacity: 400,
    ticketsSold: 0,
    pourcentage: 0,
    status: "coming-soon",
  },
  {
    id: "h",
    label: "Pass Samedi",
    category: "Late",
    amount: 60,
    capacity: 400,
    ticketsSold: 0,
    pourcentage: 0,
    status: "coming-soon",
  },
  {
    id: "i",
    label: "Pass 2 Jours",
    category: "Late",
    amount: 100,
    capacity: 250,
    ticketsSold: 0,
    pourcentage: 0,
    status: "coming-soon",
  },
];

export const TicketsTable: Component = () => {
  const columns = getTicketsColumns({
    statusCount: (["in-sale", "coming-soon", "limited-stock", "sold-out"] as const).reduce<Record<Ticket["status"], number>>((acc, status) => {
      acc[status] = tickets.reduce((count, item) => {
        if (item.status === status) {
          count += 1;
        }

        return count;
      }, 0);
      return acc;
    }, {} as Record<Ticket["status"], number>),
  });

  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>All tickets</CardTitle>

        <CardDescription>Manage all tickets of the event</CardDescription>
      </CardHeader>

      <CardContent className="px-4 md:px-6">
        {run(() => {
          // if (loading) {
          //   return (
          //     <DataTableSkeleton
          //       columnCount={7}
          //       filterCount={2}
          //       rowCount={9}
          //       cellWidths={[
          //         "10rem",
          //         "30rem",
          //         "10rem",
          //         "10rem",
          //         "6rem",
          //         "6rem",
          //         "6rem",
          //       ]}
          //       shrinkZero
          //     />
          //   );
          // }

          return <DataTable columns={columns} data={tickets} emptyIcon={TicketsIcon} emptySentence="No tickets yet" actionBarContent={<TicketsTableActionBar />} />;
        })}
      </CardContent>
    </Card>
  );
};
