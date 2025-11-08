import type { Component } from "#/utils/react";

export const TailwindIndicator: Component = () => {
  if (process.env.NODE_ENV === "production") return <></>;

  return (
    <div className="fixed top-0 left-0 z-50 bg-primary text-white shadow-md px-2 rounded-br font-mono">
      <span className="sm:hidden">default</span>
      <span className="hidden sm:inline md:hidden">sm</span>
      <span className="hidden md:inline lg:hidden">md</span>
      <span className="hidden lg:inline xl:hidden">lg</span>
      <span className="hidden xl:inline">xl</span>
    </div>
  );
};
