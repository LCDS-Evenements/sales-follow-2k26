import type { SetState } from "@core-modules/ui-kit/utils";

export type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: SetState<AdminTabsTypeElement>;
  open: boolean;
  setOpen: SetState<boolean>;
};

export const AdminTabsType = {
  Settings: "settings",
  Members: "members",
  Purchases: "purchases",
  TicketCategories: "categories",
  Tickets: "tickets",
} as const;

export type AdminTabsTypeElement = typeof AdminTabsType[keyof typeof AdminTabsType];
