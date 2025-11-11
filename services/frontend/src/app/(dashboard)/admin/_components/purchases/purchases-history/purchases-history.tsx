import type { Purchase } from "./purchases-history.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { getPurchasesColumns } from "./purchases-history.columns";
import { DataTable } from "@core-modules/ui-kit/components";
import { PackageIcon } from "@core-modules/ui-kit/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@core-modules/ui-kit/ui";
import { run } from "@core-packages/effect";

const purchases: Purchase[] = [
  {
    orderID: "a",
    customer: "Hugo CAMPOS",
    email: "hugo.campos@cuicuitedays.fr",
    ticket: "Early - Pass Vendredi",
    quantity: 2,
    amount: 90,
    purchasedAt: Date.now(),
    status: "completed",
  },
  {
    orderID: "b",
    customer: "Camille DUGAS",
    email: "camille.dugas@cuicuitedays.fr",
    ticket: "Early - Pass Samedi",
    quantity: 1,
    amount: 45,
    purchasedAt: Date.now(),
    status: "completed",
  },
  {
    orderID: "c",
    customer: "Margot BAILLY",
    email: "margot.bailly@cuicuitedays.fr",
    ticket: "Regular - Pass 2 Jours",
    quantity: 1,
    amount: 50,
    purchasedAt: Date.now(),
    status: "pending",
  },
  {
    orderID: "d",
    customer: "Romain RICHARD",
    email: "romain.richard@cuicuitedays.fr",
    ticket: "Early - Pass Vendredi",
    quantity: 1,
    amount: 45,
    purchasedAt: Date.now(),
    status: "refunded",
  },
];

export const PurchasesHistory: Component = () => {
  const columns = getPurchasesColumns();

  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Purchase history</CardTitle>

        <CardDescription>Manage all customer purchases</CardDescription>
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

          return <DataTable columns={columns} data={purchases} emptyIcon={PackageIcon} emptySentence="No purchases yet" />;
        })}
      </CardContent>
    </Card>
  );
};
