import { Badge, Button, InputGroup, InputGroupAddon, InputGroupInput } from "#/react/ui";
import { SearchIcon } from "lucide-react";

export const Tickets = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="leading-none font-semibold">Tickets sales</p>

        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />

            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <Button variant="outline">Filter</Button>
        </div>

        <div className="flex items-center gap-2">
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
    </div>
  );
};
