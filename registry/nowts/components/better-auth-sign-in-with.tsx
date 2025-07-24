"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { toast } from "sonner";
import { LoadingButton } from "./submit-button";
import { SvglImg } from "./svgl-images";

type OAuthProvider = "github" | "google";

const IconMap: Record<
  OAuthProvider,
  { light: string; dark: string; label: string }
> = {
  github: {
    light: "github_light",
    dark: "github_dark",
    label: "GitHub",
  },
  google: {
    light: "google",
    dark: "google",
    label: "Google",
  },
};

export const SignInWith = (props: {
  type: OAuthProvider;
  className?: string;
  buttonProps: ComponentProps<typeof LoadingButton>;
  onSignIn: (provider: OAuthProvider) => Promise<void>;
}) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return props.onSignIn(props.type);
    },
    onSuccess: () => {
      toast.success(`Signed in with ${props.type}`);
    },
    onError: (ctx: { error: Error }) => {
      toast.error(ctx.error.message);
    },
  });

  return (
    <LoadingButton
      loading={mutation.isPending}
      className={cn("flex-1 max-lg:py-2 w-full", props.className)}
      variant="outline"
      onClick={() => {
        mutation.mutate();
      }}
      {...props.buttonProps}
    >
      <SvglImg
        height="16"
        width="16"
        lightIconName={IconMap[props.type].light}
        darkIconName={IconMap[props.type].dark}
      />
      Continue with {IconMap[props.type].label}
    </LoadingButton>
  );
};
