import { getDocs } from "./mdx";

export const getComponents = getDocs({ skip: true })
  .sort((a, b) => a.title?.localeCompare(b.title))
  .filter((docs) => docs.type === "component");

export const getHooks = getDocs({ skip: true })
  .sort((a, b) => a.title?.localeCompare(b.title))
  .filter((docs) => docs.type === "hook");

export const getBlocks = getDocs({ skip: true })
  .sort((a, b) => a.title?.localeCompare(b.title))
  .filter((docs) => docs.type === "block");
