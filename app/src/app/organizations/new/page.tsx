import { clerkClient, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await currentUser()) as User;
  async function create(formData: FormData) {
    "use server";
    await clerkClient.organizations.createOrganization({
      name: formData.get("name") as string,
      createdBy: user.id,
    });
    redirect(`/`); // Navigate to new route
  }

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[50em] flex-col justify-center gap-4 rounded-md bg-white p-12 shadow">
      <h1 className="text-2xl font-bold">Create Organization</h1>
      <form action={create} className="w-2/3 space-y-6">
        <Label htmlFor="name">
          Organization Name:{" "}
          <Input placeholder="ebliq" type="text" name="name" />
        </Label>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
