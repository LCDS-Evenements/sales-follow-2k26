import type { Component } from "#/utils/react";
import { Card } from "#/react/ui";
import { CalendarIcon } from "lucide-react";

const EventDetails: Component = () => {
  return (
    <div className="flex items-center gap-2">
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary/20">
            <CalendarIcon size={12} className="text-primary" />
          </div>

          <p>hello world</p>
        </div>
      </Card>
    </div>
  );
};

export default EventDetails;
