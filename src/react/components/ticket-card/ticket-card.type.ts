export type TicketCardProps = {
  name: string;
  category?: string;
  value: number;
  maxValue: number;
  pourcentage: number;
  amount: number;
  state: "sold-out" | "coming-soon" | "in-sale" | "close-to-end";
  color: "red" | "pink" | "green" | "orange" | "cyan";
};
