export type ActivityProps = {
  type: "purchased" | "sold-out";
  label: string;
  customer?: string;
  amount?: number;
  ago: Date;
};
