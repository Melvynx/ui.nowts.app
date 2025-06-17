"use client";

import { OtpForm } from "@/registry/nowts/blocks/better-auth-otp/components/better-auth-otp";
import { useState } from "react";
import { toast } from "sonner";

// Mock authClient for demo
const mockAuthClient = {
  emailOtp: {
    sendVerificationOtp: async ({
      email,
      type,
    }: {
      email: string;
      type: string;
    }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate error for certain emails
      if (email === "error@example.com") {
        return { error: { message: "Failed to send OTP" } };
      }

      return { data: { success: true } };
    },
  },
  signIn: {
    emailOtp: async ({ email, otp }: { email: string; otp: string }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success if OTP = "123456"
      if (otp === "123456") {
        return { data: { user: { email, id: "1" } } };
      }

      return { error: { message: "Invalid OTP code" } };
    },
  },
};

export function BetterAuthOtpDemo() {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="w-[400px] p-6 border rounded-lg bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
            Successfully signed in!
          </h3>
          <p className="text-sm text-green-600 dark:text-green-300">
            You are now logged into your account.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-sm text-green-700 dark:text-green-300 underline hover:no-underline"
          >
            Restart demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[400px] space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Better Auth OTP Demo</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email to receive a verification code
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-card">
        <OtpForm
          sendOtp={async (email) => {
            const result = await mockAuthClient.emailOtp.sendVerificationOtp({
              email,
              type: "sign-in",
            });
            if (result.error) throw new Error(result.error.message);
          }}
          verifyOtp={async (email, otp) => {
            const result = await mockAuthClient.signIn.emailOtp({ email, otp });
            if (result.error) throw new Error(result.error.message);
          }}
          onSuccess={() => {
            toast.success("Successfully signed in!");
            setIsSuccess(true);
          }}
          onError={(error) => toast.error(error)}
          defaultEmail="demo@example.com"
          resendCooldown={10} // Reduced for demo
        />
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded border space-y-1">
        <p>
          <strong>💡 Demo tips:</strong>
        </p>
        <p>
          • Use code <code className="bg-background px-1 rounded">123456</code>{" "}
          to simulate successful sign in
        </p>
        <p>
          • Use{" "}
          <code className="bg-background px-1 rounded">error@example.com</code>{" "}
          to test error handling
        </p>
        <p>• Cooldown is reduced to 10s for easier testing</p>
      </div>
    </div>
  );
}

export function BetterAuthOtpCodeExample() {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">
        Implementation example:
      </div>
      <div className="relative">
        <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
          <code>{`import { OtpForm } from "@/components/better-auth-otp";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function LoginPage() {
  return (
    <OtpForm
      sendOtp={async (email) => {
        const result = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "sign-in"
        });
        if (result.error) throw new Error(result.error.message);
      }}
      verifyOtp={async (email, otp) => {
        const result = await authClient.signIn.emailOtp({ email, otp });
        if (result.error) throw new Error(result.error.message);
      }}
      onSuccess={() => {
        toast.success("Signed in successfully!");
        window.location.href = "/dashboard";
      }}
      onError={(error) => toast.error(error)}
      defaultEmail="user@example.com"
      resendCooldown={60}
    />
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
}
