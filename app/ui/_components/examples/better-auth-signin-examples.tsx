"use client";

import { SignInPage } from "@/registry/nowts/blocks/better-auth-signin/sign-in-page";
import { Github } from "lucide-react";
import { toast } from "sonner";

export function BetterAuthSignInExamples() {
  const handleSendOtp = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`OTP sent to ${email}`);
  };

  const handleVerifyOtp = async (email: string, otp: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otp === "123456") {
      toast.success("Successfully signed in!");
    } else {
      throw new Error("Invalid OTP code");
    }
  };

  const handlePasswordSignIn = async (credentials: {
    email: string;
    password: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (credentials.password === "password") {
      toast.success("Successfully signed in!");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const handleProviderSignIn = async (provider: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Signing in with ${provider}`);
  };

  return (
    <SignInPage
      appName="Acme Inc"
      description="Sign in to your account to continue"
      onSendOtp={handleSendOtp}
      onVerifyOtp={handleVerifyOtp}
      onPasswordSignIn={handlePasswordSignIn}
      onProviderSignIn={handleProviderSignIn}
      providers={[
        {
          id: "github",
          name: "GitHub",
          icon: <Github className="size-4" />,
          buttonClassName: "bg-black text-white hover:bg-gray-900",
        },
      ]}
      signUpUrl="#"
      forgotPasswordUrl="#"
      onError={(error) => toast.error(error)}
    />
  );
}
