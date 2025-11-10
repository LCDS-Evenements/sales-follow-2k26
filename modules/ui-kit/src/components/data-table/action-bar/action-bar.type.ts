import type { Table } from "@tanstack/react-table";
import type { motion } from "motion/react";
import type { ComponentProps } from "react";

export type ActionBarProps<TData> = {
  table: Table<TData>;
  visible?: boolean;
  container?: Element | DocumentFragment | null;
} & ComponentProps<typeof motion.div>;
