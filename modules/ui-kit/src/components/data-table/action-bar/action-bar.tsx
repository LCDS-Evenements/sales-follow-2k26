"use client";

import type { ActionBarProps } from "./action-bar.type";
import { cn } from "@core-modules/ui-kit/utils";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export const ActionBar = <TData, _>({ table, visible: visibleProp, container: containerProp, children, className, ...props }: ActionBarProps<TData>) => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const container
    = containerProp ?? (mounted ? globalThis.document.body : null);

  if (!container) return null;

  const visible
    = visibleProp ?? table.getFilteredSelectedRowModel().rows.length > 0;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role="toolbar"
          aria-orientation="horizontal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm",
            className,
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    container,
  );
};
