// @see https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/composeRefs.tsx

import { useCallback, type RefObject, type Ref } from "react";

type PossibleRef<T> = Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
export const setRef = <T, _>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === "function") {
    ref(value);
  }
  else if (ref !== null && ref !== undefined) {
    (ref as RefObject<T>).current = value;
  }
};

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
export const composeRefs = <T, _>(...refs: PossibleRef<T>[]) => {
  return (node: T) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
};

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
export const useComposedRefs = <T, _>(...refs: PossibleRef<T>[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
};
