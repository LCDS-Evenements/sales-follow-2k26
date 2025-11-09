export const range = (size: number, startAt = 0, step = 1): number[] => {
  const array: number[] = [];

  for (let i = startAt; i < size; i += step) {
    array.push(i);
  }

  return array;
};
