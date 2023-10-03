import { auth } from "@clerk/nextjs";
import { createDocClient, queryActiveAccounts } from "@/lib/db";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { DYNAMODB_CROSS_ACCOUNT_TABLE_NAME } from "@/constants";

const client = createDocClient()

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { slug } = await req.json()
  if (!slug) {
    return Response.json({ "error": "Missing slug parameter" }, { status: 400 })
  }
  const data = await queryActiveAccounts({ slug, client })
  if (data) {
    return Response.json({ data }, { status: 200 });
  }
  return Response.json({ "error": "No account found" }, { status: 404 })
}