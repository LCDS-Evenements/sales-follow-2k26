import type { AdminTabsTypeElement } from "../admin-sidebar.type";
import type { LucideIcon } from "@core-modules/ui-kit/icons";
import type { ForwardRefExoticComponent } from "react";

export type AdminSidebarLinkProps = {
  id: string;
  label: string;
  icon: LucideIcon | ForwardRefExoticComponent<{ size?: number }>;
  activeTab: string;
  handleTabChange: (tab: AdminTabsTypeElement) => void;
};
