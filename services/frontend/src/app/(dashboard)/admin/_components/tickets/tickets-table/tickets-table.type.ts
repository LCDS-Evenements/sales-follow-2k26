export type Ticket = {
  id: string;
  label: string;
  category: string;
  amount: number;
  capacity: number;
  ticketsSold: number;
  pourcentage: number;
  status: "limited-stock" | "sold-out" | "coming-soon" | "in-sale";
};
