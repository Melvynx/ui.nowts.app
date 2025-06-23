"use client";

import { useState } from "react";

import { Drawer as VaulDrawer } from "vaul";

import { Icons } from "@/components/Icons";
import { ToggleTheme } from "@/components/toggle-theme";
import { GET_STARTED } from "@/lib/data/get-started";
import { useDocs } from "@/lib/inject-docs.store";
import { SidebarButton } from "./sidebar/SidebarButton";

export default function Drawer({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const docs = useDocs();

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <VaulDrawer.Root open={isOpen} onOpenChange={setIsOpen} direction="right">
      <VaulDrawer.Trigger asChild>{children}</VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 z-[60] bg-black/60" />
        <VaulDrawer.Content
          className="fixed bottom-2 right-2 top-2 z-[70] flex w-[270px] outline-none"
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <VaulDrawer.Title className="sr-only">Drawer Title</VaulDrawer.Title>
          <div className="relative flex h-full w-full grow flex-col rounded-[16px] bg-drawer px-3 pb-5">
            <div className="flex items-center justify-between gap-2 px-2 py-3">
              <a
                href="https://github.com/Melvynx/ui.nowts.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Icons.github className="size-4 text-neutral-400 duration-150 group-hover:!text-primary dark:text-neutral-600" />
              </a>
              <ToggleTheme />
            </div>
            <div className="flex h-full flex-col gap-6 overflow-y-auto px-3 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-col gap-1">
                <span className="-ml-[2.5px] text-xs font-medium text-foreground">
                  Get Started
                </span>
                <div className="flex flex-col">
                  {GET_STARTED.map((component) => (
                    <SidebarButton
                      key={component.slug}
                      name={component.name}
                      slug={component.slug}
                      onClick={handleClose}
                    />
                  ))}
                </div>
              </div>

              {docs.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="relative z-[1] -ml-[2.5px] text-xs font-medium text-foreground">
                    Components
                  </span>
                  <div className="flex flex-col pb-3">
                    {docs
                      .sort((a, b) => a.title.localeCompare(b.title))
                      .map((doc) => (
                        <SidebarButton
                          key={doc.slug}
                          name={doc.title}
                          slug={`/ui/${doc.slug}`}
                          isNew={doc.isNew}
                          onClick={handleClose}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
