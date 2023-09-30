import { currentUser, clerkClient, auth } from "@clerk/nextjs";
import { SignedInAuthObject, User } from "@clerk/nextjs/server";
import { getAccount, getCurrentWorkspace } from "./utils";

interface WorkspaceParams {
  slug: string;
}

export default async function Page({ params }: { params: WorkspaceParams }) {
  const user = (await currentUser()) as User;
  const organization = await getCurrentWorkspace({
    currentWorkspaceSlug: params.slug,
    userId: user.id,
  });
  const account = getAccount(organization, user.id);

  return (
    <>
      <div>{params.slug}</div>
      <div>{organization.name}</div>
    </>
  );
}
