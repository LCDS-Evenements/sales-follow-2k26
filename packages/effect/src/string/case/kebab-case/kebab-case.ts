export const toKebabCase = (string: string): string => {
  return string
    .replace(/([a-z])([A-Z])/gu, "$1-$2")
    .replace(/([A-Z])/gu, "-$1")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/gu, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+/gu, "")
    .replace(/-+$/gu, "");
};
