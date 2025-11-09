"use client";

import type { AdminSidebarProps, AdminTabsTypeElement } from "./admin-sidebar.type";
import type { Component } from "#/utils/react";
import { ADMIN_TABS } from "./admin-sidebar.config";
import { Button } from "#/react/ui";

export const AdminSidebar: Component<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-92px)]">
      <nav className="p-4 space-y-2">
        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "secondary"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab(tab.id as AdminTabsTypeElement)}
            >
              <Icon size={16} />

              {tab.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};
