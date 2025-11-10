import type { MaybePromise } from "../maybe-promise";

export const promiseLoop = <T, J, Deps extends unknown[]>(data: T[], callback: (data: T, deps: Deps) => Promise<J>, deps: [...Deps] = [] as unknown as Deps): Promise<J>[] => {
  return data.map(async (value) => callback(value, deps));
};

export const processBatch = async <T, Deps extends unknown[], Return>(
  items: T[],
  processor: (item: T, deps: Deps) => MaybePromise<Return>,
  batchSize = 10,
  deps: [...Deps] = [] as unknown as Deps,
) => {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchPromises = batch.map(async (item) => processor(item, deps));
    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);
  }

  return results;
};
