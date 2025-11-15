"use client";

import type { DraggableTicketProps } from "./draggable-ticket.typte";
import type { Component } from "@core-modules/ui-kit/utils";
import { GripVerticalIcon } from "@core-modules/ui-kit/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const DraggableTicket: Component<DraggableTicketProps> = ({ amount, id, label }) => {
  const sortable = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
    opacity: sortable.isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      {...sortable.attributes}
      {...sortable.listeners}
      className="flex items-center gap-2 p-2 md:p-3 border rounded-md cursor-grab active:cursor-grabbing transition-all hover:shadow-md"
    >
      <GripVerticalIcon size={16} className="text-muted-foreground shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-sm font-medium truncate">{label}</p>

        <p className="text-xs text-muted-foreground font-mono">
          {amount}

          {" "}

          €
        </p>
      </div>
    </div>
  );
};
