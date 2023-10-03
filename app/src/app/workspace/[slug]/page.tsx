import { currentUser, clerkClient, auth } from "@clerk/nextjs";
import { SignedInAuthObject, User } from "@clerk/nextjs/server";
import { getCurrentWorkspace } from "./utils";
import { redirect } from "next/navigation";
import { HOST } from "@/constants";
import { queryActiveAccounts } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { TestButton } from "../components/button";
import { listBuckets } from "@/lib/service/s3";
import { CredentialsCache, assumeRole } from "@/lib/credentials";
import { BucketTable } from "./components/table";

interface WorkspaceParams {
  slug: string;
}
export const revalidate = 60; // cache for 60 seconds

const credentialsCache = new CredentialsCache();

export default async function Page({ params }: { params: WorkspaceParams }) {
  const user = (await currentUser()) as User;
  const organization = await getCurrentWorkspace({
    currentWorkspaceSlug: params.slug,
    userId: user.id,
  });
  if (!(await queryActiveAccounts({ slug: organization.slug as string }))) {
    redirect(`/workspace/${organization.slug}/connect`);
  }
  const credentials = await credentialsCache.getCredentialsOrSet(params.slug);
  const buckets = await listBuckets({ credentials });

  return (
    <>
      <TestButton />
      <BucketTable buckets={buckets} />
    </>
  );
}
