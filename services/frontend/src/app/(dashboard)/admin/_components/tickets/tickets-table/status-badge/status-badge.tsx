import type { StatusBadgeProps } from "./status-badge.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { ClockIcon, FlameIcon, ShoppingBasketIcon, SparklesIcon } from "@core-modules/ui-kit/icons";
import { Badge } from "@core-modules/ui-kit/ui";

export const StatusBadge: Component<StatusBadgeProps> = ({ status }) => {
  if (status === "sold-out") {
    return (
      <Badge className="uppercase text-green-700 dark:text-green-300 border-green-700 bg-green-700/10 dark:border-green-300 dark:bg-green-300/10">
        <SparklesIcon />

        {status}
      </Badge>
    );
  }

  if (status === "limited-stock") {
    return (
      <Badge className="uppercase text-amber-700 dark:text-amber-300 border-amber-700 bg-amber-700/10 dark:border-amber-300 dark:bg-amber-300/10">
        <FlameIcon />

        {status}
      </Badge>
    );
  }

  if (status === "coming-soon") {
    return (
      <Badge className="uppercase text-neutral-700 dark:text-neutral-300 border-neutral-700 bg-neutral-700/10 dark:border-neutral-300 dark:bg-neutral-300/10">
        <ClockIcon />

        {status}
      </Badge>
    );
  }

  return (
    <Badge className="uppercase text-sky-700 dark:text-sky-300 border-sky-700 bg-sky-700/10 dark:border-sky-300 dark:bg-sky-300/10">
      <ShoppingBasketIcon />

      {status}
    </Badge>
  );
};
