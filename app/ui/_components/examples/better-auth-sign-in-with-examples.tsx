import { SignInWith } from "@/registry/nowts/components/better-auth-sign-in-with";

export function BetterAuthSignInWithExamples() {
  const handleSignIn = async (provider: "github" | "google") => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-3 w-full max-w-sm">
      <SignInWith
        type="github"
        onSignIn={handleSignIn}
        buttonProps={{}}
      />
      <SignInWith
        type="google"
        onSignIn={handleSignIn}
        buttonProps={{}}
      />
    </div>
  );
}