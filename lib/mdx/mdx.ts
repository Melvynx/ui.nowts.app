import fs from "fs";
import path from "path";

import matter from "gray-matter";
import type { Docs } from "./docs";

function readFile(filePath: string): Docs | null {
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);

    const slug = path.basename(filePath, path.extname(filePath));

    return {
      ...data,
      slug,
      content,
    } as Docs;
  } catch (error) {
    console.error(`Failed to read or parse the file at ${filePath}:`, error);
    return null;
  }
}

function getFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Failed to read directory at ${dir}:`, error);
    return [];
  }
}

export function getDocs({
  directory,
  skip,
}: { directory?: string; skip?: boolean } = {}): Docs[] {
  const files = getFiles(
    path.join(process.cwd(), "app", "_docs", ...(directory ? [directory] : []))
  );

  const docs = files
    .map((file) =>
      readFile(
        path.join(
          process.cwd(),
          "app",
          "_docs",
          ...(directory ? [directory] : []),
          file
        )
      )
    )
    .filter((docs): docs is Docs => docs !== null);

  if (skip) {
    return docs.filter((docs) => !docs.skip);
  }

  return docs;
}
