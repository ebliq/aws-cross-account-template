import { ConnectCard } from "@/app/workspace/[slug]/connect/components/connectCard";
import { getCurrentOrgPath } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default async function Page() {
  // const paper = await getPaper(params.id);
  const user = (await currentUser()) as User;

  return (
    <div className="mx-auto mt-8 flex min-h-[60vh] w-full max-w-[50em] flex-col items-center justify-center space-y-12">
      <ConnectCard userId={user.id} userImage={user.imageUrl} />
    </div>
  );
}
