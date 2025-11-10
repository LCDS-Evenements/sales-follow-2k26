import type { ActionBarActionProps } from "./action-bar-action.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../../../../ui";
import { LoaderIcon } from "@core-modules/ui-kit/icons";
import { cn } from "@core-modules/ui-kit/utils";

export const ActionBarAction: Component<ActionBarActionProps> = ({ size = "sm", tooltip, isPending, disabled, className, children, ...props }) => {
  const trigger = (
    <Button
      variant="outline"
      size={size}
      className={cn(
        "gap-1.5 [&>svg]:size-3.5 bg-neutral-100 hover:bg-neutral-200",
        size === "icon" ? "size-7" : "h-7",
        className,
      )}
      disabled={disabled || isPending}
      {...props}
    >
      {isPending ? <LoaderIcon className="animate-spin" /> : children}
    </Button>
  );

  if (!tooltip) return trigger;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>

      <TooltipContent sideOffset={6} className="border bg-accent font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
