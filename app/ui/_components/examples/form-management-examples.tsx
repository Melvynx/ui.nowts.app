"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useZodForm } from "@/registry/components/extended-form";
import {
  FormAutoSave,
  FormAutoSaveWatch,
} from "@/registry/nowts/blocks/form-management/form-management";
import { FormAutoSaveStickyBar } from "@/registry/nowts/blocks/form-management/form-management-sticky-bar";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export function FormManagementExamples() {
  const form = useZodForm({
    schema,
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Form submitted successfully");
    form.reset(data);
    // Form submitted successfully
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <FormAutoSave form={form} onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...form.register("name")}
            placeholder="Enter your name"
          />
        </div>

        <FormAutoSaveWatch form={form} autoSaveMs={2000} />
        <FormAutoSaveStickyBar />
      </FormAutoSave>

      <div className="text-xs text-muted-foreground text-center">
        Type to see the sticky bar appear. Use CMD+S to save.
      </div>
    </div>
  );
}
