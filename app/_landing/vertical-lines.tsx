import { cn } from "@/lib/utils";

export function VerticalLines(props: { width?: number; className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 left-1/2 -translate-x-1/2 max-w-full w-full sm:w-6xl z-10 pointer-events-none",
        props.className
      )}
      style={{
        width: props.width ? `${props.width}px` : undefined,
      }}
      aria-hidden="true"
    >
      {/* Left side */}
      <div className="before:absolute before:inset-y-0 before:left-0 before:border-l before:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.4),transparent)1] dark:before:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.16),transparent)1] before:shadow-[-1px_0_0_0_--theme(--color-white/.2)] dark:before:shadow-none after:absolute after:inset-y-0 after:left-20 after:border-l after:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.4),transparent)1] dark:after:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.16),transparent)1] after:shadow-[-1px_0_0_0_--theme(--color-white/.2)] dark:after:shadow-none lg:block hidden"></div>
      {/* Right side */}
      <div className="before:absolute before:inset-y-0 before:right-0 before:border-l before:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.4),transparent)1] dark:before:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.16),transparent)1] before:shadow-[-1px_0_0_0_--theme(--color-white/.2)] dark:before:shadow-none after:absolute after:inset-y-0 after:right-20 after:border-l after:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.4),transparent)1] dark:after:[border-image:linear-gradient(to_bottom,--theme(--color-primary/.16),transparent)1] after:shadow-[-1px_0_0_0_--theme(--color-white/.2)] dark:after:shadow-none lg:block hidden"></div>
    </div>
  );
}
