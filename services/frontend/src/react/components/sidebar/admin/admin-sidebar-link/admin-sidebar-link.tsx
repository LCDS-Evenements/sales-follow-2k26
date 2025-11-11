"use client";

import type { AdminTabsTypeElement } from "../admin-sidebar.type";
import type { AdminSidebarLinkProps } from "./admin-sidebar-link.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { Button } from "@core-modules/ui-kit/ui";
import { useState } from "react";

export const AdminSidebarLink: Component<AdminSidebarLinkProps> = ({ activeTab, handleTabChange, icon, id, label }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const Icon = icon;

  return (
    <Button
      key={id}
      variant={activeTab === id ? "default" : "secondary"}
      className="w-full justify-start gap-2"
      onClick={() => handleTabChange(id as AdminTabsTypeElement)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={16} data-hovered={hovered} />

      <span className="truncate">{label}</span>
    </Button>
  );
};
