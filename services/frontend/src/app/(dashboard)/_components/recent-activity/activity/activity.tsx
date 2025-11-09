import type { ActivityProps } from "./activity.type";
import type { Component } from "#/utils/react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "#/react/ui";
import { day } from "#/utils/day";
import { run } from "#/utils/effect/run";
import { ShoppingBasketIcon, SparklesIcon } from "lucide-react";

export const Activity: Component<ActivityProps> = ({ ago, label, type, amount, customer }) => {
  return (
    <Item variant="outline" size="sm" className="bg-background rounded-lg py-2 px-3 sm:py-3 sm:px-4">
      <div className="size-8 sm:size-10 rounded-md bg-primary/20 flex items-center justify-center">
        {run(() => {
          if (type === "purchased") {
            return <ShoppingBasketIcon className="text-primary size-4 sm:size-6" />;
          }

          return <SparklesIcon className="text-primary size-4 sm:size-6" />;
        })}
      </div>

      <ItemContent className="gap-0.5">
        <ItemTitle className="font-semibold max-w-72 truncate">
          [
          {label}
          ]

          {" "}

          {run(() => {
            if (type === "purchased") {
              return "has been purchased";
            }

            return "is sold out";
          })}
        </ItemTitle>

        {customer && <ItemDescription>{customer}</ItemDescription>}
      </ItemContent>

      <ItemActions className="flex flex-col items-end gap-0">
        {amount && (
          <p className="font-bold text-base text-foreground font-mono">
            {amount}

            {" "}

            €
          </p>
        )}

        <p className="text-muted-foreground">{day(ago).fromNow()}</p>
      </ItemActions>
    </Item>
  );
};
