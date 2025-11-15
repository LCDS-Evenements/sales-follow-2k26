"use client";

import type { Ticket } from "../tickets/tickets-table/tickets-table.type";
import type { TicketCategory } from "./tickets-categories.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { CategoryDropZone } from "./category-drop-zone";
import { DraggableTicket } from "./draggable-ticket";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@core-modules/ui-kit/ui";
import { run } from "@core-packages/effect";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";

const categoriesSample: TicketCategory[] = [
  {
    id: "a",
    label: "Early",
    tickets: ["a", "b", "c"],
  },
  {
    id: "b",
    label: "Regular",
    tickets: ["d", "e", "f"],
  },
  {
    id: "c",
    label: "Late",
    tickets: ["g", "h", "i"],
  },
];

const ticketsSample: Ticket[] = [
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

export const TicketsCategories: Component = () => {
  const [categories, setCategories] = useState<TicketCategory[]>(categoriesSample);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const getUnassignedTickets = () => {
    const assignedTicketIds = categories.flatMap((cat) => cat.tickets);
    return ticketsSample.filter((ticket) => !assignedTicketIds.includes(ticket.id));
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTicketId = String(active.id);
    const overCategoryId = String(over.id);

    setCategories((prev) => {
    // Trouver la catégorie source
      const sourceCategory = prev.find((cat) => cat.tickets.includes(activeTicketId));

      // Si c'est la même catégorie, ne rien faire
      if (sourceCategory?.id === overCategoryId) return prev;

      return prev.map((cat) => {
      // Retirer du source
        if (cat.id === sourceCategory?.id) {
          return {
            ...cat,
            tickets: cat.tickets.filter((t) => t !== activeTicketId),
          };
        }

        // Ajouter à la destination
        if (cat.id === overCategoryId && !cat.tickets.includes(activeTicketId)) {
          return {
            ...cat,
            tickets: [...cat.tickets, activeTicketId],
          };
        }

        return cat;
      });
    });
  };

  return (
    <div>
      <p className="font-semibold text-lg mb-4">Tickets categories</p>

      <div className="grid grid-cols-1 gap-8">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold">Drag and Drop Tickets to Categories</h3>

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Unassigned Tickets</CardTitle>

                <CardDescription className="text-xs md:text-sm">Drag tickets here to remove from categories</CardDescription>
              </CardHeader>

              <CardContent>
                <SortableContext items={getUnassignedTickets().map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="min-h-24 md:min-h-32 bg-background rounded-lg border-2 border-dashed border-primary/30 p-3 md:p-4 space-y-2 transition-colors hover:border-primary/50 hover:bg-primary/10">
                    {run(() => {
                      if (getUnassignedTickets().length === 0) {
                        return <div className="h-full flex items-center justify-center text-muted-foreground text-xs md:text-sm">All tickets are assigned to categories</div>;
                      }

                      return getUnassignedTickets().map((ticket) => <DraggableTicket key={ticket.id} id={ticket.id} label={ticket.label} amount={ticket.amount} />);
                    })}
                  </div>
                </SortableContext>

                <p className="text-xs text-muted-foreground mt-2">
                  {getUnassignedTickets().length}

                  {" "}

                  ticket(s) unassigned
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => {
                const categoryTickets = ticketsSample.filter((t) => category.tickets.includes(t.id));

                return (
                  <CategoryDropZone
                    key={category.id}
                    id={category.id}
                    label={category.label}
                    categoryTickets={category.tickets}
                    tickets={categoryTickets}
                    onDelete={handleDelete}
                  />
                );
              })}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};
