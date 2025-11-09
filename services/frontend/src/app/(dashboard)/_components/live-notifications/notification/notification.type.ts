export type NotificationProps = {
  type: "sold" | "limited-stock" | "reached";
  label: string | number;
  ago: Date;
};
