import type { StatCardProps } from "./stat-card.type";
import type { Component } from "#/utils/react";
import { StatCardError } from "./stat-card.error";
import { StatCardSkeleton } from "./stat-card.skeleton";
import { Card, CardAction, CardFooter, CardHeader } from "#/react/ui";
import { run } from "#/utils/effect/run";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export const StatCard: Component<StatCardProps> = ({ label, icon, value, change, trend, unit, loading, error }) => {
  const CustomIcon = icon;

  if (loading) return <StatCardSkeleton label={label} icon={icon} />;

  if (error) return <StatCardError label={label} />;

  return (
    <Card className="w-full py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <CustomIcon size={22} className="text-primary" />
        </div>

        <CardAction className="flex items-center gap-2">
          {run(() => {
            if (trend === "up") {
              return <TrendingUpIcon size={18} className="dark:text-green-300 text-green-700" />;
            }

            return <TrendingDownIcon size={18} className="text-destructive" />;
          })}

          <span className="text-sm font-semibold font-mono">
            {run(() => {
              if (trend === "up") {
                return (
                  <>
                    +

                    {change}

                    %
                  </>
                );
              }

              return (
                <>
                  -

                  {change}

                  %
                </>
              );
            })}
          </span>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1 px-4 md:px-6">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="text-3xl font-bold font-mono text-foreground">
          {value}

          {unit === "money" && ("€")}
        </p>
      </CardFooter>
    </Card>
  );
};
