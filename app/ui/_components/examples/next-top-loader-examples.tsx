"use client";

import { Button } from "@/components/ui/button";
import { useNextTopLoaderStore } from "@/registry/nowts/components/next-top-loader";

export function NextTopLoaderExamples() {
  const { start, done, setProgress, isLoading } = useNextTopLoaderStore();

  const handleQuickDemo = () => {
    start();

    // Simulate incremental progress
    const steps = [20, 40, 60, 80, 100];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setProgress(step);
        if (index === steps.length - 1) {
          setTimeout(() => done(), 200);
        }
      }, (index + 1) * 300);
    });
  };

  return (
    <Button onClick={handleQuickDemo} size="sm" disabled={isLoading}>
      try
    </Button>
  );
}
