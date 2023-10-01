import { currentUser, clerkClient, auth } from "@clerk/nextjs";
import { SignedInAuthObject, User } from "@clerk/nextjs/server";
import { getCurrentWorkspace } from "./utils";
import { redirect } from "next/navigation";
import { HOST } from "@/constants";
import { queryActiveAccounts } from "@/lib/db";

interface WorkspaceParams {
  slug: string;
}

export default async function Page({ params }: { params: WorkspaceParams }) {
  const user = (await currentUser()) as User;
  const organization = await getCurrentWorkspace({
    currentWorkspaceSlug: params.slug,
    userId: user.id,
  });
  if (!(await queryActiveAccounts({ slug: organization.slug as string }))) {
    redirect(`/workspace/${organization.slug}/connect`);
  }

  return (
    <>
      <div>{params.slug}</div>
      <div>{organization.name}</div>
    </>
  );
}
