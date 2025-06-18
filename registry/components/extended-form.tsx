"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import type {
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import type { TypeOf, ZodSchema } from "zod";

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

type UseZodFormProps<Z extends ZodSchema> = Exclude<
  UseFormProps<TypeOf<Z>>,
  "resolver"
> & {
  schema: Z;
};

export const useZodForm = <Z extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<Z>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });
