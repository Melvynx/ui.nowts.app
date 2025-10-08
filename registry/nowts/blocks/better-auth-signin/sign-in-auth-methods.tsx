import { OtpForm } from "@/components/better-auth-otp";
import { useState } from "react";
import type { SignInPasswordFormProps } from "./sign-in-password-form";
import { SignInPasswordForm } from "./sign-in-password-form";

type AuthMethod = "otp" | "password";

export type SignInAuthMethodsProps = {
  onSendOtp: (email: string) => Promise<void>;
  onVerifyOtp: (email: string, otp: string) => Promise<void>;
  onPasswordSignIn: SignInPasswordFormProps["onSubmit"];
  defaultEmail?: string;
  defaultMethod?: AuthMethod;
  forgotPasswordUrl?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export function SignInAuthMethods({
  onSendOtp,
  onVerifyOtp,
  onPasswordSignIn,
  defaultEmail = "",
  defaultMethod = "otp",
  forgotPasswordUrl,
  onSuccess,
  onError,
}: SignInAuthMethodsProps) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(defaultMethod);

  if (authMethod === "password") {
    return (
      <div className="space-y-4">
        <SignInPasswordForm
          onSubmit={onPasswordSignIn}
          defaultEmail={defaultEmail}
          forgotPasswordUrl={forgotPasswordUrl}
          onError={onError}
        />
        <p className="text-muted-foreground text-center text-xs">
          Want faster sign in?{" "}
          <button
            type="button"
            onClick={() => setAuthMethod("otp")}
            className="text-primary underline underline-offset-4"
          >
            Use OTP code
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <OtpForm
        sendOtp={onSendOtp}
        verifyOtp={onVerifyOtp}
        defaultEmail={defaultEmail}
        onSuccess={onSuccess}
        onError={onError}
      />
      <p className="text-muted-foreground text-center text-xs">
        Prefer password sign in?{" "}
        <button
          type="button"
          onClick={() => setAuthMethod("password")}
          className="text-primary underline underline-offset-4"
        >
          Use password
        </button>
      </p>
    </div>
  );
}
