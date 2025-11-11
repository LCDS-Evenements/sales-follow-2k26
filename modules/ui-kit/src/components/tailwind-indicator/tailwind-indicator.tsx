import type { Component } from "@core-modules/ui-kit/utils";

export const TailwindIndicator: Component = () => {
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
