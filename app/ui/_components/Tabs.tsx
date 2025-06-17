"use client";

import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

const Tabs = TabsPrimitive.Root;

const TabsContext = React.createContext<string>("");

const TabsRoot = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Root>>;
}) => {
  const uniqueId = React.useId();

  return (
    <TabsContext.Provider value={uniqueId}>
      <Tabs ref={ref} {...props} />
    </TabsContext.Provider>
  );
};

const TabsList = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.List>>;
}) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-[44px] gap-5 w-full items-center justify-start rounded-t-lg bg-background pl-3",
      className
    )}
    {...props}
  />
);

const TabsTrigger = ({
  className,
  children,
  classNameIndicator,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  classNameIndicator?: string;
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Trigger>>;
}) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = React.useState(false);
  const tabsId = React.useContext(TabsContext);

  React.useEffect(() => {
    const element = triggerRef.current;

    if (element) {
      setIsActive(element.dataset.state === "active");

      const observer = new MutationObserver(() => {
        setIsActive(element.dataset.state === "active");
      });

      observer.observe(element, { attributes: true });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      className={cn(
        "group relative inline-flex h-10 items-center justify-center rounded-none bg-transparent py-1 pt-2 pb-2 text-sm font-medium whitespace-nowrap transition-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 text-neutral-500 data-[state=active]:text-primary",
        className
      )}
      {...props}
    >
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            layoutId={`underline-${tabsId}`}
            className={cn(
              "absolute -bottom-[3.5px] flex h-0.5 w-full justify-center",
              classNameIndicator
            )}
            transition={{
              type: "spring",
              duration: 0.3,
              bounce: 0,
            }}
          >
            <div className="h-0.5 w-full rounded-full bg-primary/90" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </TabsPrimitive.Trigger>
  );
};

const TabsContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Content>>;
}) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "pt-4 relative rounded-md ring-offset-blue-50 focus-visible:outline-none",
      className
    )}
    {...props}
  />
);

export { TabsRoot as Tabs, TabsContent, TabsList, TabsTrigger };
