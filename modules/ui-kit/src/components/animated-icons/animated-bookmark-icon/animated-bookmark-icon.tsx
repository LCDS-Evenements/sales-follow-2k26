"use client";

/**
 *
 * Based on icons on this website
 * @url https://icons.pqoqubbw.dev/?q=bookmark
 *
 */

import type { AnimatedBookmarkIconProps, BookmarkIconHandle } from "./animated-bookmark-icon.type";
import type { Variants } from "motion/react";
import type { RefObject, MouseEvent } from "react";
import { cn } from "../../../utils";
import { motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";

const BOOKMARK_VARIANTS: Variants = {
  normal: { scaleY: 1, scaleX: 1 },
  animate: {
    scaleY: [1, 1.3, 0.9, 1.05, 1],
    scaleX: [1, 0.9, 1.1, 0.95, 1],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AnimatedBookmarkIcon = ({ ref, className, size, onMouseEnter, onMouseLeave, "data-hovered": hovered, ...props }: AnimatedBookmarkIconProps & { ref?: RefObject<BookmarkIconHandle | null> }) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => void controls.start("animate"),
      stopAnimation: () => void controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        void controls.start("animate");
      }
      else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        void controls.start("normal");
      }
      else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave],
  );

  useEffect(() => {
    if (hovered) {
      void controls.start("animate");

      return;
    }

    void controls.start("normal");
  }, [hovered, controls]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
          animate={controls}
          variants={BOOKMARK_VARIANTS}
          style={{ originY: 0.5, originX: 0.5 }}
        />
      </svg>
    </div>
  );
};

AnimatedBookmarkIcon.displayName = "AnimatedBookmarkIcon";

export { AnimatedBookmarkIcon };
