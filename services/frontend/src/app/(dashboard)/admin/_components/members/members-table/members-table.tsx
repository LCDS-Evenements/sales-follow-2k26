"use client";

import type { Members } from "./members-table.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { getMembersColumns } from "./members-table.columns";
import { DataTable } from "@core-modules/ui-kit/components";
import { UsersIcon } from "@core-modules/ui-kit/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@core-modules/ui-kit/ui";
import { run } from "@core-packages/effect";

const members: Members[] = [
  {
    id: "a",
    firstname: "Hugo",
    lastname: "CAMPOS",
    email: "hugo.campos@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "manager",
  },
  {
    id: "b",
    firstname: "Sophie",
    lastname: "MARTIN",
    email: "sophie.martin@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "c",
    firstname: "Thomas",
    lastname: "DUBOIS",
    email: "thomas.dubois@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "d",
    firstname: "Marie",
    lastname: "ROUSSEAU",
    email: "marie.rousseau@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "e",
    firstname: "Lucas",
    lastname: "BERNARD",
    email: "lucas.bernard@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "f",
    firstname: "Emma",
    lastname: "PETIT",
    email: "emma.petit@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "g",
    firstname: "Nathan",
    lastname: "ROBERT",
    email: "nathan.robert@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "h",
    firstname: "Léa",
    lastname: "RICHARD",
    email: "lea.richard@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "i",
    firstname: "Antoine",
    lastname: "DURAND",
    email: "antoine.durand@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "j",
    firstname: "Chloé",
    lastname: "MOREAU",
    email: "chloe.moreau@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "k",
    firstname: "Maxime",
    lastname: "SIMON",
    email: "maxime.simon@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "l",
    firstname: "Camille",
    lastname: "LAURENT",
    email: "camille.laurent@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "m",
    firstname: "Arthur",
    lastname: "MICHEL",
    email: "arthur.michel@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "n",
    firstname: "Julie",
    lastname: "LEFEVRE",
    email: "julie.lefevre@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
  {
    id: "o",
    firstname: "Alexandre",
    lastname: "GARNIER",
    email: "alexandre.garnier@cuicuitedays.fr",
    createdAt: Date.now(),
    lastTimeConnected: Date.now(),
    role: "viewer",
  },
];

export const MembersTable: Component = () => {
  const columns = getMembersColumns();

  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Team members</CardTitle>

        <CardDescription>Manage your members</CardDescription>
      </CardHeader>

      <CardContent className="px-4 md:px-6">
        {run(() => {
          // if (loading) {
          //   return (
          //     <DataTableSkeleton
          //       columnCount={7}
          //       filterCount={2}
          //       rowCount={9}
          //       cellWidths={[
          //         "10rem",
          //         "30rem",
          //         "10rem",
          //         "10rem",
          //         "6rem",
          //         "6rem",
          //         "6rem",
          //       ]}
          //       shrinkZero
          //     />
          //   );
          // }

          return <DataTable columns={columns} data={members} emptyIcon={UsersIcon} emptySentence="No members yet" />;
        })}
      </CardContent>
    </Card>
  );
};
