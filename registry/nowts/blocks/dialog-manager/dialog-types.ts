import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type DialogVariant = "default" | "destructive" | "warning";
export type DialogSize = "sm" | "md" | "lg";

export type DialogAction = {
  label: ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: "default" | "destructive";
};

export type DialogCancel = {
  label: ReactNode;
  onClick?: () => void | Promise<void>;
};

export type DialogBaseConfig = {
  id?: string;
  title?: string;
  description?: ReactNode;
  icon?: LucideIcon;
  variant?: DialogVariant;
  size?: DialogSize;
  style?: "default" | "centered";
};

export type ConfirmDialogConfig = DialogBaseConfig & {
  type: "confirm";
  confirmText?: string;
  action: DialogAction;
  cancel?: DialogCancel;
};

export type InputDialogConfig = DialogBaseConfig & {
  type: "input";
  input: {
    label: string;
    defaultValue?: string;
    placeholder?: string;
  };
  action: Omit<DialogAction, "onClick"> & {
    onClick: (inputValue?: string) => void | Promise<void>;
  };
  cancel?: DialogCancel;
};

export type CustomDialogConfig = DialogBaseConfig & {
  type: "custom";
  children: ReactNode;
};

export type DialogConfig =
  | ConfirmDialogConfig
  | InputDialogConfig
  | CustomDialogConfig;

export type Dialog = DialogConfig & {
  id: string;
  loading?: boolean;
};
