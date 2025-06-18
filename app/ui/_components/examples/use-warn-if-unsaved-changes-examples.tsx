"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWarnIfUnsavedChanges } from "@/registry/nowts/hooks/use-warn-if-unsaved-changes";
import { useState } from "react";

export function UseWarnIfUnsavedChangesExamples() {
  const [inputValue, setInputValue] = useState("");

  const hasUnsavedChanges = inputValue.length > 0;

  // Warn before leaving when there are unsaved changes
  useWarnIfUnsavedChanges(
    hasUnsavedChanges,
    "You have unsaved changes. Are you sure you want to leave?"
  );

  const handleSave = () => {
    // Simulate save and clear
    alert("Changes saved! (This is just a demo)");
    setInputValue("");
  };

  const handleReset = () => {
    setInputValue("");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Simple Form
          {hasUnsavedChanges && (
            <span className="text-sm font-normal text-amber-600 dark:text-amber-400">
              (Unsaved changes)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Type something</Label>
          <Input
            id="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Start typing to see the warning in action..."
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            Save Changes
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={!hasUnsavedChanges}
          >
            Reset
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Type something above, then try to navigate away or refresh the page to
          see the warning.
        </p>
      </CardContent>
    </Card>
  );
}
