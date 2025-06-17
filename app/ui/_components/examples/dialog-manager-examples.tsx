"use client";

import { Button } from "@/components/ui/button";
import { dialogManager } from "@/registry/nowts/blocks/dialog-manager/dialog-manager";
import { Settings, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";

export function DialogManagerExamples() {
  const handleConfirm = () => {
    dialogManager.confirm({
      title: "Delete Item",
      description:
        "Are you sure you want to delete this item? This action cannot be undone.",
      action: {
        label: "Delete",
        variant: "destructive",
        onClick: async () => {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success("Item deleted successfully");
        },
      },
    });
  };

  const handleConfirmWithText = () => {
    dialogManager.confirm({
      title: "Delete Account",
      description:
        "This action is irreversible. All your data will be permanently deleted.",
      confirmText: "DELETE",
      icon: Trash2,
      style: "centered",
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

  const handleCreateUser = () => {
    dialogManager.input({
      title: "Create New User",
      description: "Enter the email address for the new user.",
      icon: UserPlus,
      input: {
        label: "Email Address",
        placeholder: "user@example.com",
      },
      action: {
        label: "Create User",
        onClick: async (email) => {
          if (!email?.includes("@")) {
            throw new Error("Please enter a valid email address");
          }
          await new Promise((resolve) => setTimeout(resolve, 1500));
          toast.success(`User created: ${email}`);
        },
      },
    });
  };

  const handleCustomDialog = () => {
    dialogManager.custom({
      children: (
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <Settings className="size-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Custom Settings</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            This is a custom dialog with your own components. You have full
            control over the content and actions.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => dialogManager.closeAll()}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success("Settings saved");
                dialogManager.closeAll();
              }}
            >
              Save Settings
            </Button>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Confirm Dialogs</h3>
        <div className="flex flex-col gap-2">
          <Button onClick={handleConfirm} variant="destructive" size="sm">
            Simple Confirm
          </Button>
          <Button
            onClick={handleConfirmWithText}
            variant="destructive"
            size="sm"
          >
            Confirm with Text
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Input Dialogs</h3>
        <div className="flex flex-col gap-2">
          <Button onClick={handleInput} variant="outline" size="sm">
            Rename Item
          </Button>
          <Button onClick={handleCreateUser} size="sm">
            Create User
          </Button>
        </div>
      </div>

      <div className="space-y-2 md:col-span-2">
        <h3 className="text-sm font-medium">Custom Dialog</h3>
        <Button onClick={handleCustomDialog} variant="secondary" size="sm">
          Open Custom Dialog
        </Button>
      </div>
    </div>
  );
}
