import type { Component } from "#/utils/react";
import { } from "@radix-ui/react-dropdown-menu";
import { Button } from "#/react/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "#/react/ui/dropdown-menu";
import { CalendarIcon } from "lucide-react";

export const RangePicker: Component = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarIcon />

          Last 7 days
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
