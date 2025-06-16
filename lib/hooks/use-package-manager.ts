import { create } from "zustand";
import { persist } from "zustand/middleware";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

type PackageManagerStore = {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
};

const usePackageManagerStore = create<PackageManagerStore>()(
  persist(
    (set) => ({
      packageManager: "npm",
      setPackageManager: (pm) => set({ packageManager: pm }),
    }),
    { name: "packageManager" }
  )
);

export function usePackageManager() {
  const { packageManager, setPackageManager } = usePackageManagerStore();
  return [packageManager, setPackageManager] as const;
}
