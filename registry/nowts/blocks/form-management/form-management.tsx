"use client";

import { createContext, Fragment, use, useRef } from "react";
import type { FieldValues } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import type { FormProps } from "../../components/extended-form";
import { ExtendedForm } from "../../components/extended-form";
import { useWarnIfUnsavedChanges } from "../../hooks/use-warn-if-unsaved-changes";

const FormAutoSaveContext = createContext<{
  isDirty: boolean;
  isLoading: boolean;
  cancel: () => void;
  submit: () => void;
} | null>(null);

export const useFormAutoSave = () => {
  const ctx = use(FormAutoSaveContext);

  if (!ctx) {
    throw new Error("FormUnsavedBarContext is not provided");
  }

  return ctx;
};

export const FormManagement = <T extends FieldValues>({
  children,
  ...props
}: FormProps<T>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const submit = () => buttonRef.current?.click();
  const cancel = () => props.form.reset();

  const isDirty = props.form.formState.isDirty;

  useHotkeys("mod+s", submit, {
    enabled: isDirty,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });

  useWarnIfUnsavedChanges(
    isDirty,
    "You have unsaved changes. Please save or cancel your changes before leaving."
  );

  return (
    <FormAutoSaveContext.Provider
      value={{
        isDirty,
        isLoading: props.form.formState.isSubmitting,
        cancel,
        submit,
      }}
    >
      <Fragment>
        <ExtendedForm {...props} disabled={false}>
          {children}
          <button type="submit" className="hidden" ref={buttonRef} />
        </ExtendedForm>
      </Fragment>
    </FormAutoSaveContext.Provider>
  );
};

