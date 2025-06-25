"use client";

import { createContext, Fragment, use, useEffect, useRef } from "react";
import type { FieldValues } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import type { FormProps } from "../../components/extended-form";
import { ExtendedForm } from "../../components/extended-form";
import { useDebounceFn } from "../../hooks/use-debounce-fn";
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

export const FormAutoSaveWatch = <T extends FieldValues>(
  props: Pick<FormProps<T>, "form"> & { autoSaveMs?: number }
) => {
  const lastFormStateRef = useRef<string | null>(null);
  const watchedField = props.form.watch();
  const ctx = useFormAutoSave();

  const debounce = useDebounceFn(() => {
    const json = JSON.stringify(watchedField);
    if (json === lastFormStateRef.current) return;
    lastFormStateRef.current = json;

    ctx.submit();
  }, props.autoSaveMs);

  useEffect(() => {
    debounce();
  }, [debounce, watchedField]);

  return null;
};
