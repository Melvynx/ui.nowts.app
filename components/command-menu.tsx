"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CommandIcon, FileIcon, HomeIcon, SearchIcon } from "lucide-react";

import { useDocs } from "@/lib/inject-docs.store";
import { cn } from "@/lib/utils";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const docs = useDocs();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group relative flex items-center justify-between gap-4 pl-2.5 pr-2 py-1.5 border rounded-full text-[13px] leading-none border-border/60 dark:border-border/50",
          "bg-background ease-linear duration-150 hover:bg-main-foreground/40 outline-none dark:hover:bg-main-foreground/20 dark:hover:border-white/10 focus-visible:ring-1 focus-visible:ring-neutral-300/80 dark:focus-visible:ring-neutral-800"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -top-[0.031em] h-px w-1/2 max-w-[1000px] -translate-x-1/4 -translate-y-1/2 bg-gradient-to-l from-transparent via-white/18 via-30% to-transparent"
        />
        <span className="flex items-center gap-2 font-[460] text-neutral-500">
          <SearchIcon size={12} />
          Search
        </span>
        <CommandMenuIcon />
      </button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                router.push("/");
                setIsOpen(false);
              }}
            >
              <HomeIcon size={22} className="opacity-70" />
              Home
            </CommandItem>
          </CommandGroup>

          {docs.length > 0 && (
            <CommandGroup heading="Components">
              {docs
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((doc) => (
                  <CommandItem
                    key={doc.slug}
                    onSelect={() => {
                      router.push(`/ui/${doc.slug}`);
                      setIsOpen(false);
                    }}
                  >
                    <FileIcon size={22} className="opacity-70" />
                    {doc.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

function CommandMenuIcon() {
  return (
    <span
      className={cn(
        "text-neutral-500 border border-border/60 ease-linear duration-150 group-hover:border-transparent",
        "px-1.5 py-1 rounded-lg text-[10px] flex items-center gap-0.5"
      )}
    >
      <CommandIcon size={10} /> K
    </span>
  );
}
