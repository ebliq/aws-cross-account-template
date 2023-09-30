import { COOKIE_WORKSPACE } from "@/constants";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers"


export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { slug } = await req.json()
  if (!slug) {
    return new Response("Bad Request", { status: 400 });
  }

  cookies().set(COOKIE_WORKSPACE, slug)
  return new Response('ok')
}