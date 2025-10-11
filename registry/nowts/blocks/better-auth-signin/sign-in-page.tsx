"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import type { SignInAuthMethodsProps } from "./sign-in-auth-methods";
import { SignInAuthMethods } from "./sign-in-auth-methods";
import { Divider } from "./divider";
import type { ProviderConfig } from "./sign-in-provider-button";
import { SignInProviderButton } from "./sign-in-provider-button";

export type SignInPageProps = {
  appName: string;
  appIcon?: string;
  description?: string;
  providers?: ProviderConfig[];
  signUpUrl?: string;
  onProviderSignIn: (providerId: string) => Promise<void>;
} & SignInAuthMethodsProps;

export function SignInPage({
  appName,
  appIcon,
  description = "Please sign in to your account to continue.",
  providers = [],
  signUpUrl,
  onProviderSignIn,
  ...authMethodsProps
}: SignInPageProps) {
  return (
    <Card className="mx-auto h-auto w-full max-w-md p-6">
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row items-center gap-2">
          {appIcon && (
            <Avatar className="size-8 rounded-md">
              <AvatarImage src={appIcon} alt={`${appName} logo`} />
              <AvatarFallback>
                {appName.substring(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <h1 className="text-xl font-semibold">{appName}</h1>
        </div>

        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>

      <CardContent className="mt-4 space-y-6">
        <SignInAuthMethods {...authMethodsProps} />

        {providers.length > 0 && (
          <>
            <Divider>or</Divider>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
              {providers.map((provider) => (
                <SignInProviderButton
                  key={provider.id}
                  provider={provider}
                  onSignIn={onProviderSignIn}
                />
              ))}
            </div>
          </>
        )}

        {signUpUrl && (
          <p className="text-muted-foreground text-center text-xs">
            Don't have an account?{" "}
            <a
              href={signUpUrl}
              className="text-primary underline underline-offset-4"
            >
              Sign up
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
