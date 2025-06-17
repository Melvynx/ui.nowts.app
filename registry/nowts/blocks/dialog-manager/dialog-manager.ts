import { useDialogStore } from "./dialog-store";
import type {
  ConfirmDialogConfig,
  CustomDialogConfig,
  InputDialogConfig,
} from "./dialog-types";

export const dialogManager = {
  confirm: (config: Omit<ConfirmDialogConfig, "type" | "id">) =>
    useDialogStore.getState().addDialog({ ...config, type: "confirm" }),

  input: (config: Omit<InputDialogConfig, "type" | "id">) =>
    useDialogStore.getState().addDialog({ ...config, type: "input" }),

  custom: (config: Omit<CustomDialogConfig, "type" | "id">) =>
    useDialogStore.getState().addDialog({ ...config, type: "custom" }),

  close: (id: string) => useDialogStore.getState().removeDialog(id),

  closeAll: () => useDialogStore.getState().clear(),
};
