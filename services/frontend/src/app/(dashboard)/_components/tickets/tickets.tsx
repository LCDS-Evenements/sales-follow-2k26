"use client";

import type { TicketCardProps } from "#/react/components/ticket-card/ticket-card.type";
import { SearchIcon } from "@core-modules/ui-kit/icons";
import {
  Badge,
  Button,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@core-modules/ui-kit/ui";
import { TicketCard } from "#/react/components/ticket-card";
import { useDebounce } from "#/react/hooks/debounce";
import { useState } from "react";

const samples: TicketCardProps[] = [
  {
    name: "Early - Pass Vendredi",
    category: "Early",
    state: "limited-stock",
    value: 450,
    maxValue: 500,
    pourcentage: Math.round((450 / 500) * 100),
    amount: 20250,
    color: "red",
  },
  {
    name: "Early - Pass Samedi",
    category: "Early",
    state: "sold-out",
    value: 500,
    maxValue: 500,
    pourcentage: 100,
    amount: 22500,
    color: "red",
  },
  {
    name: "Early - Pass 2 Jours",
    category: "Early",
    state: "sold-out",
    value: 800,
    maxValue: 800,
    pourcentage: 100,
    amount: 64000,
    color: "red",
  },
  {
    name: "Regular - Pass Vendredi",
    category: "Regular",
    state: "in-sale",
    value: 680,
    maxValue: 1000,
    pourcentage: Math.round((680 / 1000) * 100),
    amount: 40800,
    color: "pink",
  },
  {
    name: "Regular - Pass Samedi",
    category: "Regular",
    state: "limited-stock",
    value: 820,
    maxValue: 1000,
    pourcentage: Math.round((820 / 1000) * 100),
    amount: 49200,
    color: "pink",
  },
  {
    name: "Regular - Pass 2 Jours",
    category: "Regular",
    state: "in-sale",
    value: 1350,
    maxValue: 1500,
    pourcentage: Math.round((1350 / 1500) * 100),
    amount: 135000,
    color: "pink",
  },
  {
    name: "Late - Pass Vendredi",
    category: "Late",
    state: "coming-soon",
    value: 0,
    maxValue: 800,
    pourcentage: 0,
    amount: 0,
    color: "green",
  },
  {
    name: "Late - Pass Samedi",
    category: "Late",
    state: "coming-soon",
    value: 0,
    maxValue: 800,
    pourcentage: 0,
    amount: 0,
    color: "green",
  },
  {
    name: "Late - Pass 2 Jours",
    category: "Late",
    state: "coming-soon",
    value: 0,
    maxValue: 1200,
    pourcentage: 0,
    amount: 0,
    color: "green",
  },
];

export const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = useDebounce(searchQuery, 200);

  const filtered = samples.filter((ticket) => ticket.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex justify-between items-center w-full">
        <p className="leading-none font-semibold">Tickets sales</p>

        <div className="flex items-center gap-4">
          <InputGroup>
            <InputGroupInput size={10} placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter (3)</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Category</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem checked>Early</DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem checked>Regular</DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem checked>Late</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="items-center gap-2 hidden sm:flex">
          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-chart-1" />

            Early Bird
          </Badge>

          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-chart-2" />

            Regular
          </Badge>

          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-chart-3" />

            Late
          </Badge>
        </div>
      </div>

      <div className="items-center gap-2 flex justify-end w-full sm:hidden">
        <Badge variant="outline" className="gap-1">
          <div className="h-2 w-2 rounded-full bg-chart-1" />

          Early Bird
        </Badge>

        <Badge variant="outline" className="gap-1">
          <div className="h-2 w-2 rounded-full bg-chart-2" />

          Regular
        </Badge>

        <Badge variant="outline" className="gap-1">
          <div className="h-2 w-2 rounded-full bg-chart-3" />

          Late
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {filtered.map((sample) => (
          <TicketCard
            key={sample.name}
            name={sample.name}
            category={sample.category}
            value={sample.value}
            maxValue={sample.maxValue}
            pourcentage={sample.pourcentage}
            amount={sample.amount}
            state={sample.state}
            color={sample.color}
          />
        ))}
      </div>
    </div>
  );
};
