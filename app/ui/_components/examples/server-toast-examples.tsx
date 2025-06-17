import { Button } from "@/components/ui/button";
import { serverToast } from "@/registry/nowts/blocks/server-toast/server-toast";
import { revalidatePath } from "next/cache";

async function handleInfo() {
  "use server";
  await serverToast("Here's some helpful information for you.", "info");
  revalidatePath("/ui/server-toast");
}

export function ServerToastExamples() {
  return (
    <form>
      <Button formAction={handleInfo} className="w-full" variant="default">
        Info
      </Button>
    </form>
  );
}
