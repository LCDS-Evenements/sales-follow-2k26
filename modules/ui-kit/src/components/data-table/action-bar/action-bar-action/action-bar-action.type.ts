import type { Button } from "../../../../ui";
import type { ComponentProps } from "react";

export type ActionBarActionProps = {
  tooltip?: string;
  isPending?: boolean;
} & ComponentProps<typeof Button>;
