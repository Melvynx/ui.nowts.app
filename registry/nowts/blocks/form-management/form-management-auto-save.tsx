"use client";

import { useEffect, useRef } from "react";
import type { FieldValues } from "react-hook-form";
import type { FormProps } from "../../components/extended-form";
import { useDebounceFn } from "../../hooks/use-debounce-fn";
import { useFormAutoSave } from "./form-management";

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