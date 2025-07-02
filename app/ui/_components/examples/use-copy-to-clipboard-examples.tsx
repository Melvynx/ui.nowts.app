"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/registry/nowts/hooks/use-copy-to-clipboard";
import { Check, Copy } from "lucide-react";

export function CopyToClipboardExamples() {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopyText = () => {
    copyToClipboard("Hello, World! This text has been copied to your clipboard.");
  };

  const handleCopyCode = () => {
    const code = `const greeting = "Hello, World!";
console.log(greeting);`;
    copyToClipboard(code);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Copy</h3>
        <Button 
          onClick={handleCopyText}
          variant={isCopied ? "default" : "outline"}
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Copy Code</h3>
        <div className="relative">
          <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
            <code>{`const greeting = "Hello, World!";
console.log(greeting);`}</code>
          </pre>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopyCode}
            className="absolute top-2 right-2 h-8 w-8 p-0"
          >
            {isCopied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}