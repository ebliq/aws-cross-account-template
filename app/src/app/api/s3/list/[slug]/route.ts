import { CredentialsCache } from "@/lib/credentials";
import { auth } from "@clerk/nextjs";

const credentials = new CredentialsCache()


export async function GET(req: Request, { params: { slug } }: { params: { slug: string } }) {
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userCredentials = await credentials.getCredentialsOrSet(slug)

  // // extract slug from path
  // const { searchParams } = new URL(req.url)
  // console.log(searchParams)
  // const org = searchParams.get('org')
  // console.log(org)



  // const data = await queryActiveAccounts({ slug, client })


  return new Response(JSON.stringify(userCredentials), { status: 200, headers: { 'content-type': 'application/json' } })
}