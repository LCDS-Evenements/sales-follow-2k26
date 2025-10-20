export type TimeRemainingProps = {
  date: Date;
};

export type TimeRemainingType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const State = {
  Before: "before",
  Live: "live",
  After: "after",
} as const;

export type StateType = typeof State[keyof typeof State];
