import { Organization, OrganizationMembership, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { COOKIE_WORKSPACE, HOST } from "@/constants";
import { cookies } from "next/headers";
import { setCookieForActiveOrganization } from "@/lib/utils";

type currentWorkspace = {
  currentWorkspaceSlug: string;
  userId: string;
};

export async function getCurrentWorkspace({
  currentWorkspaceSlug,
  userId,
}: currentWorkspace): Promise<Organization> {
  // try to get current org from cookie
  const cooki = cookies();
  const currentOrg = cooki.get(COOKIE_WORKSPACE) as string | undefined;
  // check if current org is set org in cookie
  if (currentOrg && currentOrg == currentWorkspaceSlug) {
    const org = await clerkClient.organizations.getOrganization({ slug: currentOrg })
    return org;
  }
  // check if user is a member of the workspace
  const userWorkspaces = await clerkClient.users.getOrganizationMembershipList({
    userId,
  });
  // if user has no workspaces, redirect to create workspace page
  if (!userWorkspaces || userWorkspaces.length == 0) {
    redirect(`/workspace`);
  }
  // if user has workspaces, check if user is a member of the workspace params
  const requestedWorkspace = userWorkspaces.find(
    (workspace: OrganizationMembership) =>
      workspace.organization.slug === currentWorkspaceSlug,
  );
  // if user is not member of the requested workspace,
  // set the first workspace as the active workspace and then
  // redirect to its first workspace
  if (!requestedWorkspace) {
    await setCookieForActiveOrganization(userWorkspaces[0].organization.slug as string);
    console.log(
      `redirecting ${userId} to ${userWorkspaces[0].organization.slug}`,
    );
    redirect(`/workspace/${userWorkspaces[0].organization.slug}`); // redirect to home page if user is not a member of the workspace
  }
  return requestedWorkspace.organization;
}
