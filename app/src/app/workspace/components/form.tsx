"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { ListItem } from "@/components/ui/listItem";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="font-mono">
      {pending ? "Loading..." : "Create Workspace"}
    </Button>
  );
}

export function CreateOrganizationForm({
  action,
}: {
  action: (prevState: any, formData: FormData) => void;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    state.message &&
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state.message,
      });
  }, [state]);

  return (
    <>
      <div className="flex w-full max-w-[22rem] flex-col items-center justify-center gap-4">
        <div className="rounded-md p-2 dark:bg-accent">
          <Icons.box className="h-8 w-8" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Create a new Workspace</h1>
          <span className="text-center text-sm text-muted-foreground">
            You can connect Workspaces with AWS accounts
          </span>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-md border border-input bg-background p-4 text-sm">
          <ul>
            <ListItem>Create a workspace for your Organization</ListItem>
            <ListItem>Invite your team or collaborates</ListItem>
            <ListItem>Connect it with your AWS Account</ListItem>
          </ul>
        </div>
        <form action={formAction} className="flex w-full flex-col gap-4">
          <div>
            <Input placeholder="your-workspace-name" type="text" name="name" />
            <span className="text-xs text-muted-foreground">
              Needs to be lowercase, unique, and URL friendly.
            </span>
          </div>

          <SubmitButton />
        </form>
      </div>
    </>
  );
}
