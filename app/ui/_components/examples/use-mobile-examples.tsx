"use client";

import { useIsMobile } from "@/registry/nowts/hooks/use-mobile";

export function UseMobileExamples() {
  const isMobile = useIsMobile();
  
  return (
    <div className="text-center space-y-2">
      <p className="text-sm text-muted-foreground">
        Current device type:
      </p>
      <p className="text-lg font-medium">
        {isMobile ? "📱 Mobile" : "🖥️ Desktop"}
      </p>
      <p className="text-xs text-muted-foreground">
        Resize your window to see it change
      </p>
    </div>
  );
}