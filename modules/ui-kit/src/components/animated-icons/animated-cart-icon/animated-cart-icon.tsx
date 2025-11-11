"use client";

/**
 *
 * Based on icons on this website
 * @url https://icons.pqoqubbw.dev/?q=cart
 *
 */

import type { AnimatedCartIconProps, CartIconHandle } from "./animated-cart-icon.type";
import type { Variants } from "motion/react";
import type { RefObject, MouseEvent } from "react";
import { cn } from "../../../utils";
import { motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";

const cartVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: 1.1,
    y: [0, -5, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      y: { repeat: 1, delay: 0.1, duration: 0.4 },
    },
  },
};

const AnimatedCartIcon = ({ ref, onMouseEnter, onMouseLeave, className, size, "data-hovered": hovered, ...props }: AnimatedCartIconProps & { ref?: RefObject<CartIconHandle | null> }) => {
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={cartVariants}
        animate={controls}
        transition={{ duration: 0.2 }}
      >
        <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" />
      </motion.svg>
    </div>
  );
};

AnimatedCartIcon.displayName = "AnimatedCartIcon";

export { AnimatedCartIcon };
