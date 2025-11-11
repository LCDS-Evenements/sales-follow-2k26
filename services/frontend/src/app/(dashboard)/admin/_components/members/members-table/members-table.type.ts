export type Members = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: number;
  role: "manager" | "viewer";
  lastTimeConnected: number;
  active: boolean;
  slider: number;
};
