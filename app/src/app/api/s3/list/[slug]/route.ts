import { CredentialsCache } from "@/lib/credentials";
import { listBuckets } from "@/lib/service/s3";
import { auth } from "@clerk/nextjs";

const credentials = new CredentialsCache()


export async function GET(req: Request, { params: { slug } }: { params: { slug: string } }) {
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  // TODO add a check if user is allowed to access this account

  const userCredentials = await credentials.getCredentialsOrSet(slug)

  const buckets = await listBuckets({ credentials: userCredentials })

  return new Response(JSON.stringify({ "buckets": buckets }), { status: 200, headers: { 'content-type': 'application/json' } })
}