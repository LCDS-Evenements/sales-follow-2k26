"use client";

import type { Component } from "#/utils/react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "#/react/ui";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export const RangePicker: Component = () => {
  const [dateRange, setDateRange] = useState("Last 7 days");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hidden sm:flex">
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarIcon />

          {dateRange}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setDateRange("Today")}>Today</DropdownMenuItem>

        <DropdownMenuItem onClick={() => setDateRange("Last 7 days")}>Last 7 days</DropdownMenuItem>

        <DropdownMenuItem onClick={() => setDateRange("Last 30 days")}>Last 30 days</DropdownMenuItem>

        <DropdownMenuItem onClick={() => setDateRange("Last 3 months")}>Last 3 months</DropdownMenuItem>

        <DropdownMenuItem onClick={() => setDateRange("All time")}>All time</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
