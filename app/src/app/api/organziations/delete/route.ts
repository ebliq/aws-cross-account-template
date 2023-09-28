import { auth, clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return new Response("Bad Request", { status: 400 });
  }
  const userOrgs = await clerkClient.users.getOrganizationMembershipList({
    userId: userId
  })
  // check if userOrgs has organization with id
  if (userOrgs.find(org => org.organization.id === body.id)) {
    const r = await clerkClient.organizations.deleteOrganization(body.id);
    return new Response("OK", { status: 200 });
  } else {
    return new Response("Bad Request", { status: 400 });
  }
}
