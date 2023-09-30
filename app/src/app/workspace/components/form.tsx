"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { use, useEffect } from "react";

// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? "Loading..." : "Create"}</Button>;
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
      <form action={formAction} className="w-2/3 space-y-6">
        <Label htmlFor="name">
          Organization Name:{" "}
          <Input placeholder="ebliq" type="text" name="name" />
        </Label>
        <SubmitButton />
      </form>
    </>
  );
}
