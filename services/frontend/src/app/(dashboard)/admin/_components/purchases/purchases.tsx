import type { Component } from "@core-modules/ui-kit/utils";
import { CompletedOrders } from "./completed-orders";
import { PurchasesHistory } from "./purchases-history";
import { TotalPurchases } from "./total-purchases";
import { TotalRevenue } from "./total-revenue";

export const Purchases: Component = () => {
  return (
    <div>
      <p className="font-semibold text-lg mb-4">Purchases</p>

      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TotalRevenue />

          <TotalPurchases />

          <CompletedOrders />
        </div>

        <PurchasesHistory />
      </div>
    </div>
  );
};
