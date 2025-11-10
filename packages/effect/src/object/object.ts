import type { Entries, JSONValue } from "./type";

export const surroundKeys = <T extends Record<string, unknown>>(object: T, prefix: string, suffix: string): T => {
  const newObject: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(object)) {
    newObject[`${prefix}${key}${suffix}`] = value;
  }

  return newObject as T;
};

export const hasSameProperties = (reference: object, comparaison: object): boolean => {
  for (const [key, value] of Object.entries(reference)) {
    if (!Object.hasOwn(comparaison, key)) return false;
    if (value !== comparaison[key as keyof typeof comparaison]) return false;
  }

  return true;
};

export const getObjectEntries = <T extends object>(object: T): Entries<T> => {
  return Object.entries(object) as Entries<T>;
};

export const unorderedValue = <T extends JSONValue>(value: T): T => {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((value) => unorderedValue(value)).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) as T;
  }

  const ordered = [];
  for (const [key, objectValue] of Object.entries(value).sort(([key1], [key2]) => key1 > key2 ? 1 : -1)) {
    ordered.push([
      key,
      unorderedValue(objectValue),
    ]);
  }

  return Object.fromEntries(ordered) as T;
};