import type { HTMLAttributes } from "react";

export type BookmarkIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedBookmarkIconProps = {
  "size"?: number;
  "data-hovered": boolean;
} & HTMLAttributes<HTMLDivElement>;
