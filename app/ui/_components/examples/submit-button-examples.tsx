"use client";

import { SubmitButton } from "@/registry/components/submit-button";
import { toast } from "sonner";

export function SubmitButtonExamples() {
  const handleFormSubmit = async (formData: FormData) => {
    // Simulate server action delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const email = formData.get("email") as string;
    if (email) {
      toast.success(`Form submitted with email: ${email}`);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form action={handleFormSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border rounded-md bg-background"
        />
        <SubmitButton className="w-full">Submit</SubmitButton>
      </form>
    </div>
  );
}
