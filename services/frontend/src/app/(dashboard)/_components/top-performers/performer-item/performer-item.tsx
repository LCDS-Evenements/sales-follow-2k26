import type { PerformerItemProps } from "./performer-item.type";
import type { Component } from "#/utils/react";
import { Badge, Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "#/react/ui";
import { run } from "#/utils/effect/run";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export const PerformerItem: Component<PerformerItemProps> = ({ label, change, rank, trend, unitsSold, amount }) => {
  return (
    <Item variant="outline" size="sm" className="bg-background rounded-lg">
      <div className="size-10 rounded-md bg-primary/20 flex items-center justify-center">
        <p className="font-bold font-mono text-primary text-xl">
          #

          {rank}
        </p>
      </div>

      <ItemContent className="gap-0.5">
        <ItemTitle className="font-semibold">{label}</ItemTitle>

        <ItemDescription>
          <span className="font-mono">{unitsSold}</span>

          {" "}

          units solds
        </ItemDescription>
      </ItemContent>

      <ItemActions className="flex flex-col items-end gap-0">
        <p className="font-bold text-base text-foreground font-mono">
          {amount}

          {" "}

          €
        </p>

        {run(() => {
          if (trend === "up") {
            return (
              <Badge className="mt-1 gap-1 text-green-700 dark:text-green-300 border-green-700 bg-green-700/10 dark:border-green-300 dark:bg-green-300/10 font-mono">
                <TrendingUpIcon className="h-3 w-3" />

                {change}

                %
              </Badge>
            );
          }

          return (
            <Badge className="mt-1 gap-1 text-destructive border-destructive bg-destructive/10 font-mono">
              <TrendingDownIcon className="h-3 w-3" />

              -

              {change}

              %
            </Badge>
          );
        })}
      </ItemActions>
    </Item>
  );
};
