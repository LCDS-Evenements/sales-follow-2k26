"use client";

import type { ClipboardHookType } from "./clipboard.type";
import { useState } from "react";

/**
 *
 * Copy to clipboard hook base on this:
 * @url https://github.com/shadcn-ui/ui/blob/c02d00aafc4a508ce534d7d0bea401a371d2a278/apps/v4/hooks/use-copy-to-clipboard.ts#L5
 */

export const useCopyToClipboard = ({ timeout = 2000, onCopy }: ClipboardHookType = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined") {
      return;
    }

    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      if (onCopy) {
        onCopy();
      }

      if (timeout !== 0) {
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      }
    }, console.error);
  };

  return { isCopied, copyToClipboard };
};
