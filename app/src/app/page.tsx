import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { COOKIE_WORKSPACE } from "../constants";

export default async function Home() {
  const user = await currentUser();
  if (user?.id) {
    const orgCookie = cookies().get(COOKIE_WORKSPACE);
    redirect(`/workspace/${orgCookie?.value}`);
  }
  return (
    <>
      <h1 className="text-4xl font-bold">Home Page</h1>;
    </>
  );
}
