export type Entries<T> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T][];

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: JSONValue }
  | JSONValue[];
