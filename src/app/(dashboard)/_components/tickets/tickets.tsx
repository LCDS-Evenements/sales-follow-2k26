import { Badge, Button, Card, CardAction, CardFooter, CardHeader, InputGroup, InputGroupAddon, InputGroupInput } from "#/react/ui";
import { SearchIcon, TicketIcon } from "lucide-react";

export const Tickets = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="leading-none font-semibold">Tickets sales</p>

        <div className="flex items-center gap-4">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />

            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <Button variant="outline">Filter (3)</Button>
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

      <div className="grid grid-cols-4 gap-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
              <TicketIcon size={22} className="text-primary" />
            </div>

            <CardAction className="flex items-center gap-2">
              hello world
            </CardAction>
          </CardHeader>

          <CardFooter className="flex-col items-start gap-1">
            <p className="text-sm text-muted-foreground">oui</p>

            <p className="text-3xl font-bold font-mono text-foreground">
              non
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
