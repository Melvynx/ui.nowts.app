"use client";

import { useMemo } from "react";

import { usePackageManager } from "@/lib/hooks/use-package-manager";
import { cn } from "@/lib/utils";
import { CopyCode } from "./CopyCode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

type CommandBlockProps = {
  npmCommand: string;
  yarnCommand: string;
  pnpmCommand: string;
  bunCommand: string;
} & React.ComponentProps<"div">;

export function CommandBlock({
  npmCommand,
  yarnCommand,
  pnpmCommand,
  bunCommand,
  className,
}: CommandBlockProps) {
  const [packageManager, setPackageManager] = usePackageManager();

  const tabs = useMemo(() => {
    return {
      npm: npmCommand,
      pnpm: pnpmCommand,
      yarn: yarnCommand,
      bun: bunCommand,
    };
  }, [npmCommand, pnpmCommand, yarnCommand, bunCommand]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-neutral-300/50 bg-neutral-200/30 dark:border-neutral-800/60 dark:bg-neutral-900/40 not-prose mt-8",
        className
      )}
    >
      <Tabs
        defaultValue="npm"
        value={packageManager}
        onValueChange={(value) => setPackageManager(value as PackageManager)}
      >
        <div className="flex items-center justify-between border-b border-neutral-300/50 bg-neutral-200/30 pr-2.5 dark:border-neutral-800/60 dark:bg-neutral-900/30">
          <TabsList className="bg-transparent h-10 pl-4">
            {Object.entries(tabs).map(([key, _]) => (
              <TabsTrigger
                key={key}
                value={key}
                // classNameIndicator="-bottom-[1.5px]"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          <CopyCode code={tabs[packageManager]} />
        </div>
        <div className="relative overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => (
            <TabsContent key={key} value={key}>
              <pre className="px-4 pb-4">
                <code
                  className="relative font-mono text-sm leading-none !text-primary"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
