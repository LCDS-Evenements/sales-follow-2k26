export const run = <Deps extends unknown[], Return>(fn: (...deps: Deps) => Return, deps: [...Deps] = [] as unknown as Deps): Return => {
  return fn(...deps);
};
