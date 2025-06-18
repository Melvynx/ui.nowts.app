import { getDocs } from "./mdx";

export const getComponents = getDocs()
  .sort((a, b) => a.title.localeCompare(b.title))
  .filter((docs) => docs.type === "component");

export const getHooks = getDocs()
  .sort((a, b) => a.title.localeCompare(b.title))
  .filter((docs) => docs.type === "hook");

export const getBlocks = getDocs()
  .sort((a, b) => a.title.localeCompare(b.title))
  .filter((docs) => docs.type === "block");
