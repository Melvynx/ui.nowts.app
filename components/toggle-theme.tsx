"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Icons } from "./Icons";

export function ToggleTheme() {
  const { setTheme, resolvedTheme: theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative flex size-8 rounded-full items-center justify-center outline-none",
        "focus-visible:ring-1 focus-visible:ring-neutral-300/80 dark:focus-visible:ring-neutral-800 bg-background",
        "border border-border/60 dark:border-border/50 dark:hover:bg-main-foreground/20 dark:hover:border-white/10",
        "focus-visible:ring-1 focus-visible:ring-neutral-300/80 dark:focus-visible:ring-neutral-800 ease-linear duration-150"
      )}
    >
      <Icons.lamp />
    </button>
  );
}
