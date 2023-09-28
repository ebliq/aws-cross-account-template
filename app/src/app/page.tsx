import { Button } from "@/components/ui/button";
import Image from "next/image";

import { redirect } from "next/navigation";

async function checkConnection(workspaceid: string) {
  if (workspaceid) {
    return true;
  }
  return undefined;
  // const res = await fetch('https://...')
  // if (!res.ok) return undefined
  // return res.json()
}

export default async function Home({
  searchParams,
}: {
  searchParams: { workspaceid: string };
}) {
  // const accounts = await checkConnection(searchParams.workspaceid);
  // console.log(accounts);
  // if (!accounts) {
  //   redirect("/connect");
  // }
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[50em] flex-col items-center justify-center space-y-12">
      <h1 className="text-4xl font-bold">Home Page</h1>
    </main>
  );
}
