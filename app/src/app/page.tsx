import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const { userId, orgSlug } = await auth();
  if (userId) {
    redirect(`/workspace/${orgSlug}`);
  }
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[50em] flex-col items-center justify-center space-y-12">
      <h1 className="text-4xl font-bold">Home Page</h1>
    </main>
  );
}
