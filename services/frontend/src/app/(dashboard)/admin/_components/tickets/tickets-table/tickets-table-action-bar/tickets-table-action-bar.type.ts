import type { Ticket } from "../tickets-table.type";
import type { Table } from "@tanstack/react-table";

export type TicketsTableActionBarProps = {
  table?: Table<Ticket>;
};
