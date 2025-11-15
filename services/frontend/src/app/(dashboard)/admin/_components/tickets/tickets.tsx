import type { Component } from "@core-modules/ui-kit/utils";
import { TicketsTable } from "./tickets-table";

export const Tickets: Component = () => {
  return (
    <div>
      <p className="font-semibold text-lg mb-4">Tickets</p>

      <div className="grid grid-cols-1 gap-8">
        <TicketsTable />
      </div>
    </div>
  );
};
