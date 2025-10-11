"use client";

import { BetterAuthSignUp } from "@/registry/nowts/blocks/better-auth-signup/better-auth-signup";
import { toast } from "sonner";

export function BetterAuthSignUpExamples() {
  const handleSignUp = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // eslint-disable-next-line no-console
    console.info("Sign up data:", data);
  };

  return (
    <BetterAuthSignUp
      onSignUp={handleSignUp}
      onSuccess={() => {
        toast.success("Account created successfully!");
      }}
      onError={(error) => {
        toast.error(error);
      }}
      signInLink={
        <>
          Already have an account?{" "}
          <a href="#" className="underline hover:text-foreground">
            Sign in
          </a>
        </>
      }
    />
  );
}
