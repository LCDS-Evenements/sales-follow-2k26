import type { CategoryDropZoneProps } from "./category-drop-zone.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { DraggableTicket } from "../draggable-ticket";
import { EllipsisIcon, PenIcon, TrashIcon } from "@core-modules/ui-kit/icons";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@core-modules/ui-kit/ui";
import { run } from "@core-packages/effect";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export const CategoryDropZone: Component<CategoryDropZoneProps> = ({ id, label, categoryTickets, onDelete, tickets }) => {
  const sortable = useDroppable({ id, data: { type: "Category" } });

  return (
    <Card className="py-4 md:py-6" ref={sortable.setNodeRef}>
      <CardHeader className="px-4 md:px-6">
        <div className="flex justify-between">
          <div className="min-w-0">
            <CardTitle>{label}</CardTitle>
          </div>

          <div className="flex gap-1 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex size-7 p-0">
                  <EllipsisIcon size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <PenIcon />

                  Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" onClick={() => onDelete(id)}>
                  <TrashIcon />

                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 md:px-6 flex-1">
        <SortableContext items={categoryTickets} strategy={verticalListSortingStrategy}>
          <div
            className={`min-h-48 md:min-h-64 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25 p-3 md:p-4 space-y-2 transition-colors ${
              sortable.isOver ? "border-primary bg-primary/10" : "hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {run(() => {
              if (tickets.length === 0) {
                return <div className="h-full flex items-center justify-center text-muted-foreground text-xs md:text-sm">Drag tickets here</div>;
              }

              return tickets.map((ticket) => <DraggableTicket key={ticket.id} label={ticket.label} amount={ticket.amount} id={ticket.id} />);
            })}
          </div>
        </SortableContext>

        <p className="text-xs text-muted-foreground mt-2">
          {tickets.length}

          {" "}

          ticket(s)
        </p>
      </CardContent>
    </Card>
  );
};
