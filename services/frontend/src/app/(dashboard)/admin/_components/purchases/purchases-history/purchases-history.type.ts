export type Purchase = {
  orderID: string;
  customer: string;
  email: string;
  ticket: string;
  quantity: number;
  amount: number;
  purchasedAt: number;
  status: "completed" | "pending" | "refunded";
};
