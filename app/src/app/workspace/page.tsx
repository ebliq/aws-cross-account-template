import { clerkClient, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { CreateOrganizationForm } from "./components/form";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await currentUser()) as User;

  // create organization action
  async function createOrganization(prevState: any, formData: FormData) {
    "use server";
    const organizationName = formData.get("name") as string;
    try {
      // check organization name is differnt to username
      const res = await clerkClient.organizations.createOrganization({
        name: organizationName,
        slug: organizationName,
        createdBy: user.id,
      });
      console.log("created organization", res.name);
    } catch (e: any) {
      const errorMessage =
        e?.errors[0]?.message ||
        "Something went wrong, try again, maybe with a different name";
      return {
        message: errorMessage,
      };
    }
    // need to redirect outside of the try catch block: https://stackoverflow.com/a/77059021/19947257
    // revalidatePath(`/workspace/${organizationName}`);
    redirect(`/workspace/${organizationName}`); // Navigate to new route
  }

  return (
    <>
      <CreateOrganizationForm action={createOrganization} />
    </>
  );
}
