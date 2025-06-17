"use client";

import { create } from "zustand";
import type { Docs } from "./mdx/docs";

type DocsStore = {
  docs: Docs[];
  setDocs: (docs: Docs[]) => void;
};

const useDocsStore = create<DocsStore>((set) => ({
  docs: [],
  setDocs: (docs) => set({ docs }),
}));

export function InjectDocs({ docs }: { docs: Docs[] }) {
  useDocsStore.getState().setDocs(docs);
  return null;
}

export const useDocs = () => useDocsStore((state) => state.docs);
