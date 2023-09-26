// @ts-ignore

import { ConnectCard } from "@/components/connect";

export default async function Page() {
  // const paper = await getPaper(params.id);
  return (
    <div className="mx-auto mt-8 flex min-h-[60vh] w-full max-w-[50em] flex-col items-center justify-center space-y-12">
      <ConnectCard />
    </div>
  );
}
