"use client";

import type { Component } from "@core-modules/ui-kit/utils";
import { Settings } from "./_components/settings";
import { MenuIcon } from "@core-modules/ui-kit/icons";
import { Button } from "@core-modules/ui-kit/ui";
import { AdminSidebar } from "#/react/components/sidebar";
import { AdminTabsType, type AdminTabsTypeElement } from "#/react/components/sidebar/admin";
import { useState } from "react";

const Admin: Component = () => {
  const [activeTab, setActiveTab] = useState<AdminTabsTypeElement>(AdminTabsType.Settings);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="min-h-[calc(100vh-92px)] flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} open={open} setOpen={setOpen} />

      <div className="flex-1 p-8">
        <Button variant="outline" className="mb-8 md:hidden flex" onClick={() => setOpen(true)}>
          <MenuIcon />

          Open menu
        </Button>

        {activeTab === AdminTabsType.Settings && <Settings />}
      </div>
    </div>
  );
};

export default Admin;
