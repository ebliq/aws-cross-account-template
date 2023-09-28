import { currentUser, clerkClient } from "@clerk/nextjs";
import { OrganizationMembership, User } from "@clerk/nextjs/server";
import { DataTable } from "./components/orgTable";

export default async function Page() {
  const user = (await currentUser()) as User;

  const u = (
    await clerkClient.users.getOrganizationMembershipList({
      userId: user.id,
    })
  ).map((u: OrganizationMembership) => {
    return {
      id: u.organization.id,
      name: u.organization.name,
      role: u.role,
    };
  });

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[50em] flex-col justify-center gap-4 rounded-md bg-white p-12 shadow">
      <h1 className="text-2xl font-bold">Organizations</h1>
      <DataTable data={u} />
    </div>
  );
}
