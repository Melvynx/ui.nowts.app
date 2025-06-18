import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TriangleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "../../hooks/use-is-client";
import { useFormAutoSave } from "./form-auto-save";
import { LoadingButton } from "../../../components/submit-button";

type FormAutoSaveStickyBarProps = {
  actionLabel?: string;
  cancelLabel?: string;
};

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const FormAutoSaveStickyBar = (props: FormAutoSaveStickyBarProps) => {
  const ctx = useFormAutoSave();
  const onSubmit = ctx.submit;
  const onCancel = ctx.cancel;
  const isLoading = ctx.isLoading;
  const isDirty = ctx.isDirty;
  const isClient = useIsClient();

  const isShow = isDirty;

  if (!isClient) {
    return null;
  }

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 flex items-center justify-center overflow-hidden py-4"
      style={{
        zIndex: 999,
      }}
    >
      <AnimatePresence>
        {isShow ? (
          <motion.div
            key="save-bar"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: [1, 1, 0],
              y: [0, -10, 20],
              transition: {
                duration: 0.5,
              },
            }}
            className="bg-card shadow-background pointer-events-auto flex w-full max-w-sm items-center gap-2 rounded-full border py-1 pr-2 pl-4 shadow-2xl lg:py-2"
          >
            <TriangleAlert className="text-muted-foreground size-4" />
            <p className="text-muted-foreground text-sm">Unsaved Changes</p>
            <div className="flex-1" />
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="rounded-full"
            >
              {props.cancelLabel ?? "Reset"}
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <LoadingButton
                  size="sm"
                  loading={isLoading}
                  variant="default"
                  onClick={onSubmit}
                  className="rounded-full"
                >
                  {props.actionLabel ?? "Save"}
                </LoadingButton>
              </TooltipTrigger>
              <TooltipContent>CMD+S</TooltipContent>
            </Tooltip>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>,
    document.body
  ) as ReactNode;
};
