"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import type {
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import type * as z from "zod";

export type FormProps<T extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> & {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  disabled?: boolean;
};

export const ExtendedForm = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  disabled,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className={className}
      >
        <fieldset
          disabled={disabled ?? form.formState.isSubmitting}
          className={className}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};

type UseZodFormProps<
  Input extends FieldValues,
  Output extends FieldValues,
  Z extends z.ZodType<Output, Input>,
> = Exclude<UseFormProps<z.output<Z>>, "resolver"> & {
  schema: Z;
};

export const useZodForm = <
  Input extends FieldValues,
  Output extends FieldValues,
  Z extends z.ZodType<Output, Input>,
>({
  schema,
  ...formProps
}: UseZodFormProps<Input, Output, Z>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema) as never,
  });
