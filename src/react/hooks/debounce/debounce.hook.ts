import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a value by a specified delay.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - The value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds to debounce the value. Defaults to 500ms.
 * @returns {T} - The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 */

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
