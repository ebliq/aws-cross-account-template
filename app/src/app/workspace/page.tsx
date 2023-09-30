import { clerkClient, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { CreateOrganizationForm } from "./components/form";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const user = (await currentUser()) as User;

  // create organization action
  async function createOrganization(prevState: any, formData: FormData) {
    "use server";
    const organizationName = formData.get("name") as string;
    try {
      await clerkClient.organizations.createOrganization({
        name: organizationName,
        slug: organizationName,
        createdBy: user.id,
      });
    } catch (e: any) {
      const errorMessage =
        e?.errors[0]?.message ||
        "Something went wrong, try again, maybe with a different name";
      return {
        message: errorMessage,
      };
    }
    // need to redirect outside of the try catch block: https://stackoverflow.com/a/77059021/19947257
    revalidatePath(`/workspace/${organizationName}`);
    redirect(`/workspace/${organizationName}`); // Navigate to new route
  }

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[50em] flex-col justify-center gap-4 rounded-md bg-white p-12 shadow">
      <h1 className="text-2xl font-bold">Create Organization</h1>
      <CreateOrganizationForm action={createOrganization} />
    </div>
  );
}
