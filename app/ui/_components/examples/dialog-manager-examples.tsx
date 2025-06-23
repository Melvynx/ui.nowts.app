"use client";

import { Button } from "@/components/ui/button";
import { dialogManager } from "@/registry/nowts/blocks/dialog-manager/dialog-manager";
import { toast } from "sonner";

export function DialogManagerExamples() {
  const handleConfirmWithText = () => {
    dialogManager.confirm({
      title: "Delete Account",
      description:
        "This action is irreversible. All your data will be permanently deleted.",
      confirmText: "DELETE",
      action: {
        label: "Delete Account",
        variant: "destructive",
        onClick: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success("Account deleted");
        },
      },
    });
  };

  const handleInput = () => {
    dialogManager.input({
      title: "Rename Item",
      description: "Enter a new name for this item.",
      input: {
        label: "Name",
        placeholder: "Enter new name...",
        defaultValue: "Current Name",
      },
      action: {
        label: "Rename",
        onClick: async (value) => {
          if (!value?.trim()) {
            throw new Error("Name cannot be empty");
          }
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success(`Renamed to: ${value}`);
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleConfirmWithText} variant="outline">
        Delete
      </Button>
      <Button onClick={handleInput} variant="outline">
        Rename Item
      </Button>
    </div>
  );
}
