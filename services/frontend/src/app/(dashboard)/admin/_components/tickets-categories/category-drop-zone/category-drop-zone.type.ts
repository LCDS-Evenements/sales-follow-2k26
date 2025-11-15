import type { Ticket } from "../../tickets/tickets-table/tickets-table.type";

export type CategoryDropZoneProps = {
  id: string;
  label: string;
  categoryTickets: string[];
  tickets: Ticket[];
  onDelete: (id: string) => void;
};
