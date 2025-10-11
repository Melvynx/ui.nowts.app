"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export type SignInPasswordFormProps = {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  defaultEmail?: string;
  forgotPasswordUrl?: string;
  onError?: (error: string) => void;
};

export function SignInPasswordForm({
  onSubmit,
  defaultEmail = "",
  forgotPasswordUrl,
  onError,
}: SignInPasswordFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ email, password });
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {forgotPasswordUrl && (
            <a
              href={forgotPasswordUrl}
              className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4"
            >
              Forgot password?
            </a>
          )}
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="current-password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
