import type { TicketCardProps } from "./ticket-card.type";
import type { Component } from "#/utils/react";
import { Badge, Card, CardAction, CardContent, CardFooter, CardHeader, Progress } from "#/react/ui";
import { run } from "#/utils/effect/run";
import { cn } from "#/utils/style";
import { ClockIcon, FlameIcon, SparklesIcon, TicketIcon } from "lucide-react";

export const TicketCard: Component<TicketCardProps> = ({ name, category, value, maxValue, pourcentage, amount, state, color }) => {
  const colorVariants = {
    red: { bg: "bg-chart-1/20", text: "text-chart-1" },
    pink: { bg: "bg-chart-2/20", text: "text-chart-2" },
    green: { bg: "bg-chart-3/20", text: "text-chart-3" },
    orange: { bg: "bg-chart-4/20", text: "text-chart-4" },
    cyan: { bg: "bg-chart-5/20", text: "text-chart-5" },
  };

  return (
    <Card className={cn("w-full gap-4 py-4 md:py-6", state === "coming-soon" && "opacity-50")}>
      <CardHeader className="px-4 md:px-6">
        <div className={cn("flex size-9 items-center justify-center rounded-lg", colorVariants[color].bg)}>
          <TicketIcon size={22} className={cn(colorVariants[color].text)} />
        </div>

        <CardAction className="flex items-center gap-2">
          {run(() => {
            if (state === "sold-out") {
              return (
                <Badge variant="outline" className="relative rounded-md border-none font-semibold bg-primary/40">
                  <SparklesIcon />

                  Sold out

                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/40 to-transparent animate-shimmer" />
                </Badge>
              );
            }

            if (state === "limited-stock") {
              return (
                <Badge variant="outline" className="relative rounded-md border-none font-semibold bg-amber-500/40">
                  <FlameIcon />

                  Limited stock

                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/40 to-transparent animate-shimmer" />
                </Badge>
              );
            }

            if (state === "coming-soon") {
              return (
                <Badge variant="outline" className="rounded-md border-none font-semibold bg-linear-to-l! from-neutral-500 to-neutral-500/40">
                  <ClockIcon />

                  Coming soon
                </Badge>
              );
            }

            return null;
          })}

        </CardAction>
      </CardHeader>

      <CardContent className="px-4 md:px-6">
        <p className="font-semibold text-lg">{name}</p>

        {category && <span className="text-sm text-muted-foreground">{category}</span>}
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 px-4 md:px-6">
        <div className="flex items-center justify-between w-full">
          <p className="text-muted-foreground">Sales</p>

          <span className="font-mono font-semibold">
            {value}

            {" "}

            /

            {" "}

            {maxValue}
          </span>
        </div>

        <Progress value={pourcentage} />

        <div className="flex items-center justify-between w-full mt-2">
          <p className="font-semibold font-mono">
            {pourcentage}

            %
          </p>

          <span className="font-mono font-semibold text-primary">
            {amount}

            €
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
