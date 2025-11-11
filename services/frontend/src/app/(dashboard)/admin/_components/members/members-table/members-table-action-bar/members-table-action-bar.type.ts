import type { Member } from "../members-table.type";
import type { Table } from "@tanstack/react-table";

export type MembersTableActionBarProps = {
  table?: Table<Member>;
};
