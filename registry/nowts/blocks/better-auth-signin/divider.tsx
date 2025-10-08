import { cn } from "@/lib/utils";

type DividerProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Divider({ children, className }: DividerProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      {children && (
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            {children}
          </span>
        </div>
      )}
    </div>
  );
}
