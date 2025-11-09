import type { SetState } from "#/utils/react";

export type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: SetState<AdminTabsTypeElement>;
};

export const AdminTabsType = {
  Settings: "settings",
  Members: "members",
  Purchases: "purchases",
  TicketCategories: "categories",
  Tickets: "tickets",
} as const;

export type AdminTabsTypeElement = typeof AdminTabsType[keyof typeof AdminTabsType];
