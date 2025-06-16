import { getDocs } from "./mdx";

export const getComponents = getDocs().sort((a, b) =>
  a.title.localeCompare(b.title)
);
