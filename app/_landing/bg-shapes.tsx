export function BgShapes(props: { width?: number }) {
  return (
    <div
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none blur-3xl max-w-full w-full sm:w-[1102px]"
      style={{
        width: props.width ? `${props.width}px` : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute w-full sm:w-[960px] h-24 top-12 animate-[swing_8s_ease-in-out_infinite] before:via-primary/20 before:absolute before:inset-0 before:rounded-tl-full before:rounded-br-full before:bg-linear-to-b before:from-transparent before:to-transparent before:-rotate-[42deg]"
        style={
          {
            "--tw-gradient-via":
              "color-mix(in srgb, var(--primary) 100%, transparent)",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute w-full sm:w-[960px] h-24 -top-12 -left-0 sm:-left-28 animate-[swing_15s_-1s_ease-in-out_infinite] before:via-primary/20 before:absolute before:inset-0 before:rounded-tl-full before:rounded-br-full before:bg-linear-to-b before:from-transparent before:to-transparent before:-rotate-[42deg]"
        style={
          {
            "--tw-gradient-via":
              "color-mix(in srgb, var(--foreground) 100%, transparent)",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute w-full sm:w-[960px] h-16 top-36 left-0 sm:left-80 animate-[swing_7s_-2s_ease-in-out_infinite] before:via-primary/20 before:absolute before:inset-0 before:rounded-tl-full before:rounded-br-full before:bg-linear-to-b before:from-transparent before:to-transparent before:-rotate-[42deg]"
        style={
          {
            "--tw-gradient-via":
              "color-mix(in srgb, var(--foreground) 80%, transparent)",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute w-full sm:w-[960px] h-64 top-[420px] sm:top-[820px] left-0 sm:left-44 animate-[swing_10s_ease-in-out_infinite] before:via-primary/20 before:absolute before:inset-0 before:rounded-tl-full before:rounded-br-full before:bg-linear-to-b before:from-transparent before:to-transparent before:-rotate-[42deg]"
        style={
          {
            "--tw-gradient-via":
              "color-mix(in srgb, var(--primary) 30%, transparent)",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute w-2/3 sm:w-[480px] h-12 top-[520px] sm:top-[970px] left-1/2 sm:left-[550px] -translate-x-1/2 sm:translate-x-0 animate-[swing_15s_-2s_ease-in-out_infinite] before:via-primary/20 before:absolute before:inset-0 before:rounded-tl-full before:rounded-br-full before:bg-linear-to-b before:from-transparent before:to-transparent before:-rotate-[42deg]"
        style={
          {
            "--tw-gradient-via":
              "color-mix(in srgb, var(--secondary) 60%, transparent)",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute w-full sm:w-[960px] h-16 top-[420px] sm:top-[820px] left-0 sm:left-24 animate-[swing_9s_-3s_ease-in-out_infinite] before:via-primary/20 before:absolute before:inset-0 before:rounded-tl-full before:rounded-br-full before:bg-linear-to-b before:from-transparent before:to-transparent before:-rotate-[42deg]"
        style={
          {
            "--tw-gradient-via":
              "color-mix(in srgb, var(--muted) 50%, transparent)",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
