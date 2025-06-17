import { CodeIcon, TerminalIcon } from "lucide-react";

import { getFileContent } from "@/lib/get-file-content";
import { cn } from "@/lib/utils";
import { CopyCode } from "./CopyCode";

type CodeBlockProps = {
  fileName?: string;
  copyCode?: boolean;
  contentClassName?: string;
  customFilePath?: string;
  simpleCode?: string;
} & React.ComponentProps<"div">;

export function CodeBlock({
  fileName,
  className,
  children,
  contentClassName,
  simpleCode,
  customFilePath,
  copyCode = true,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-neutral-300/50 bg-neutral-200/30 dark:border-neutral-800/60 dark:bg-neutral-900/40 not-prose mt-8",
        className
      )}
    >
      {fileName && copyCode && (
        <div className="relative flex h-10 items-center justify-between border-b border-neutral-300/50 bg-neutral-200/30 pl-4 pr-2.5 dark:border-neutral-800/60 dark:bg-neutral-900/30">
          <div className="flex items-center gap-2">
            {fileName === "Terminal" ? (
              <TerminalIcon
                size={14}
                className="text-neutral-500 dark:text-neutral-600"
              />
            ) : (
              <CodeIcon
                size={14}
                className="text-neutral-500 dark:text-neutral-600"
              />
            )}
            <span className="text-[13px] font-medium leading-none text-neutral-500">
              {fileName}
            </span>
          </div>
          {customFilePath ? (
            <CopyCode
              code={
                customFilePath
                  ? getFileContent(customFilePath, "")
                  : simpleCode
                  ? simpleCode
                  : getFileContent("app/_components/ui", fileName)
              }
            />
          ) : null}
        </div>
      )}
      <div className={cn("relative h-[350px] overflow-auto", contentClassName)}>
        <div className="min-w-max w-max p-4">{children}</div>
      </div>
    </div>
  );
}
