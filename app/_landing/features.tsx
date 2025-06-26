import { Typography } from "@/registry/nowts/components/typography";
import { DialogManagerExamples } from "../ui/_components/examples/dialog-manager-examples";
import { FormManagementExamples } from "../ui/_components/examples/form-management-examples";
import { ServerToastExamples } from "../ui/_components/examples/server-toast-examples";
import { MDX } from "../ui/_components/mdx";

export type FeaturesProps = {};

export const Features = async (props: FeaturesProps) => {
  return (
    <div className="max-w-4xl mx-auto relative">
      <Typography variant="h2">Components</Typography>
      <Typography variant="p">
        We offer component, hooks and full-blocks ready to use.
      </Typography>
      <div className="mt-16 lg:mt-20">
        <Typography variant="h3">Server Toasts</Typography>
        <Typography variant="p">
          Create toast in server action, API Route & more.
        </Typography>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <MDX
            source={`<CodeBlock contentClassName="h-auto">
\`\`\`tsx
"use server"

import { serverToast } from "@/server-toast/server-toast";

export async function action() {
  await serverToast("Hello, world!")
}
\`\`\`
</CodeBlock>`}
          />
          <div className="flex-1 border border-dashed bg-accent/20 flex items-center justify-center rounded-md p-4 h-fit min-h-40 mt-8">
            <ServerToastExamples />
          </div>
        </div>
      </div>
      <div className="mt-16 lg:mt-20">
        <Typography variant="h3">Dialog Manager</Typography>
        <Typography variant="p">
          Create dialog in client component without having to add a lot of
          boilerplate code.
        </Typography>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <MDX
            source={`<CodeBlock contentClassName="h-auto">
\`\`\`tsx
import { dialogManager } from "@/lib/dialog-manager/dialog-manager";
import { Button } from "@/components/ui/button";

export function MyComponent() {
  const handleDelete = () => {
    dialogManager.confirm({
      title: "Delete Item",
      description: "Are you sure you want to delete this item?",
      action: {
        label: "Delete",
        variant: "destructive",
        onClick: async () => {
          await deleteItem();
        }
      }
    });
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
\`\`\`
</CodeBlock>`}
          />
          <div className="flex-1 border border-dashed bg-accent/20 flex items-center justify-center rounded-md p-4 h-fit min-h-40 mt-8">
            <DialogManagerExamples />
          </div>
        </div>
      </div>
      <div className="mt-16 lg:mt-20">
        <Typography variant="h3">Form Management</Typography>
        <Typography variant="p">
          Saving bar, auto save and more to create form faster.
        </Typography>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <MDX
            source={`<CodeBlock contentClassName="h-auto">
\`\`\`tsx
export function FormManagementExamples() {
  const form = useZodForm({
    schema: z.object({ name: z.string() }),
    defaultValues: { name: "" },
  });

  return (
    <div className="w-full max-w-sm space-y-6">
      <FormManagement form={form} onSubmit={onSubmit}>
        <Input
          id="name"
          {...form.register("name")}
          placeholder="Enter your name"
        />
        {/* Auto Save every 2 seconds */}
        <FormAutoSaveWatch form={form} autoSaveMs={2000} />
        {/* Sticky bar show when form is dirty */}
        <FormAutoSaveStickyBar />
      </FormManagement>
    </div>
  );
}

\`\`\`
</CodeBlock>`}
          />
          <div className="flex-1 border border-dashed bg-accent/20 flex items-center justify-center rounded-md p-4 h-fit min-h-40 mt-8">
            <FormManagementExamples />
          </div>
        </div>
      </div>
    </div>
  );
};
