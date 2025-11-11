import type { HTMLAttributes } from "react";

export type UsersIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedUsersIconProps = {
  "size"?: number;
  "data-hovered"?: boolean;
} & HTMLAttributes<HTMLDivElement>;
