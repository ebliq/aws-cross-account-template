import { currentUser, clerkClient, auth } from "@clerk/nextjs";
import {
  Clerk,
  Organization,
  OrganizationMembership,
  SignedInAuthObject,
  User,
} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface WorkspaceParams {
  slug: string;
}

type currentWorkspace = {
  currentWorkspaceSlug: string;
  userId: string;
  orgSlug: string | undefined;
};

async function getCurrentWorkspace({
  currentWorkspaceSlug,
  userId,
  orgSlug,
}: currentWorkspace): Promise<Organization> {
  // Cannot setActive organization on the server, ignored for now
  // // check if current Organization is the same as the params
  // console.log(orgSlug);
  // if (orgSlug && orgSlug == currentWorkspaceSlug) {
  //   return true;
  // }
  // check if user is a member of the workspace
  const userWorkspaces = await clerkClient.users.getOrganizationMembershipList({
    userId,
  });
  console.log(userWorkspaces);
  // if user has no workspaces, redirect to create workspace page
  if (!userWorkspaces || userWorkspaces.length == 0) {
    redirect(`/workspace`);
  }
  // if user has workspaces, check if user is a member of the workspace params
  const requestedWorkspace = userWorkspaces.find(
    (workspace: OrganizationMembership) =>
      workspace.organization.slug === currentWorkspaceSlug,
  );
  console.log(requestedWorkspace);
  // if user is not member of the requested workspace,
  // set the first workspace as the active workspace and then
  // redirect to its first workspace
  if (!requestedWorkspace) {
    // TODO: cannot setActive on the server side
    console.log(
      `redirecting ${userId} to ${userWorkspaces[0].organization.slug}`,
    );
    redirect(`/workspace/${userWorkspaces[0].organization.slug}`); // redirect to home page if user is not a member of the workspace
  }
  return requestedWorkspace.organization;
}

export default async function Page({ params }: { params: WorkspaceParams }) {
  const { orgSlug, userId } = auth() as SignedInAuthObject;
  const organization = await getCurrentWorkspace({
    currentWorkspaceSlug: params.slug,
    userId,
    orgSlug,
  });

  // console.log(wp);

  // set current workspace to the workspace params

  // const user = (await currentUser()) as User; // overwrite type since middleware would blog this if not logged in
  // // get workspaces of user and check if user is a member of the workspace params
  // const userWorkspaces = await clerkClient.users.getOrganizationMembershipList({
  //   userId: user.id,
  // });
  // const currentWorkspace = userWorkspaces.find(
  //   (workspace: OrganizationMembership) =>
  //     workspace.organization.id === params.workspace,
  // );
  // if (!currentWorkspace) {
  //   redirect(`/workspaces/${userWorkspaces}`); // redirect to home page if user is not a member of the workspace
  // }
  return (
    <>
      <div>{params.slug}</div>
      <div>{organization.name}</div>
    </>
  );
}
