import type { NotificationProps } from "./notification.type";
import type { Component } from "#/utils/react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "#/react/ui";
import { day } from "#/utils/day";
import { run } from "#/utils/effect/run";
import { CheckCircleIcon, ShoppingBagIcon, TriangleAlertIcon } from "lucide-react";

export const Notification: Component<NotificationProps> = ({ ago, label, type }) => {
  return (
    <Item variant="outline" size="sm" className="bg-background rounded-lg">
      {run(() => {
        if (type === "sold") {
          return (
            <div className="size-10 rounded-md bg-green-700/20 dark:bg-green-300/20 flex items-center justify-center">
              <ShoppingBagIcon size={22} className="text-green-700 dark:text-green-300" />
            </div>
          );
        }

        if (type === "limited-stock") {
          return (
            <div className="size-10 rounded-md bg-amber-700/20 dark:bg-amber-300/20 flex items-center justify-center">
              <TriangleAlertIcon size={22} className="text-amber-700 dark:text-amber-300" />
            </div>
          );
        }

        return (
          <div className="size-10 rounded-md bg-primary/20 flex items-center justify-center">
            <CheckCircleIcon size={22} className="text-primary" />
          </div>
        );
      })}

      <ItemContent className="gap-0.5">
        <ItemTitle className="font-semibold">
          {run(() => {
            if (type === "sold") {
              return `${String(label)} has been sold`;
            }

            if (type === "limited-stock") {
              return `${String(label)} limited stock alert`;
            }

            return `Reached the ${String(label)} total tickets sold`;
          })}
        </ItemTitle>

        <ItemDescription>{day(ago).fromNow()}</ItemDescription>
      </ItemContent>
    </Item>
  );
};
