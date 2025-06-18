"use client";

import { Button } from "@/components/ui/button";
import { useIsClient } from "@/registry/nowts/hooks/use-is-client";
import { useEffect, useState } from "react";

export function UseIsClientExamples() {
  const isClient = useIsClient();
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    if (isClient) {
      const updateTime = () => {
        setCurrentTime(new Date().toLocaleTimeString());
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="p-6 border rounded-lg max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            Server rendering...
          </span>
        </div>
        <p className="text-muted-foreground">Loading client-side content...</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg max-w-md space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-medium text-green-600">
          Client-side rendered!
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Current time: <span className="font-mono">{currentTime}</span>
        </p>

        <div className="flex items-center gap-2">
          <Button onClick={() => setCount((c) => c + 1)} size="sm">
            Count: {count}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          User Agent: {navigator.userAgent.slice(0, 50)}...
        </p>
      </div>
    </div>
  );
}
