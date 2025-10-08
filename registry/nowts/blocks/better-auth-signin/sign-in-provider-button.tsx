import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type ProviderConfig = {
  id: string;
  name: string;
  icon: React.ReactNode;
  buttonClassName?: string;
};

type SignInProviderButtonProps = {
  provider: ProviderConfig;
  onSignIn: (providerId: string) => Promise<void>;
  disabled?: boolean;
};

export function SignInProviderButton({
  provider,
  onSignIn,
  disabled,
}: SignInProviderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await onSignIn(provider.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn("w-full", provider.buttonClassName)}
      onClick={handleSignIn}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        provider.icon
      )}
      <span className="ml-2">Continue with {provider.name}</span>
    </Button>
  );
}
