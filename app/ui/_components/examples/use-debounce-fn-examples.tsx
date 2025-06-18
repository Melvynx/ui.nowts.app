"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounceFn } from "@/registry/nowts/hooks/use-debounce-fn";
import { useState } from "react";

export function UseDebounceFnExamples() {
  const [searchResults, setSearchResults] = useState("");

  const debouncedSearch = useDebounceFn((term: string) => {
    setSearchResults(term ? `Search results for: "${term}"` : "");
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <Label htmlFor="search">Search (debounced)</Label>
        <Input
          id="search"
          onChange={handleInputChange}
          placeholder="Type to search..."
        />
      </div>
      {searchResults && (
        <div className="text-sm text-muted-foreground">{searchResults}</div>
      )}
    </div>
  );
}
