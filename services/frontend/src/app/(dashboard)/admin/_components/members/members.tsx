import type { Component } from "@core-modules/ui-kit/utils";
import { MembersTable } from "./members-table";

export const Members: Component = () => {
  return (
    <div>
      <p className="font-semibold text-lg mb-4">Members</p>

      <div className="grid grid-cols-1 gap-8">
        <MembersTable />
      </div>
    </div>
  );
};
