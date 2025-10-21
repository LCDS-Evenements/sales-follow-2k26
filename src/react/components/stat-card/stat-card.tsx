import type { StatCardProps } from "./stat-card.type";
import type { Component } from "#/utils/react";
import { Button, Card, CardAction, CardFooter, CardHeader, Skeleton } from "#/react/ui";
import { run } from "#/utils/effect/run";
import { RefreshCwIcon, TrendingDownIcon, TrendingUpIcon, TriangleAlertIcon } from "lucide-react";

export const StatCard: Component<StatCardProps> = ({ label, icon, value, change, trend, unit, loading, error }) => {
  const CustomIcon = icon;

  if (loading) return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <CustomIcon size={22} className="text-primary" />
        </div>

        <CardAction className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <Skeleton className="h-9 w-40" />
      </CardFooter>
    </Card>
  );

  if (error) return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/20">
          <TriangleAlertIcon size={22} className="text-destructive" />
        </div>

        <CardAction className="flex items-center gap-2">
          <span className="text-sm font-semibold font-mono text-destructive">ERROR</span>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <div className="flex items-center justify-between w-full">
          <p className="text-base text-destructive">Failed to load data</p>

          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCwIcon size={14} />

            Retry
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <CustomIcon size={22} className="text-primary" />
        </div>

        <CardAction className="flex items-center gap-2">
          {run(() => {
            if (trend === "up") {
              return <TrendingUpIcon size={18} className="text-green-500" />;
            }

            return <TrendingDownIcon size={18} className="text-red-500" />;
          })}

          <span className="text-sm font-semibold font-mono">
            {run(() => {
              if (trend === "up") {
                return (
                  <>
                    +

                    {change}
                  </>
                );
              }

              return (
                <>
                  -

                  {change}
                </>
              );
            })}
          </span>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="text-3xl font-bold font-mono text-foreground">
          {value}

          {unit === "money" && ("€")}
        </p>
      </CardFooter>
    </Card>
  );
};
