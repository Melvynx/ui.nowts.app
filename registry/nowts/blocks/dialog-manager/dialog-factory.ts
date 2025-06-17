import type {
  ConfirmDialogConfig,
  CustomDialogConfig,
  Dialog,
  DialogConfig,
  InputDialogConfig,
} from "./dialog-types";

function generateDialogId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export const DialogFactory = {
  confirm: (config: Omit<ConfirmDialogConfig, "type">): Dialog => ({
    ...config,
    type: "confirm",
    id: generateDialogId(),
    loading: false,
  }),

  input: (config: Omit<InputDialogConfig, "type">): Dialog => ({
    ...config,
    type: "input",
    id: generateDialogId(),
    loading: false,
  }),

  custom: (config: Omit<CustomDialogConfig, "type">): Dialog => ({
    ...config,
    type: "custom",
    id: generateDialogId(),
    loading: false,
  }),

  fromConfig: (config: Omit<DialogConfig, "id">): Dialog => {
    const id = generateDialogId();

    switch (config.type) {
      case "confirm":
        return { ...config, id, loading: false } as Dialog;
      case "input":
        return { ...config, id, loading: false } as Dialog;
      case "custom":
        return { ...config, id, loading: false } as Dialog;
      default:
        throw new Error(`Unknown dialog type`);
    }
  },
};
