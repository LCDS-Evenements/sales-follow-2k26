import type { MaybePromise } from "../maybe-promise";
import type { Result } from "./type";

export const error = <T, E>(error: E): Result<T, E> => {
  return { ok: false, error };
};

export const ok = <T, E>(value: T): Result<T, E> => {
  return { ok: true, value };
};

export const resultify = async<Return, Deps extends unknown[] = []>(
  fn: (...deps: Deps) => MaybePromise<Return>,
  deps: [...Deps] = [] as unknown as Deps,
): Promise<Result<Return, Error>> => {
  try {
    const result = await fn(...deps);

    return ok(result);
  }
  catch (err) {
    if (err instanceof Error) return error(err);
    if (err instanceof Object) return error(Error(JSON.stringify(err)));

    return error(Error(String(err)));
  }
};

export const safe = async<T>(fn: (...params: unknown[]) => MaybePromise<T>): Promise<void> => {
  try {
    await fn();
  }
  catch {
    // empty
  }
};
