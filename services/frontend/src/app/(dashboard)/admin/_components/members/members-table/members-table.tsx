import type { Component } from "@core-modules/ui-kit/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@core-modules/ui-kit/ui";

export const MembersTable: Component = () => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Team members</CardTitle>

        <CardDescription>Manage your members</CardDescription>
      </CardHeader>

      <CardContent className="px-4 md:px-6">
        hello world
      </CardContent>
    </Card>
  );
};
